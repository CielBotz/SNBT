import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  BookOpen, 
  Clock, 
  Target, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Info, 
  LayoutGrid, 
  BarChart3, 
  Home,
  Flame,
  AlertTriangle,
  GraduationCap,
  TrendingUp,
  Award,
  Zap,
  ArrowRight,
  Search,
  School
} from 'lucide-react';
import { useQuiz } from './hooks/useQuiz';
import { formatTime, cn } from './lib/utils';
import { Difficulty, Category, Question, AssessmentReport } from './types/quiz';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line
} from 'recharts';

// --- Components ---

const ProgressBar = ({ current, total, color = "bg-indigo-600" }: { current: number; total: number; color?: string }) => (
  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
    <motion.div 
      className={cn("h-full", color)}
      initial={{ width: 0 }}
      animate={{ width: `${(current / (total || 1)) * 100}%` }}
    />
  </div>
);

const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
  const colors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    trap: 'bg-red-100 text-red-700 border-red-200',
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border", colors[difficulty])}>
      {difficulty}
    </span>
  );
};

// --- Main App ---

export default function App() {
  const { 
    progress, 
    session, 
    startSession, 
    answerQuestion, 
    nextQuestion, 
    prevQuestion, 
    submitQuiz,
    nextSubTest,
    toggleMark,
    setSession
  } = useQuiz();

  const [view, setView] = useState<'dashboard' | 'quiz' | 'analytics' | 'report'>('dashboard');
  const [selectedReport, setSelectedReport] = useState<AssessmentReport | null>(null);
  const [questionTimer, setQuestionTimer] = useState(0);

  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubTestConfirm, setShowSubTestConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Question Timer
  useEffect(() => {
    let interval: any;
    if (session && !session.isSubmitted) {
      interval = setInterval(() => {
        setQuestionTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session?.isSubmitted, session?.currentIdx]);

  useEffect(() => {
    setQuestionTimer(0);
  }, [session?.currentIdx]);

  const handleStart = (mode: 'tryout' | 'mini' | 'daily' | 'category', category?: Category) => {
    startSession(mode, category);
    setQuestionTimer(0);
    setView('quiz');
  };

  const handleViewReport = (report: AssessmentReport) => {
    setSelectedReport(report);
    setView('report');
  };

  const currentQuestion = session?.questions[session.currentIdx];
  const isLastQuestion = session && session.currentIdx === session.questions.length - 1;
  const currentSubTest = session?.subTests && session.currentSubTestIdx !== undefined ? session.subTests[session.currentSubTestIdx] : null;

  // --- Views ---

  const DashboardView = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-24">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">SNBT <span className="text-indigo-600">2026</span></h1>
          <p className="text-slate-500 font-medium">Platform Latihan & Simulasi IRT Terakurat</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Flame className="text-orange-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Streak</p>
              <p className="font-black text-slate-900 leading-none">{progress.streak} Hari</p>
            </div>
          </div>
          <div className="flex-1 md:flex-none bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-lg">
              <Trophy className="text-indigo-500 w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Mastery</p>
              <p className="font-black text-slate-900 leading-none">{progress.completedIds.length} Soal</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                <Zap size={14} className="text-yellow-300" /> Simulasi IRT Aktif
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-black leading-tight">Siap Menghadapi UTBK-SNBT 2026?</h2>
                <p className="text-indigo-100 text-lg font-medium opacity-90">Uji kemampuanmu dengan sistem penilaian IRT (Item Response Theory) terbaru.</p>
              </div>
              <button 
                onClick={() => handleStart('tryout')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-50 transition-all shadow-xl flex items-center gap-3 group"
              >
                Mulai Full Tryout <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-12 top-12">
              <GraduationCap size={120} className="text-white/10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'daily', title: 'Daily Challenge', icon: Target, color: 'bg-rose-500', desc: '5 Soal Harian' },
              { id: 'mini', title: 'Mini Test', icon: BookOpen, color: 'bg-indigo-500', desc: '10 Soal Cepat' },
            ].map(mode => (
              <motion.button
                key={mode.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStart(mode.id as any)}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col gap-4 group"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", mode.color)}>
                  <mode.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{mode.title}</h3>
                  <p className="text-sm text-slate-500">{mode.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-600" /> Performa Saat Ini
            </h3>
            <div className="space-y-4">
              {(Object.entries(progress.categoryStats) as [Category, { correct: number; total: number }][]).map(([cat, stats]) => (
                <div key={cat} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span>{cat}</span>
                    <span>{stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%</span>
                  </div>
                  <ProgressBar 
                    current={stats.correct} 
                    total={stats.total} 
                    color={cat === 'TPS' ? 'bg-rose-500' : cat === 'Literasi Indonesia' ? 'bg-indigo-500' : cat === 'Literasi Inggris' ? 'bg-amber-500' : 'bg-emerald-500'} 
                  />
                </div>
              ))}
            </div>
            <button 
              onClick={() => setView('analytics')}
              className="w-full py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              Lihat Detail Analisis
            </button>
          </div>

          {progress.reports.length > 0 && (
            <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
              <h3 className="font-black flex items-center gap-2">
                <Award size={18} className="text-yellow-400" /> Skor Terakhir
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black">{Math.round(progress.reports[0].totalScore)}</span>
                <span className="text-slate-400 text-sm mb-1">/ 1000</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                <span>Rank: #{progress.reports[0].nationalRank}</span>
                <span>Top {Math.round(progress.reports[0].percentile)}%</span>
              </div>
              <button 
                onClick={() => handleViewReport(progress.reports[0])}
                className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm font-bold transition-colors"
              >
                Buka Assessment Report
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-black text-slate-900">Latihan per Materi</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 'TPS', title: 'TPS', icon: Target, color: 'bg-rose-500' },
            { id: 'Literasi Indonesia', title: 'Lit. Indonesia', icon: BookOpen, color: 'bg-indigo-500' },
            { id: 'Literasi Inggris', title: 'Lit. Inggris', icon: Clock, color: 'bg-amber-500' },
            { id: 'Penalaran Matematika', title: 'Pen. Matematika', icon: BarChart3, color: 'bg-emerald-500' },
          ].map(cat => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStart('category', cat.id as Category)}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center flex flex-col items-center gap-3 group"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", cat.color)}>
                <cat.icon size={28} />
              </div>
              <h3 className="font-bold text-slate-900">{cat.title}</h3>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );

  const QuizView = () => {
    if (!session || !currentQuestion) return null;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header CBT */}
        <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowExitConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-all font-bold text-sm"
            >
              <Home size={18} />
              <span>Dashboard</span>
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex flex-col">
              <span className="font-black text-slate-900 uppercase tracking-widest text-xs">
                {currentSubTest ? currentSubTest.name : session.mode}
              </span>
              {currentSubTest && (
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Sub-test {session.currentSubTestIdx! + 1} of {session.subTests!.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl font-mono transition-colors",
                currentSubTest && currentSubTest.remainingTime < 60 ? "bg-red-50 text-red-600 animate-pulse" : "bg-slate-50 text-slate-600"
              )}>
                <Clock size={18} className={currentSubTest && currentSubTest.remainingTime < 60 ? "text-red-500" : "text-indigo-500"} />
                <span className="text-lg font-black">
                  {currentSubTest ? formatTime(currentSubTest.remainingTime) : 'Free Time'}
                </span>
              </div>
              {currentSubTest && (
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Waktu Sub-tes
                </span>
              )}
            </div>
            {!session.isSubmitted && (
              <button 
                onClick={() => {
                  if (session.mode === 'tryout' && session.currentSubTestIdx !== undefined && session.subTests && session.currentSubTestIdx < session.subTests.length - 1) {
                    setShowSubTestConfirm(true);
                  } else {
                    setShowSubmitConfirm(true);
                  }
                }}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-black hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
              >
                {session.mode === 'tryout' && session.currentSubTestIdx !== undefined && session.subTests && session.currentSubTestIdx < session.subTests.length - 1 
                  ? 'Selesai Sub-tes' 
                  : 'Selesai Ujian'}
              </button>
            )}
          </div>
        </nav>

        {/* Exit Confirmation Modal */}
        {/* Sub-test Confirmation Modal */}
        <AnimatePresence>
          {showSubTestConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSubTestConfirm(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl space-y-6"
              >
                <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
                  <Clock size={32} />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Selesai Sub-tes?</h3>
                  <p className="text-slate-500 font-medium">Kamu tidak akan bisa kembali ke sub-tes ini setelah melanjutkan ke sub-tes berikutnya.</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowSubTestConfirm(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={() => {
                      nextSubTest();
                      setShowSubTestConfirm(false);
                      window.scrollTo(0, 0);
                    }}
                    className="flex-1 py-4 rounded-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                  >
                    Lanjut
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Final Submit Confirmation Modal */}
        <AnimatePresence>
          {showSubmitConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSubmitConfirm(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl space-y-6"
              >
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center text-green-600 mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Selesai Ujian?</h3>
                  <p className="text-slate-500 font-medium">Apakah kamu yakin ingin mengakhiri sesi ujian ini dan melihat hasilnya?</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={() => {
                      submitQuiz();
                      setShowSubmitConfirm(false);
                      setView('report');
                      window.scrollTo(0, 0);
                    }}
                    className="flex-1 py-4 rounded-2xl font-bold text-white bg-green-600 hover:bg-green-600 transition-colors shadow-lg shadow-green-100"
                  >
                    Ya, Selesai
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex-1 max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_350px] gap-6 p-6">
          {/* Main Question Area */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">Soal No. {session.currentIdx + 1}</span>
                  <div className="flex gap-2 items-center">
                    <DifficultyBadge difficulty={currentQuestion.difficulty} />
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase font-black border border-slate-200">
                      {currentQuestion.concept}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                  Waktu Soal: {formatTime(questionTimer)}
                </div>
              </div>

              <h2 className="text-2xl font-medium text-slate-800 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.type === 'multiple_choice' && currentQuestion.options?.map((option, idx) => {
                  const isSelected = session.answers[currentQuestion.id] === idx;
                  const isCorrect = currentQuestion.correctAnswer === idx;
                  const showResult = session.isSubmitted;

                  return (
                    <button
                      key={idx}
                      disabled={session.isSubmitted}
                      onClick={() => answerQuestion(idx)}
                      className={cn(
                        "w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 group",
                        !showResult && isSelected ? "border-indigo-600 bg-indigo-50" : "border-slate-100 hover:border-slate-200",
                        showResult && isCorrect ? "border-green-500 bg-green-50" : "",
                        showResult && isSelected && !isCorrect ? "border-red-500 bg-red-50" : ""
                      )}
                    >
                      <span className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-colors",
                        !showResult && isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200",
                        showResult && isCorrect ? "bg-green-500 text-white" : "",
                        showResult && isSelected && !isCorrect ? "bg-red-500 text-white" : ""
                      )}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className={cn(
                        "text-slate-700 pt-2 text-lg",
                        isSelected && "font-bold"
                      )}>
                        {option}
                      </span>
                      {showResult && isCorrect && <CheckCircle2 className="ml-auto text-green-500 mt-2" size={24} />}
                      {showResult && isSelected && !isCorrect && <XCircle className="ml-auto text-red-500 mt-2" size={24} />}
                    </button>
                  );
                })}

                {currentQuestion.type === 'complex_multiple_choice' && currentQuestion.complexOptions?.map((opt, idx) => {
                  const currentAnswers = (session.answers[currentQuestion.id] as boolean[]) || Array(currentQuestion.complexOptions?.length).fill(null);
                  const showResult = session.isSubmitted;

                  return (
                    <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4">
                      <p className="text-slate-700 font-bold">{opt.statement}</p>
                      <div className="flex gap-3">
                        {[true, false].map((val) => (
                          <button
                            key={val ? 'yes' : 'no'}
                            disabled={session.isSubmitted}
                            onClick={() => {
                              const newAnswers = [...currentAnswers];
                              newAnswers[idx] = val;
                              answerQuestion(newAnswers);
                            }}
                            className={cn(
                              "flex-1 py-3 rounded-xl text-xs font-black border-2 transition-all tracking-widest",
                              currentAnswers[idx] === val 
                                ? (showResult ? (val === opt.correct ? "bg-green-500 border-green-500 text-white" : "bg-red-500 border-red-500 text-white") : "bg-indigo-600 border-indigo-600 text-white")
                                : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                            )}
                          >
                            {val ? 'BENAR' : 'SALAH'}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}

                {currentQuestion.type === 'short_answer' && (
                  <div className="space-y-4">
                    <div className="relative">
                      <input 
                        type="number"
                        disabled={session.isSubmitted}
                        value={session.answers[currentQuestion.id] ?? ''}
                        onChange={(e) => answerQuestion(e.target.value)}
                        placeholder="Masukkan jawaban angka..."
                        className={cn(
                          "w-full p-6 rounded-2xl border-2 text-2xl font-black transition-all outline-none",
                          session.isSubmitted 
                            ? (Number(session.answers[currentQuestion.id]) === currentQuestion.shortAnswerCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50")
                            : "border-slate-200 focus:border-indigo-600 focus:ring-8 focus:ring-indigo-50"
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {session.isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 space-y-4"
                >
                  <div className="flex items-center gap-3 text-indigo-900 font-black">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <Info size={20} />
                    </div>
                    <h4 className="text-lg">Analisis Jawaban</h4>
                  </div>
                  <p className="text-indigo-800 leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </div>

              <div className="flex justify-between items-center bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <button 
                  onClick={prevQuestion}
                  disabled={session.currentIdx === 0}
                  className="flex items-center gap-2 px-6 py-3 text-slate-600 font-black hover:bg-slate-50 rounded-2xl disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={20} /> Sebelumnya
                </button>
                
                <button 
                  onClick={toggleMark}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-2xl font-black transition-all border-2",
                    session.marked[currentQuestion.id] 
                      ? "bg-amber-400 border-amber-400 text-slate-900 shadow-lg shadow-amber-100" 
                      : "bg-white border-slate-200 text-slate-500 hover:border-amber-200 hover:text-amber-600"
                  )}
                >
                  <AlertTriangle size={18} /> Ragu-ragu
                </button>

                <button 
                  onClick={nextQuestion}
                  disabled={isLastQuestion}
                  className="flex items-center gap-2 px-6 py-3 text-indigo-600 font-black hover:bg-indigo-50 rounded-2xl disabled:opacity-30 transition-all"
                >
                  Berikutnya <ChevronRight size={20} />
                </button>
              </div>
          </div>

          {/* Navigation Grid */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm sticky top-24 space-y-8">
              <div className="flex items-center gap-3 font-black text-slate-800">
                <div className="bg-indigo-50 p-2 rounded-lg">
                  <LayoutGrid size={20} className="text-indigo-600" />
                </div>
                <h3 className="text-lg">Peta Soal</h3>
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                {session.questions.map((q, idx) => {
                  // Filter by sub-test if in tryout mode
                  if (session.mode === 'tryout' && currentSubTest) {
                    if (!currentSubTest.questionIndices.includes(idx)) return null;
                  }

                  const isAnswered = session.answers[q.id] !== undefined;
                  const isMarked = session.marked[q.id];
                  const isCurrent = session.currentIdx === idx;
                  const showResult = session.isSubmitted;
                  
                  // Correctness check for navigation grid
                  let isCorrect = false;
                  if (showResult && isAnswered) {
                    if (q.type === 'multiple_choice') isCorrect = session.answers[q.id] === q.correctAnswer;
                    else if (q.type === 'complex_multiple_choice') isCorrect = q.complexOptions?.every((opt, i) => opt.correct === (session.answers[q.id] as boolean[])[i]) ?? false;
                    else if (q.type === 'short_answer') isCorrect = Number(session.answers[q.id]) === q.shortAnswerCorrect;
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSession(prev => prev ? { ...prev, currentIdx: idx } : null)}
                      className={cn(
                        "aspect-square rounded-xl flex items-center justify-center text-xs font-black transition-all border-2",
                        isCurrent ? "border-indigo-600 ring-4 ring-indigo-50" : "border-transparent",
                        !showResult && isMarked ? "bg-amber-400 text-slate-900" :
                        !showResult && isAnswered ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-400",
                        showResult && isCorrect ? "bg-green-500 text-white" : 
                        showResult && isAnswered && !isCorrect ? "bg-red-500 text-white" : 
                        !isAnswered && "bg-slate-100"
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                  <Info size={14} /> Keterangan
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <div className="w-3 h-3 rounded bg-indigo-600" /> Terjawab
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <div className="w-3 h-3 rounded bg-amber-400" /> Ragu-ragu
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                    <div className="w-3 h-3 rounded bg-slate-100" /> Belum
                  </div>
                  {session.isSubmitted && (
                    <>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <div className="w-3 h-3 rounded bg-green-500" /> Benar
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                        <div className="w-3 h-3 rounded bg-red-500" /> Salah
                      </div>
                    </>
                  )}
                </div>
              </div>

              {session.isSubmitted && (
                <button 
                  onClick={() => {
                    setView('dashboard');
                    setSession(null);
                  }}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl"
                >
                  Kembali ke Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ReportView = () => {
    if (!selectedReport) return null;

    const masteryData = Object.entries(selectedReport.materialMastery).map(([name, value]) => ({
      subject: name,
      A: value,
      fullMark: 100,
    }));

    return (
      <div className="min-h-screen bg-slate-50 pb-24">
        <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-black text-slate-900">Assessment Report</h1>
        </nav>

        <div className="max-w-5xl mx-auto p-6 space-y-8">
          <div className="bg-white rounded-[40px] p-10 border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-10 items-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-[12px] border-indigo-50 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">IRT Score</span>
                <span className="text-5xl font-black text-indigo-600">{Math.round(selectedReport.totalScore)}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/ 1000</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-slate-900 px-4 py-2 rounded-2xl font-black text-xs shadow-lg">
                Top {Math.round(selectedReport.percentile)}%
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Peringkat Nasional</p>
                <p className="text-2xl font-black text-slate-900">#{selectedReport.nationalRank.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 font-medium">Dari {selectedReport.totalParticipants.toLocaleString()} peserta</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Potensi Lulus</p>
                <p className="text-2xl font-black text-emerald-600">{selectedReport.totalScore > 650 ? 'Sangat Tinggi' : selectedReport.totalScore > 550 ? 'Tinggi' : 'Menengah'}</p>
                <p className="text-[10px] text-slate-400 font-medium">Berdasarkan skor rata-rata PTN</p>
              </div>
              <div className="space-y-1 col-span-2 md:col-span-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanggal Tes</p>
                <p className="text-2xl font-black text-slate-900">{new Date(selectedReport.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="bg-rose-100 p-2 rounded-xl">
                  <Target size={20} className="text-rose-600" />
                </div>
                Analisis Materi Uji
              </h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={masteryData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} />
                    <Radar
                      name="Mastery"
                      dataKey="A"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-sm space-y-8">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-xl">
                  <School size={20} className="text-indigo-600" />
                </div>
                Rekomendasi PTN & Prodi
              </h3>
              <div className="space-y-4">
                {selectedReport.recommendations.map((rec, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-indigo-50 hover:border-indigo-100 transition-all">
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900">{rec.ptn}</h4>
                      <p className="text-sm text-slate-500 font-bold">{rec.prodi}</p>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-lg font-black",
                        rec.chance > 70 ? "text-emerald-600" : rec.chance > 40 ? "text-amber-600" : "text-rose-600"
                      )}>
                        {rec.chance}%
                      </div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Peluang Lolos</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-indigo-600 rounded-3xl p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Tips Strategi</p>
                <p className="text-sm font-medium leading-relaxed">
                  Skor kamu sangat kuat di Penalaran Umum. Fokuslah meningkatkan Literasi Bahasa Inggris untuk memperluas pilihan prodi di universitas top.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsView = () => {
    const data = (Object.entries(progress.categoryStats) as [Category, { correct: number; total: number }][]).map(([name, stats]) => ({
      name,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      total: stats.total
    }));

    return (
      <div className="max-w-5xl mx-auto p-6 space-y-8 pb-24">
        <header className="flex items-center gap-4">
          <button onClick={() => setView('dashboard')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-black text-slate-900">Analisis Performa</h1>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
            <h3 className="font-black text-slate-800 flex items-center gap-3">
              <div className="bg-indigo-50 p-2 rounded-xl">
                <Target size={20} className="text-indigo-600" />
              </div>
              Akurasi per Kategori
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis dataKey="name" type="category" width={120} fontSize={10} tick={{ fill: '#64748b', fontWeight: 700 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px' }}
                  />
                  <Bar dataKey="accuracy" radius={[0, 10, 10, 0]} barSize={32}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.accuracy > 70 ? '#10b981' : entry.accuracy > 40 ? '#6366f1' : '#ef4444'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-black text-slate-800">Riwayat Tryout</h3>
              <div className="space-y-4">
                {progress.reports.length > 0 ? progress.reports.map((report) => (
                  <button 
                    key={report.id}
                    onClick={() => handleViewReport(report)}
                    className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-indigo-50 hover:border-indigo-100 transition-all"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(report.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                      </p>
                      <p className="font-black text-slate-900">Score: {Math.round(report.totalScore)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Percentile</p>
                        <p className="font-black text-indigo-600">{Math.round(report.percentile)}%</p>
                      </div>
                      <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </button>
                )) : (
                  <div className="text-center py-12 space-y-4">
                    <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <Search size={24} className="text-slate-300" />
                    </div>
                    <p className="text-slate-400 font-bold">Belum ada riwayat tes.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <DashboardView />
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-slate-200 px-8 py-4 rounded-[32px] shadow-2xl shadow-indigo-100 flex gap-12 z-50">
              <button onClick={() => setView('dashboard')} className={cn("p-3 rounded-2xl transition-all", view === 'dashboard' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-400 hover:text-slate-600")}>
                <Home size={24} />
              </button>
              <button onClick={() => setView('analytics')} className={cn("p-3 rounded-2xl transition-all", view === 'analytics' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-400 hover:text-slate-600")}>
                <BarChart3 size={24} />
              </button>
            </nav>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizView />
          </motion.div>
        )}

        {view === 'analytics' && (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <AnalyticsView />
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-slate-200 px-8 py-4 rounded-[32px] shadow-2xl shadow-indigo-100 flex gap-12 z-50">
              <button onClick={() => setView('dashboard')} className={cn("p-3 rounded-2xl transition-all", view === 'dashboard' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-400 hover:text-slate-600")}>
                <Home size={24} />
              </button>
              <button onClick={() => setView('analytics')} className={cn("p-3 rounded-2xl transition-all", view === 'analytics' ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200" : "text-slate-400 hover:text-slate-600")}>
                <BarChart3 size={24} />
              </button>
            </nav>
          </motion.div>
        )}

        {view === 'report' && (
          <motion.div 
            key="report"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ReportView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
