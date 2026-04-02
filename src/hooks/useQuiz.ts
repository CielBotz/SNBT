import { useState, useEffect, useCallback, useRef } from 'react';
import { Question, UserProgress, QuizSession, Difficulty, Category, AssessmentReport } from '../types/quiz';
import { QUESTIONS } from '../data/questions';
import { calculateIRTScore, getNationalStats } from '../lib/irt';
import { PTN_DATA } from '../data/ptn';

const STORAGE_KEY = 'ppu_master_progress_v3';

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
  simulationReports: [],
  materialMastery: {},
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
];
const FULL_EXAM_TOTAL_TIME = SUB_TEST_CONFIGS.reduce((acc, st) => acc + st.time, 0);

export function useQuiz() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...INITIAL_PROGRESS,
        ...parsed,
        materialMastery: parsed.materialMastery ?? {},
        simulationReports: parsed.simulationReports ?? [],
      };
    }
    return INITIAL_PROGRESS;
  });

  const [session, setSession] = useState<QuizSession | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const buildFullExamSession = useCallback(() => {
    const selectedQuestions: Question[] = [];
    const subTests: NonNullable<QuizSession['subTests']> = [];
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
        subTests.push({
          name: config.name,
          questionIndices: indices,
          timeLimit: config.time,
          expiresAt: 0,
        });
        currentIdxOffset += shuffled.length;
      }
    });

    return { selectedQuestions, subTests };
  }, []);

  // Timer logic for sub-tests and total exam timer
  useEffect(() => {
    if (session && !session.isSubmitted && session.subTests && session.currentSubTestIdx !== undefined) {
      const currentSubTest = session.subTests[session.currentSubTestIdx];
      if (!currentSubTest || currentSubTest.expiresAt === 0) return;

      timerRef.current = setInterval(() => {
        setSession(prev => {
          if (!prev || prev.isSubmitted || prev.currentSubTestIdx === undefined || !prev.subTests) return prev;
          if (prev.totalExpiresAt && Date.now() >= prev.totalExpiresAt) return { ...prev, isSubmitted: true };

          const subTest = prev.subTests[prev.currentSubTestIdx];
          if (!subTest || subTest.expiresAt === 0 || Date.now() < subTest.expiresAt) return prev;

          // Time is up — auto-advance or submit
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
                questionStartAt: Date.now(),
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
  }, [session?.mode, session?.isSubmitted, session?.currentSubTestIdx, session?.totalExpiresAt]);

  const startSession = useCallback((mode: QuizSession['mode'], category?: Category) => {
    let selectedQuestions: Question[] = [];
    let subTests: QuizSession['subTests'] = [];

    if (mode === 'tryout' || mode === 'simulation') {
      const fullExam = buildFullExamSession();
      selectedQuestions = fullExam.selectedQuestions;
      subTests = fullExam.subTests;
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

    // Activate the first sub-test's timer immediately
    const finalSubTests = ((mode === 'tryout' || mode === 'simulation') && subTests && subTests.length > 0)
      ? subTests.map((st, i) => i === 0 ? { ...st, expiresAt: Date.now() + st.timeLimit * 1000 } : st)
      : subTests;
    const sessionStartAt = Date.now();

    setSession({
      mode,
      selectedCategory: category,
      questions: selectedQuestions,
      currentIdx: 0,
      answers: {},
      marked: {},
      startTime: sessionStartAt,
      timePerQuestion: {},
      isSubmitted: false,
      subTests: mode === 'tryout' || mode === 'simulation' ? finalSubTests : undefined,
      currentSubTestIdx: mode === 'tryout' || mode === 'simulation' ? 0 : undefined,
      totalTimeLimitSec: mode === 'simulation' ? FULL_EXAM_TOTAL_TIME : undefined,
      totalExpiresAt: mode === 'simulation' ? sessionStartAt + FULL_EXAM_TOTAL_TIME * 1000 : undefined,
      questionStartAt: sessionStartAt,
    });
  }, [buildFullExamSession, progress]);

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
    if (session.mode === 'simulation' && session.answers[qId] !== undefined) return;
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
      
      // If in sub-test mode, check if we can go to next question within sub-test
      if (prev.subTests && prev.currentSubTestIdx !== undefined) {
        const currentSubTest = prev.subTests[prev.currentSubTestIdx];
        const lastIdxInSubTest = currentSubTest.questionIndices[currentSubTest.questionIndices.length - 1];
        
        if (prev.currentIdx < lastIdxInSubTest) {
          const elapsed = Math.max(1, Math.round((Date.now() - (prev.questionStartAt ?? Date.now())) / 1000));
          const qId = prev.questions[prev.currentIdx].id;
          return {
            ...prev,
            currentIdx: prev.currentIdx + 1,
            questionStartAt: Date.now(),
            timePerQuestion: { ...prev.timePerQuestion, [qId]: (prev.timePerQuestion[qId] ?? 0) + elapsed },
          };
        }
        return prev; // Lock within sub-test
      }

      if (prev.currentIdx >= prev.questions.length - 1) return prev;
      const elapsed = Math.max(1, Math.round((Date.now() - (prev.questionStartAt ?? Date.now())) / 1000));
      const qId = prev.questions[prev.currentIdx].id;
      return {
        ...prev,
        currentIdx: prev.currentIdx + 1,
        questionStartAt: Date.now(),
        timePerQuestion: { ...prev.timePerQuestion, [qId]: (prev.timePerQuestion[qId] ?? 0) + elapsed },
      };
    });
  };

  const prevQuestion = () => {
    setSession(prev => {
      if (!prev || prev.currentIdx <= 0) return prev;
      
      // If in sub-test mode, check if we can go to prev question within sub-test
      if (prev.subTests && prev.currentSubTestIdx !== undefined) {
        const currentSubTest = prev.subTests[prev.currentSubTestIdx];
        const firstIdxInSubTest = currentSubTest.questionIndices[0];
        
        if (prev.currentIdx > firstIdxInSubTest) {
          const elapsed = Math.max(1, Math.round((Date.now() - (prev.questionStartAt ?? Date.now())) / 1000));
          const qId = prev.questions[prev.currentIdx].id;
          return {
            ...prev,
            currentIdx: prev.currentIdx - 1,
            questionStartAt: Date.now(),
            timePerQuestion: { ...prev.timePerQuestion, [qId]: (prev.timePerQuestion[qId] ?? 0) + elapsed },
          };
        }
        return prev; // Lock within sub-test
      }

      const elapsed = Math.max(1, Math.round((Date.now() - (prev.questionStartAt ?? Date.now())) / 1000));
      const qId = prev.questions[prev.currentIdx].id;
      return {
        ...prev,
        currentIdx: prev.currentIdx - 1,
        questionStartAt: Date.now(),
        timePerQuestion: { ...prev.timePerQuestion, [qId]: (prev.timePerQuestion[qId] ?? 0) + elapsed },
      };
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

    const currentQid = session.questions[session.currentIdx]?.id;
    const elapsedOnCurrent = Math.max(1, Math.round((Date.now() - (session.questionStartAt ?? Date.now())) / 1000));
    const mergedTimePerQuestion = currentQid
      ? { ...session.timePerQuestion, [currentQid]: (session.timePerQuestion[currentQid] ?? 0) + elapsedOnCurrent }
      : session.timePerQuestion;

    const results = session.questions.map(q => ({
      id: q.id,
      correct: validateAnswer(q, session.answers[q.id]),
      category: q.category,
      concept: q.concept,
      irtParams: q.irtParams,
      timeSpentSec: mergedTimePerQuestion[q.id] ?? 0,
    }));

    const correctCount = results.filter(r => r.correct).length;
    const today = new Date().toISOString().split('T')[0];

    // IRT Scoring
    const irtScore = calculateIRTScore(results.map(r => ({
      correct: r.correct,
      irtParams: r.irtParams
    })));

    const { rank, percentile, totalParticipants } = getNationalStats(irtScore);

    // Category scores
    const categoryScores: any = {};
    const categories: Category[] = ['TPS', 'Literasi Indonesia', 'Literasi Inggris', 'Penalaran Matematika'];
    categories.forEach(cat => {
      const catResults = results.filter(r => r.category === cat);
      if (catResults.length > 0) {
        categoryScores[cat] = calculateIRTScore(catResults.map(r => ({
          correct: r.correct,
          irtParams: r.irtParams
        })));
      } else {
        categoryScores[cat] = 0;
      }
    });

    // Material Mastery
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

    // Rationalization Logic
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

    const report: AssessmentReport = {
      id: `report-${Date.now()}`,
      date: new Date().toISOString(),
      mode: session.mode === 'simulation' ? 'simulation' : 'practice',
      totalScore: irtScore,
      categoryScores: categoryScores as any,
      nationalRank: rank,
      totalParticipants,
      percentile,
      materialMastery,
      recommendations,
      examAnalytics: {
        accuracy: Math.round((correctCount / (results.length || 1)) * 100),
        speedPerQuestionSec: Math.round(results.reduce((acc, r) => acc + r.timeSpentSec, 0) / (results.length || 1)),
        focusDrops: results
          .filter(r => r.timeSpentSec > 0)
          .sort((a, b) => b.timeSpentSec - a.timeSpentSec)
          .slice(0, 5)
          .map(r => ({
            questionId: r.id,
            concept: r.concept,
            timeSpentSec: r.timeSpentSec,
            isCorrect: r.correct,
          })),
      },
    };

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
        reports: session.mode === 'simulation' ? prev.reports : [report, ...prev.reports].slice(0, 10),
        simulationReports: session.mode === 'simulation' ? [report, ...(prev.simulationReports ?? [])].slice(0, 10) : (prev.simulationReports ?? []),
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
            questionStartAt: Date.now(),
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
  };
}
