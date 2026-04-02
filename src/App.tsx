import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, ChevronLeft, ChevronRight, Home, Target } from 'lucide-react';
import { useQuiz } from './hooks/useQuiz';
import { QUESTIONS } from './data/questions';
import { QuestionRenderer } from './components/quiz/QuestionRenderer';
import type { Concept, QuizSession } from './types/quiz';

const SESSION_MODES: { mode: QuizSession['mode']; label: string }[] = [
  { mode: 'mini', label: 'Mini Quiz' },
  { mode: 'daily', label: 'Daily 5' },
  { mode: 'drill15', label: 'Drill 15' },
  { mode: 'tryout', label: 'Tryout' },
  { mode: 'simulation', label: 'Simulation' },
  { mode: 'category', label: 'Category Focus' },
  { mode: 'targeted', label: 'Targeted Concept' },
];

export default function App() {
  const {
    session,
    progress,
    startSession,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    submitQuiz,
    nextSubTest,
    setSession,
  } = useQuiz();

  const [view, setView] = useState<'home' | 'quiz' | 'result'>('home');
  const [now, setNow] = useState(() => Date.now());

  const currentQuestion = useMemo(() => {
    if (!session) return null;
    return session.questions[session.currentIdx] ?? null;
  }, [session]);

  const firstCategory = useMemo(() => QUESTIONS[0]?.category, []);
  const availableConcepts = useMemo(
    () => Array.from(new Set(QUESTIONS.map((question) => question.concept).filter(Boolean))) as Concept[],
    [],
  );
  const weakestConcept = useMemo(() => {
    if (availableConcepts.length === 0) return undefined;

    const mastered = progress.materialMastery ?? {};
    return [...availableConcepts].sort((a, b) => (mastered[a] ?? 0) - (mastered[b] ?? 0))[0];
  }, [availableConcepts, progress.materialMastery]);

  const startModeSession = (mode: QuizSession['mode']) => {
    if (mode === 'category' && firstCategory) {
      startSession(mode, firstCategory);
    } else if (mode === 'targeted') {
      startSession(mode, undefined, { concept: weakestConcept ?? availableConcepts[0] });
    } else {
      startSession(mode);
    }
    setView('quiz');
  };

  const finishQuiz = () => {
    submitQuiz();
    setView('result');
  };

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (view !== 'quiz' || !session?.subTests?.length || session.isSubmitted) return;

    const currentSubTest = session.subTests[session.currentSubTestIdx ?? 0];
    if (!currentSubTest?.expiresAt) return;

    if (Date.now() >= currentSubTest.expiresAt) {
      nextSubTest();
    }
  }, [nextSubTest, session, view, now]);

  useEffect(() => {
    if (view !== 'quiz' || !session?.isSubmitted) return;
    submitQuiz();
    setView('result');
  }, [session?.isSubmitted, submitQuiz, view]);

  const activeSubTest = useMemo(() => {
    if (!session?.subTests?.length) return null;
    return session.subTests[session.currentSubTestIdx ?? 0] ?? null;
  }, [session]);

  const subTestRemainingSec = useMemo(() => {
    if (!activeSubTest?.expiresAt) return null;
    return Math.max(0, Math.ceil((activeSubTest.expiresAt - now) / 1000));
  }, [activeSubTest, now]);

  if (view === 'home') {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">SNBT Practice Arena</h1>
        <p className="text-slate-600">
          Bank soal aktif: <span className="font-semibold">{QUESTIONS.length}</span> soal.
        </p>
        <div className="flex flex-wrap gap-3">
          {SESSION_MODES.map((item) => (
            <button
              key={item.mode}
              type="button"
              onClick={() => startModeSession(item.mode)}
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <Target size={18} /> {item.label}
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (view === 'result') {
    return (
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-6 py-10">
        <h2 className="text-2xl font-bold text-slate-900">Quiz selesai</h2>
        <p className="text-slate-600">
          Total sesi tersimpan: <span className="font-semibold">{progress.reports?.length ?? 0}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setSession(null);
            setView('home');
          }}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Home size={18} /> Kembali ke beranda
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-10">
      <header className="flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900">
          <BookOpen size={20} /> Mode Quiz ({session?.mode ?? '-'})
        </h2>
        <div className="text-right">
          <span className="block text-sm text-slate-500">
            {session ? `${session.currentIdx + 1}/${session.questions.length}` : '0/0'}
          </span>
          {activeSubTest && subTestRemainingSec !== null ? (
            <span className="block text-xs font-semibold text-amber-600">
              {activeSubTest.name}: {subTestRemainingSec}s
            </span>
          ) : null}
        </div>
      </header>

      {session && currentQuestion ? (
        <>
          <QuestionRenderer
            question={currentQuestion}
            answer={session.answers[currentQuestion.id]}
            onAnswer={answerQuestion}
            submitted={session.isSubmitted}
          />

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevQuestion}
              disabled={session.currentIdx === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Sebelumnya
            </button>

            {session.currentIdx === session.questions.length - 1 ? (
              <button
                type="button"
                onClick={finishQuiz}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
              >
                <CheckCircle2 size={16} /> Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={nextQuestion}
                className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
              >
                Berikutnya <ChevronRight size={16} />
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-slate-600">Tidak ada sesi aktif.</p>
      )}
    </main>
  );
}
