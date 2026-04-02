import { useState, useEffect, useCallback, useRef } from 'react';
import { Question, UserProgress, QuizSession, Difficulty, Category, AssessmentReport, UserTarget } from '../types/quiz';
import { QUESTIONS } from '../data/questions';
import { calculateIRTScore, getNationalStats } from '../lib/irt';
import { PTN_DATA } from '../data/ptn';

const STORAGE_KEY = 'ppu_master_progress_v3';
const CATEGORIES: Category[] = ['TPS', 'Literasi Indonesia', 'Literasi Inggris', 'Penalaran Matematika'];

const INITIAL_PROGRESS: UserProgress = {
  completedIds: [],
  wrongIds: [],
  streak: 0,
  dailyProgress: {},
  categoryStats: {
    'TPS': { correct: 0, total: 0 },
    'Literasi Indonesia': { correct: 0, total: 0 },
    'Literasi Inggris': { correct: 0, total: 0 },
    'Penalaran Matematika': { correct: 0, total: 0 },
  },
  currentDifficulty: 'easy',
  reports: [],
  materialMastery: {},
  subTestHistory: [],
};

const SUB_TEST_CONFIGS = [
  { name: 'Penalaran Induktif', category: 'TPS', count: 10, time: 600 },
  { name: 'Penalaran Deduktif', category: 'TPS', count: 10, time: 600 },
  { name: 'Penalaran Kuantitatif', category: 'TPS', count: 10, time: 600 },
  { name: 'Pengetahuan & Pemahaman Umum', category: 'TPS', count: 20, time: 900 },
  { name: 'Pemahaman Bacaan & Menulis', category: 'TPS', count: 20, time: 1500 },
  { name: 'Pengetahuan Kuantitatif', category: 'TPS', count: 15, time: 1200 },
  { name: 'Literasi Bahasa Indonesia', category: 'Literasi Indonesia', count: 30, time: 2700 },
  { name: 'Literasi Bahasa Inggris', category: 'Literasi Inggris', count: 20, time: 900 },
  { name: 'Penalaran Matematika', category: 'Penalaran Matematika', count: 20, time: 1800 },
] as const;

const clamp = (num: number, min: number, max: number) => Math.min(max, Math.max(min, num));

const getConsistencyScore = (scores: number[]) => {
  if (scores.length < 2) return 100;
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((acc, score) => acc + (score - mean) ** 2, 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  return Math.round(clamp(100 - stdDev / 2.2, 0, 100));
};

const calculateReadinessInsights = (reports: AssessmentReport[], target?: UserTarget) => {
  const lookback = clamp(reports.length, 4, 8);
  const trendReports = reports.slice(0, lookback);

  const avgTotal = trendReports.length > 0
    ? trendReports.reduce((sum, r) => sum + r.totalScore, 0) / trendReports.length
    : 0;

  const categoryAverages = CATEGORIES.reduce((acc, category) => {
    const avg = trendReports.length > 0
      ? trendReports.reduce((sum, report) => sum + report.categoryScores[category], 0) / trendReports.length
      : 0;
    acc[category] = Math.round(avg);
    return acc;
  }, {} as { [key in Category]: number });

  const targetPTN = PTN_DATA.find((ptn) => ptn.id === target?.ptnId);
  const targetProdi = targetPTN?.prodi.find((prodi) => prodi.id === target?.prodiId);
  const passingGrade = targetProdi?.passingGrade ?? 700;

  const readinessIndex = Math.round(clamp((avgTotal / passingGrade) * 100, 0, 100));
  const consistency = getConsistencyScore(trendReports.map(r => r.totalScore));

  const gapBySubTest = CATEGORIES.reduce((acc, category) => {
    acc[category] = Math.round(clamp(passingGrade - categoryAverages[category], -300, 300));
    return acc;
  }, {} as { [key in Category]: number });

  const focusRecommendations = Object.entries(gapBySubTest)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([subtest, gap], idx) => {
      if (gap <= 0) return `Pertahankan ${subtest} dengan mixed drill 20 menit/hari agar skor tetap stabil.`;
      const weeklyTarget = Math.max(15, Math.round(gap / 3));
      return `${idx + 1}. Prioritaskan ${subtest}: kejar +${weeklyTarget} poin/minggu dengan latihan bertahap dan evaluasi 2x.`;
    });

  return {
    readinessIndex,
    trendSessions: trendReports.length,
    consistency,
    gapBySubTest,
    focusRecommendations,
    targetInfo: targetPTN && targetProdi
      ? {
          ptn: targetPTN.name,
          prodi: targetProdi.name,
          passingGrade: targetProdi.passingGrade,
        }
      : undefined,
  };
};

