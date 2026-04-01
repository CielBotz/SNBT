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
import { Difficulty, Category, Question, AssessmentReport, StudyMaterial } from './types/quiz';
import { STUDY_MATERIALS } from './data/materials';
import ReactMarkdown from 'react-markdown';
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

  const [view, setView] = useState<'dashboard' | 'quiz' | 'analytics' | 'report' | 'study'>('dashboard');
  const [selectedReport, setSelectedReport] = useState<AssessmentReport | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [showSummary, setShowSummary] = useState(false);
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
          <div className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[48px] p-10 text-white overflow-hidden shadow-2xl shadow-indigo-200 group">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070" 
              alt="Dashboard Hero" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                <Zap size={14} className="text-yellow-300" /> Simulasi IRT Aktif
              </div>
              <div className="space-y-4 max-w-lg">
                <h2 className="text-5xl font-black leading-[0.9] tracking-tighter italic">SIAP MENEMBUS <br /><span className="text-indigo-200 underline decoration-indigo-400/50">PTN IMPIANMU?</span></h2>
                <p className="text-indigo-100 text-lg font-medium opacity-90 leading-relaxed">Uji kemampuanmu dengan sistem penilaian IRT (Item Response Theory) yang digunakan pada UTBK resmi.</p>
              </div>
              <button 
                onClick={() => handleStart('tryout')}
                className="bg-white text-indigo-600 px-10 py-5 rounded-[24px] font-black text-xl hover:bg-indigo-50 transition-all shadow-2xl shadow-indigo-900/20 flex items-center gap-3 group w-full md:w-auto justify-center"
              >
                Mulai Full Tryout <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-12 top-12 opacity-20 group-hover:rotate-12 transition-transform duration-500">
              <GraduationCap size={160} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'daily', title: 'Daily Challenge', icon: Target, color: 'bg-rose-500', desc: '5 Soal Harian' },
              { id: 'mini', title: 'Mini Test', icon: BookOpen, color: 'bg-indigo-500', desc: '10 Soal Cepat' },
              { id: 'study', title: 'Belajar Mandiri', icon: School, color: 'bg-emerald-500', desc: 'Materi & Ringkasan' },
            ].map(mode => (
              <motion.button
                key={mode.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => mode.id === 'study' ? setView('study') : handleStart(mode.id as any)}
                className={cn(
                  "bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-left flex flex-col gap-4 group",
                  mode.id === 'study' && "col-span-2 md:col-span-1"
                )}
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
      <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans">
        {/* Header CBT Resmi Style */}
        <nav className="bg-[#2b3e50] text-white px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-lg">
                <School size={24} className="text-[#2b3e50]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm tracking-widest uppercase">SIMULASI SNBT 2026</span>
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Pusat Asesmen Pendidikan</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-600/50 mx-2" />
            <div className="flex flex-col">
              <span className="font-bold text-xs text-indigo-300 uppercase tracking-widest">
                {currentSubTest ? currentSubTest.name : session.mode}
              </span>
              {currentSubTest && (
                <span className="text-[10px] text-slate-400 font-medium">
                  Sub-tes {session.currentSubTestIdx! + 1} dari {session.subTests!.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 bg-[#1e2b38] px-5 py-2 rounded-xl border border-slate-700">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">SISA WAKTU</span>
                <div className={cn(
                  "flex items-center gap-2 font-mono",
                  currentSubTest && currentSubTest.remainingTime < 60 ? "text-red-400 animate-pulse" : "text-white"
                )}>
                  <Clock size={16} />
                  <span className="text-xl font-black leading-none">
                    {currentSubTest ? formatTime(currentSubTest.remainingTime) : '00:00'}
                  </span>
                </div>
              </div>
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
                className="bg-[#e67e22] text-white px-8 py-2.5 rounded-xl font-black hover:bg-[#d35400] transition-all text-sm uppercase tracking-widest shadow-lg shadow-orange-900/20"
              >
                {session.mode === 'tryout' && session.currentSubTestIdx !== undefined && session.subTests && session.currentSubTestIdx < session.subTests.length - 1 
                  ? 'SELESAI SUB-TES' 
                  : 'SELESAI UJIAN'}
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

        <div className="flex-1 max-w-[1400px] mx-auto w-full grid md:grid-cols-[1fr_380px] gap-0">
          {/* Main Question Area */}
          <div className="flex flex-col bg-white border-r border-slate-200">
            <div className="flex-1 p-8 md:p-12 space-y-10 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentQuestion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-10"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#2b3e50] text-white w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-inner">
                        {session.currentIdx + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">NOMOR SOAL</span>
                        <div className="flex gap-2 items-center">
                          <DifficultyBadge difficulty={currentQuestion.difficulty} />
                          <span className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">
                            {currentQuestion.concept}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                      <Clock size={14} className="text-slate-300" />
                      Waktu Soal: {formatTime(questionTimer)}
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <h2 className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  <div className="space-y-4 max-w-3xl">
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
                            "w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-5 group relative",
                            !showResult && isSelected ? "border-[#3498db] bg-[#ebf5fb]" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50",
                            showResult && isCorrect ? "border-green-500 bg-green-50" : "",
                            showResult && isSelected && !isCorrect ? "border-red-500 bg-red-50" : ""
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0 border-2 transition-all",
                            !showResult && isSelected ? "bg-[#3498db] border-[#3498db] text-white" : "bg-white border-slate-200 text-slate-500 group-hover:border-slate-400",
                            showResult && isCorrect ? "bg-green-500 border-green-500 text-white" : "",
                            showResult && isSelected && !isCorrect ? "bg-red-500 border-red-500 text-white" : ""
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={cn(
                            "text-slate-700 text-lg flex-1",
                            isSelected && "font-bold text-slate-900"
                          )}>
                            {option}
                          </span>
                          {showResult && isCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                          {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" size={24} />}
                        </button>
                      );
                    })}
                    {currentQuestion.type === 'complex_multiple_choice' && currentQuestion.complexOptions?.map((opt, idx) => {
                      const currentAnswers = (session.answers[currentQuestion.id] as boolean[]) || Array(currentQuestion.complexOptions?.length).fill(null);
                      const showResult = session.isSubmitted;

                      return (
                        <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white space-y-4 shadow-sm">
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
                                  "flex-1 py-3 rounded-lg text-xs font-black border-2 transition-all tracking-widest",
                                  currentAnswers[idx] === val 
                                    ? (showResult ? (val === opt.correct ? "bg-green-500 border-green-500 text-white" : "bg-red-500 border-red-500 text-white") : "bg-[#3498db] border-[#3498db] text-white")
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
                              "w-full p-6 rounded-xl border-2 text-2xl font-black transition-all outline-none",
                              session.isSubmitted 
                                ? (Number(session.answers[currentQuestion.id]) === currentQuestion.shortAnswerCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50")
                                : "border-slate-200 focus:border-[#3498db] focus:ring-8 focus:ring-blue-50"
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {session.isSubmitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-indigo-50 border-l-4 border-indigo-500 p-6 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase tracking-widest">
                        <Info size={18} />
                        Pembahasan
                      </div>
                      <p className="text-indigo-800 leading-relaxed text-base">
                        {currentQuestion.explanation}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation Bar Resmi Style */}
            <div className="bg-[#f8fafc] border-t border-slate-200 p-6 flex justify-between items-center sticky bottom-0">
              <button 
                onClick={prevQuestion}
                disabled={session.currentIdx === 0}
                className="flex items-center gap-3 px-8 py-3 bg-[#34495e] text-white font-bold rounded-xl disabled:opacity-30 hover:bg-[#2c3e50] transition-all shadow-md uppercase text-xs tracking-widest"
              >
                <ChevronLeft size={18} /> Sebelumnya
              </button>
              
              <button 
                onClick={toggleMark}
                className={cn(
                  "flex items-center gap-3 px-10 py-3 rounded-xl font-black transition-all border-2 uppercase text-xs tracking-widest shadow-md",
                  session.marked[currentQuestion.id] 
                    ? "bg-[#f1c40f] border-[#f1c40f] text-slate-900" 
                    : "bg-[#f39c12] border-[#f39c12] text-white hover:bg-[#e67e22]"
                )}
              >
                <AlertTriangle size={18} /> Ragu-ragu
              </button>

              <button 
                onClick={nextQuestion}
                disabled={isLastQuestion}
                className="flex items-center gap-3 px-8 py-3 bg-[#3498db] text-white font-bold rounded-xl disabled:opacity-30 hover:bg-[#2980b9] transition-all shadow-md uppercase text-xs tracking-widest"
              >
                Selanjutnya <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Navigation Grid Resmi Style */}
          <div className="bg-[#f8fafc] p-8 space-y-8 overflow-y-auto border-l border-slate-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3 font-black text-slate-700 uppercase tracking-widest text-sm">
                  <LayoutGrid size={18} className="text-slate-400" />
                  Nomor Soal
                </div>
                <span className="text-[10px] font-black bg-slate-200 text-slate-600 px-2 py-1 rounded">
                  {session.questions.length} TOTAL
                </span>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {session.questions.map((q, idx) => {
                  if (session.mode === 'tryout' && currentSubTest) {
                    if (!currentSubTest.questionIndices.includes(idx)) return null;
                  }

                  const isAnswered = session.answers[q.id] !== undefined;
                  const isMarked = session.marked[q.id];
                  const isCurrent = session.currentIdx === idx;
                  const showResult = session.isSubmitted;
                  
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
                        "aspect-square rounded-lg flex items-center justify-center text-xs font-black transition-all border-2 relative",
                        isCurrent ? "border-[#3498db] scale-110 z-10 shadow-lg" : "border-slate-200",
                        !showResult && isMarked ? "bg-[#f1c40f] border-[#f1c40f] text-slate-900" :
                        !showResult && isAnswered ? "bg-[#2ecc71] border-[#2ecc71] text-white" : "bg-white text-slate-400",
                        showResult && isCorrect ? "bg-green-500 border-green-500 text-white" : 
                        showResult && isAnswered && !isCorrect ? "bg-red-500 border-red-500 text-white" : 
                        !isAnswered && "bg-white"
                      )}
                    >
                      {idx + 1}
                      {isCurrent && (
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#3498db] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Keterangan</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                    <div className="w-4 h-4 rounded bg-[#2ecc71] border border-[#27ae60]" /> 
                    <span>SUDAH DIJAWAB</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                    <div className="w-4 h-4 rounded bg-[#f1c40f] border border-[#f39c12]" /> 
                    <span>RAGU-RAGU</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600">
                    <div className="w-4 h-4 rounded bg-white border border-slate-200" /> 
                    <span>BELUM DIJAWAB</span>
                  </div>
                </div>
              </div>

              {session.isSubmitted && (
                <button 
                  onClick={() => {
                    setView('dashboard');
                    setSession(null);
                  }}
                  className="w-full bg-[#2b3e50] text-white py-4 rounded-xl font-black hover:bg-[#1e2b38] transition-all shadow-lg uppercase text-xs tracking-widest"
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

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [conceptFilter, setConceptFilter] = useState<string>('All');

  const categories = ['All', ...new Set(STUDY_MATERIALS.map(m => m.category))];
  const concepts = ['All', ...new Set(STUDY_MATERIALS.filter(m => categoryFilter === 'All' || m.category === categoryFilter).map(m => m.concept))];

  const filteredMaterials = STUDY_MATERIALS.filter(m => {
    const categoryMatch = categoryFilter === 'All' || m.category === categoryFilter;
    const conceptMatch = conceptFilter === 'All' || m.concept === conceptFilter;
    return categoryMatch && conceptMatch;
  });

  const StudyView = () => (
    <div className="max-w-5xl mx-auto p-6 space-y-8 pb-24">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (selectedMaterial) setSelectedMaterial(null);
              else setView('dashboard');
            }}
            className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Belajar Mandiri</h1>
            <p className="text-slate-500 font-medium">Pahami konsep secara mendalam</p>
          </div>
        </div>

        {!selectedMaterial && (
          <div className="flex flex-wrap gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kategori</label>
              <select 
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setConceptFilter('All');
                }}
                className="block w-full pl-3 pr-10 py-2 text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl bg-white font-bold text-slate-700 shadow-sm transition-all"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Konsep</label>
              <select 
                value={conceptFilter}
                onChange={(e) => setConceptFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl bg-white font-bold text-slate-700 shadow-sm transition-all"
              >
                {concepts.map(con => <option key={con} value={con}>{con}</option>)}
              </select>
            </div>
          </div>
        )}
      </header>

      {!selectedMaterial ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map(material => (
            <motion.button
              key={material.id}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMaterial(material)}
              className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 text-left space-y-6 group transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[64px] -mr-8 -mt-8 group-hover:bg-indigo-50 transition-colors" />
              
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg relative z-10",
                material.category === 'TPS' ? 'bg-rose-500' : material.category === 'Literasi Indonesia' ? 'bg-indigo-500' : material.category === 'Literasi Inggris' ? 'bg-amber-500' : 'bg-emerald-500'
              )}>
                <BookOpen size={28} />
              </div>
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{material.concept}</span>
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{material.title}</h3>
              </div>
              <div className="flex items-center text-indigo-600 font-bold text-sm gap-2 relative z-10">
                Mulai Belajar <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
          {filteredMaterials.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <BookOpen size={40} />
              </div>
              <p className="text-slate-500 font-bold">Tidak ada materi yang sesuai dengan filter.</p>
              <button 
                onClick={() => { setCategoryFilter('All'); setConceptFilter('All'); }}
                className="text-indigo-600 font-black text-sm uppercase tracking-widest hover:underline"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-900 p-8 md:p-12 text-white space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                  {selectedMaterial.category}
                </span>
                <span className="px-4 py-1.5 bg-indigo-500/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                  {selectedMaterial.concept}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">{selectedMaterial.title}</h2>
              
              <div className="flex p-1.5 bg-white/10 backdrop-blur-md rounded-2xl w-fit">
                <button 
                  onClick={() => setShowSummary(false)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                    !showSummary ? "bg-white text-slate-900 shadow-lg" : "text-white/60 hover:text-white"
                  )}
                >
                  Materi Lengkap
                </button>
                <button 
                  onClick={() => setShowSummary(true)}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                    showSummary ? "bg-white text-slate-900 shadow-lg" : "text-white/60 hover:text-white"
                  )}
                >
                  Ringkasan
                </button>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="prose prose-slate max-w-none">
                {showSummary ? (
                  <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                    <div className="flex items-center gap-3 text-indigo-900 font-black mb-4">
                      <Zap size={20} className="text-amber-500" />
                      <h4 className="text-lg">Ringkasan Materi</h4>
                    </div>
                    <p className="text-indigo-800 text-lg leading-relaxed font-medium italic">
                      "{selectedMaterial.summary}"
                    </p>
                  </div>
                ) : (
                  <div className="text-slate-700 leading-relaxed text-lg space-y-6">
                    <ReactMarkdown>{selectedMaterial.fullContent}</ReactMarkdown>
                  </div>
                )}
              </div>

              <div className="mt-12 pt-12 border-t border-slate-100 space-y-6">
                <h4 className="font-black text-slate-900 flex items-center gap-2">
                  <Search size={18} className="text-indigo-600" /> Sumber Belajar
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedMaterial.sources.map((source, idx) => (
                    <a 
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-indigo-700">{source.name}</span>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700">
      <AnimatePresence mode="wait">
        {view === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <DashboardView />
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-slate-200 px-8 py-4 rounded-[32px] shadow-2xl shadow-indigo-100 flex gap-12 z-50">
              <button onClick={() => setView('dashboard')} className={cn("p-3 rounded-2xl transition-all", "bg-indigo-600 text-white shadow-xl shadow-indigo-200")}>
                <Home size={24} />
              </button>
              <button onClick={() => setView('study')} className={cn("p-3 rounded-2xl transition-all", "text-slate-400 hover:text-slate-600")}>
                <BookOpen size={24} />
              </button>
              <button onClick={() => setView('analytics')} className={cn("p-3 rounded-2xl transition-all", "text-slate-400 hover:text-slate-600")}>
                <BarChart3 size={24} />
              </button>
            </nav>
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <QuizView />
          </motion.div>
        )}

        {view === 'analytics' && (
          <motion.div 
            key="analytics"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <AnalyticsView />
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-slate-200 px-8 py-4 rounded-[32px] shadow-2xl shadow-indigo-100 flex gap-12 z-50">
              <button onClick={() => setView('dashboard')} className={cn("p-3 rounded-2xl transition-all", "text-slate-400 hover:text-slate-600")}>
                <Home size={24} />
              </button>
              <button onClick={() => setView('study')} className={cn("p-3 rounded-2xl transition-all", "text-slate-400 hover:text-slate-600")}>
                <BookOpen size={24} />
              </button>
              <button onClick={() => setView('analytics')} className={cn("p-3 rounded-2xl transition-all", "bg-indigo-600 text-white shadow-xl shadow-indigo-200")}>
                <BarChart3 size={24} />
              </button>
            </nav>
          </motion.div>
        )}

        {view === 'report' && (
          <motion.div 
            key="report"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ReportView />
          </motion.div>
        )}

        {view === 'study' && (
          <motion.div 
            key="study"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <StudyView />
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-slate-200 px-8 py-4 rounded-[32px] shadow-2xl shadow-indigo-100 flex gap-12 z-50">
              <button onClick={() => setView('dashboard')} className={cn("p-3 rounded-2xl transition-all", "text-slate-400 hover:text-slate-600")}>
                <Home size={24} />
              </button>
              <button onClick={() => setView('study')} className={cn("p-3 rounded-2xl transition-all", "bg-indigo-600 text-white shadow-xl shadow-indigo-200")}>
                <BookOpen size={24} />
              </button>
              <button onClick={() => setView('analytics')} className={cn("p-3 rounded-2xl transition-all", "text-slate-400 hover:text-slate-600")}>
                <BarChart3 size={24} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