export function useQuiz() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_PROGRESS,
        ...parsed,
        materialMastery: parsed.materialMastery ?? {},
        subTestHistory: parsed.subTestHistory ?? [],
      };
    }
    return INITIAL_PROGRESS;
  });

  const [session, setSession] = useState<QuizSession | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    if (session && !session.isSubmitted && session.subTests && session.currentSubTestIdx !== undefined) {
      const currentSubTest = session.subTests[session.currentSubTestIdx];
      if (!currentSubTest || currentSubTest.expiresAt === 0) return;

      timerRef.current = setInterval(() => {
        setSession(prev => {
          if (!prev || prev.isSubmitted || prev.currentSubTestIdx === undefined || !prev.subTests) return prev;

          const subTest = prev.subTests[prev.currentSubTestIdx];
          if (!subTest || subTest.expiresAt === 0 || Date.now() < subTest.expiresAt) return prev;

          if (prev.currentSubTestIdx < prev.subTests.length - 1) {
            const nextIdx = prev.currentSubTestIdx + 1;
            const nextSubTest = prev.subTests[nextIdx];
            if (nextSubTest && nextSubTest.questionIndices.length > 0) {
              const updatedSubTests = prev.subTests.map((st, i) =>
                i === nextIdx ? { ...st, expiresAt: Date.now() + st.timeLimit * 1000 } : st
              );
              return {
                ...prev,
                subTests: updatedSubTests,
                currentSubTestIdx: nextIdx,
                currentIdx: nextSubTest.questionIndices[0],
              };
            }
          }
          return { ...prev, isSubmitted: true };
        });
      }, 500);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current as NodeJS.Timeout);
    };
  }, [session?.mode, session?.isSubmitted, session?.currentSubTestIdx]);

  const startSession = useCallback((mode: QuizSession['mode'], category?: Category) => {
    let selectedQuestions: Question[] = [];
    let subTests: QuizSession['subTests'] = [];

    if (mode === 'tryout') {
      let currentIdxOffset = 0;
      const usedIds = new Set<string>();

      SUB_TEST_CONFIGS.forEach(config => {
        const subPool = QUESTIONS.filter(q =>
          !usedIds.has(q.id) &&
          (q.concept === config.name || (q.category === config.category && q.concept.includes(config.name)))
        );

        let finalPool = subPool;
        if (finalPool.length < config.count) {
          const catPool = QUESTIONS.filter(q => !usedIds.has(q.id) && q.category === config.category);
          finalPool = [...finalPool, ...catPool.filter(q => !finalPool.some(fq => fq.id === q.id))];
        }

        if (finalPool.length < config.count) {
          const remainingNeeded = config.count - finalPool.length;
          const otherPool = QUESTIONS.filter(q => !finalPool.some(fq => fq.id === q.id));
          const additional = [...otherPool].sort(() => Math.random() - 0.5).slice(0, remainingNeeded);
          finalPool = [...finalPool, ...additional];
        }

        if (finalPool.length === 0 && QUESTIONS.length > 0) {
          finalPool = [QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]];
        }

        const shuffled = [...finalPool].sort(() => Math.random() - 0.5).slice(0, config.count);
        shuffled.forEach(q => usedIds.add(q.id));
        selectedQuestions.push(...shuffled);

        const indices = Array.from({ length: shuffled.length }, (_, i) => i + currentIdxOffset);
        if (indices.length > 0) {
          subTests?.push({
            name: config.name,
            questionIndices: indices,
            timeLimit: config.time,
            expiresAt: 0,
          });
          currentIdxOffset += shuffled.length;
        }
      });
    } else {
      const pool = category
        ? QUESTIONS.filter(q => q.category === category)
        : [...QUESTIONS];

      const wrongPool = pool.filter(q => progress.wrongIds.includes(q.id));
      const normalPool = pool.filter(q => !progress.wrongIds.includes(q.id));

      if (mode === 'daily') {
        selectedQuestions = [
          ...wrongPool.sort(() => Math.random() - 0.5).slice(0, 2),
          ...normalPool.filter(q => q.difficulty === progress.currentDifficulty).sort(() => Math.random() - 0.5).slice(0, 3)
        ];
      } else if (mode === 'mini') {
        selectedQuestions = [
          ...wrongPool.sort(() => Math.random() - 0.5).slice(0, 3),
          ...normalPool.filter(q => q.difficulty === progress.currentDifficulty).sort(() => Math.random() - 0.5).slice(0, 7)
        ];
      } else {
        selectedQuestions = pool.sort(() => Math.random() - 0.5).slice(0, 10);
      }
    }

    const finalSubTests = (mode === 'tryout' && subTests && subTests.length > 0)
      ? subTests.map((st, i) => i === 0 ? { ...st, expiresAt: Date.now() + st.timeLimit * 1000 } : st)
      : subTests;

    setSession({
      mode,
      selectedCategory: category,
      questions: selectedQuestions,
      currentIdx: 0,
      answers: {},
      marked: {},
      startTime: Date.now(),
      timePerQuestion: {},
      isSubmitted: false,
      subTests: mode === 'tryout' ? finalSubTests : undefined,
      currentSubTestIdx: mode === 'tryout' ? 0 : undefined,
    });
  }, [progress]);

  const setTarget = useCallback((target: UserTarget) => {
    setProgress(prev => ({ ...prev, target }));
  }, []);

  const toggleMark = () => {
    if (!session || session.isSubmitted) return;
    const qId = session.questions[session.currentIdx].id;
    setSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        marked: { ...prev.marked, [qId]: !prev.marked[qId] },
      };
    });
  };

  const answerQuestion = (answer: any) => {
    if (!session || session.isSubmitted) return;

    const qId = session.questions[session.currentIdx].id;
    setSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        answers: { ...prev.answers, [qId]: answer },
      };
    });
  };

  const nextQuestion = () => {
    setSession(prev => {
      if (!prev) return prev;

      if (prev.subTests && prev.currentSubTestIdx !== undefined) {
        const currentSubTest = prev.subTests[prev.currentSubTestIdx];
        const lastIdxInSubTest = currentSubTest.questionIndices[currentSubTest.questionIndices.length - 1];

        if (prev.currentIdx < lastIdxInSubTest) {
          return { ...prev, currentIdx: prev.currentIdx + 1 };
        }
        return prev;
      }

      if (prev.currentIdx >= prev.questions.length - 1) return prev;
      return { ...prev, currentIdx: prev.currentIdx + 1 };
    });
  };

  const prevQuestion = () => {
    setSession(prev => {
      if (!prev || prev.currentIdx <= 0) return prev;

      if (prev.subTests && prev.currentSubTestIdx !== undefined) {
        const currentSubTest = prev.subTests[prev.currentSubTestIdx];
        const firstIdxInSubTest = currentSubTest.questionIndices[0];

        if (prev.currentIdx > firstIdxInSubTest) {
          return { ...prev, currentIdx: prev.currentIdx - 1 };
        }
        return prev;
      }

      return { ...prev, currentIdx: prev.currentIdx - 1 };
    });
  };

  const validateAnswer = (q: Question, answer: any): boolean => {
    if (answer === undefined) return false;
    if (q.type === 'multiple_choice') {
      return answer === q.correctAnswer;
    } else if (q.type === 'complex_multiple_choice') {
      const userAnswers = answer as boolean[];
      return q.complexOptions?.every((opt, idx) => opt.correct === userAnswers[idx]) ?? false;
    } else if (q.type === 'short_answer') {
      return Number(answer) === q.shortAnswerCorrect;
    }
    return false;
  };

  const submitQuiz = () => {
    if (!session || session.isSubmitted) return;

    const results = session.questions.map(q => ({
      id: q.id,
      correct: validateAnswer(q, session.answers[q.id]),
      category: q.category,
      concept: q.concept,
      irtParams: q.irtParams,
    }));

    const correctCount = results.filter(r => r.correct).length;
    const today = new Date().toISOString().split('T')[0];

    const irtScore = calculateIRTScore(results.map(r => ({
      correct: r.correct,
      irtParams: r.irtParams
    })));

    const { rank, percentile, totalParticipants } = getNationalStats(irtScore);

    const categoryScores = {} as { [key in Category]: number };
    CATEGORIES.forEach(cat => {
      const catResults = results.filter(r => r.category === cat);
      categoryScores[cat] = catResults.length > 0
        ? calculateIRTScore(catResults.map(r => ({ correct: r.correct, irtParams: r.irtParams })))
        : 0;
    });

    const materialMastery: any = {};
    results.forEach(r => {
      if (!materialMastery[r.concept]) {
        materialMastery[r.concept] = { correct: 0, total: 0 };
      }
      materialMastery[r.concept].total += 1;
      if (r.correct) materialMastery[r.concept].correct += 1;
    });
    Object.keys(materialMastery).forEach(key => {
      materialMastery[key] = Math.round((materialMastery[key].correct / (materialMastery[key].total || 1)) * 100);
    });

    const recommendations = PTN_DATA.flatMap(ptn =>
      ptn.prodi.map(prodi => {
        const diff = irtScore - prodi.passingGrade;
        let chance = 0;
        if (diff >= 50) chance = 95;
        else if (diff >= 20) chance = 85;
        else if (diff >= 0) chance = 60;
        else if (diff >= -20) chance = 35;
        else if (diff >= -50) chance = 15;
        else chance = 5;

        return {
          ptn: ptn.name,
          prodi: prodi.name,
          chance
        };
      })
    ).sort((a, b) => b.chance - a.chance).slice(0, 5);

    setProgress(prev => {
      const newWrongIds = [...prev.wrongIds];
      const newCompletedIds = [...prev.completedIds];
      const updatedStats = { ...prev.categoryStats };

      results.forEach(r => {
        updatedStats[r.category].total += 1;
        if (r.correct) {
          updatedStats[r.category].correct += 1;
          const idx = newWrongIds.indexOf(r.id);
          if (idx > -1) newWrongIds.splice(idx, 1);
          if (!newCompletedIds.includes(r.id)) newCompletedIds.push(r.id);
        } else {
          if (!newWrongIds.includes(r.id)) newWrongIds.push(r.id);
        }
      });

      let newDifficulty = prev.currentDifficulty;
      const accuracy = correctCount / (session.questions.length || 1);
      if (accuracy > 0.8) {
        if (newDifficulty === 'easy') newDifficulty = 'medium';
        else if (newDifficulty === 'medium') newDifficulty = 'trap';
      } else if (accuracy < 0.4) {
        if (newDifficulty === 'trap') newDifficulty = 'medium';
        else if (newDifficulty === 'medium') newDifficulty = 'easy';
      }

      const baseReport: AssessmentReport = {
        id: `report-${Date.now()}`,
        date: new Date().toISOString(),
        totalScore: irtScore,
        categoryScores,
        nationalRank: rank,
        totalParticipants,
        percentile,
        materialMastery,
        recommendations,
        readinessIndex: 0,
        trendSessions: 0,
        consistency: 0,
        gapBySubTest: {
          'TPS': 0,
          'Literasi Indonesia': 0,
          'Literasi Inggris': 0,
          'Penalaran Matematika': 0,
        },
        focusRecommendations: [],
      };

      const reportsWithCurrent = [baseReport, ...prev.reports].slice(0, 10);
      const readiness = calculateReadinessInsights(reportsWithCurrent, prev.target);
      const finalReport: AssessmentReport = {
        ...baseReport,
        readinessIndex: readiness.readinessIndex,
        trendSessions: readiness.trendSessions,
        consistency: readiness.consistency,
        gapBySubTest: readiness.gapBySubTest,
        focusRecommendations: readiness.focusRecommendations,
        target: readiness.targetInfo,
      };

      return {
        ...prev,
        completedIds: newCompletedIds,
        wrongIds: newWrongIds,
        streak: correctCount === session.questions.length ? prev.streak + 1 : 0,
        dailyProgress: {
          ...prev.dailyProgress,
          [today]: (prev.dailyProgress[today] || 0) + correctCount,
        },
        categoryStats: updatedStats,
        currentDifficulty: newDifficulty,
        materialMastery: { ...(prev.materialMastery ?? {}), ...materialMastery },
        subTestHistory: [
          {
            date: finalReport.date,
            scores: finalReport.categoryScores,
            consistency: finalReport.consistency,
          },
          ...prev.subTestHistory,
        ].slice(0, 20),
        reports: [finalReport, ...prev.reports].slice(0, 10),
      };
    });

    setSession(prev => prev ? { ...prev, isSubmitted: true } : null);
  };

  const nextSubTest = () => {
    setSession(prev => {
      if (!prev || prev.isSubmitted || prev.currentSubTestIdx === undefined || !prev.subTests) return prev;

      if (prev.currentSubTestIdx < prev.subTests.length - 1) {
        const nextIdx = prev.currentSubTestIdx + 1;
        const nextSubTest = prev.subTests[nextIdx];

        if (nextSubTest && nextSubTest.questionIndices && nextSubTest.questionIndices.length > 0) {
          const updatedSubTests = prev.subTests.map((st, i) =>
            i === nextIdx ? { ...st, expiresAt: Date.now() + st.timeLimit * 1000 } : st
          );
          return {
            ...prev,
            subTests: updatedSubTests,
            currentSubTestIdx: nextIdx,
            currentIdx: nextSubTest.questionIndices[0],
          };
        }
      }
      return prev;
    });
  };

  return {
    progress,
    session,
    startSession,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    nextSubTest,
    toggleMark,
    setSession,
    setTarget,
  };
}
