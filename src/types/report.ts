import type { Category, Concept } from './question';
import type { QuestionHistoryItem, ConceptProfile, RemedialCycle } from './progress';

export interface ItemPerformance {
  attempts: number;
  correct: number;
}

export type QuizStrategy = 'remediation' | 'retention' | 'exam_simulation';

export interface ConceptLongitudinalMetrics {
  totalAttempts: number;
  totalCorrect: number;
  rollingAccuracy: number;
  recentTrend: number;
  confidenceBand: {
    low: number;
    high: number;
  };
  history: Array<{
    date: string;
    accuracy: number;
    sampleSize: number;
  }>;
  lastUpdated: string;
}

export interface SessionRecommendation {
  strategy: QuizStrategy;
  reason: string;
  weight: number;
  itemPerformance?: Record<string, ItemPerformance>;
  conceptMetrics?: { [key in Concept]?: ConceptLongitudinalMetrics };
}

export type ConceptStatus = 'Strong' | 'Watchlist' | 'Critical' | 'Insufficient Data';

export interface ConceptEvaluation {
  concept: Concept;
  status: ConceptStatus;
  rollingAccuracy: number;
  sampleSize: number;
  recentTrend: number;
  confidenceBand: {
    low: number;
    high: number;
  };
  questionHistory?: { [questionId: string]: QuestionHistoryItem };
  conceptProfiles?: { [concept: string]: ConceptProfile };
  remedialCycles?: RemedialCycle[];
  questionPerformance?: Record<string, unknown>;
  lastRemedialConcepts?: {
    concept: string;
    accuracy: number;
    materialId?: string;
  }[];
}

export interface SimulationAnalysis {
  accuracy: number;
  speed: number;
  stability: number;
  panicZones: {
    label: string;
    type: 'time' | 'concept';
    drop: number;
  }[];
  remedialPlan: {
    weekStart: string;
    focusConcepts: Concept[];
    actions: string[];
  };
}

export type ReadinessLevel = 'Aman' | 'Waspada' | 'Kritis';

export interface AssessmentReport {
  id: string;
  date: string;
  mode: 'practice' | 'simulation';
  totalScore: number;
  questionCount?: number;
  correctCount?: number;
  categoryScores: { [key in Category]: number };
  readinessScore: number;
  readinessBySubTest: {
    subTest: string;
    score: number;
    trend: number;
    stability: number;
    readiness: ReadinessLevel;
    sampleSize: number;
  }[];
  nationalRank: number;
  totalParticipants: number;
  percentile: number;
  materialMastery: Record<string, number>;
  conceptEvaluations: ConceptEvaluation[];
  recommendations: {
    ptn: string;
    prodi: string;
    chance: number;
  }[];
  examAnalytics?: {
    accuracy: number;
    speedPerQuestionSec: number;
    focusDrops: {
      questionId: string;
      concept: string;
      timeSpentSec: number;
      isCorrect: boolean;
    }[];
  };
  simulationAnalysis?: SimulationAnalysis;
  readinessIndex?: number;
  trendSessions?: number;
  consistency?: number;
  gapBySubTest?: { [key in Category]: number };
  focusRecommendations?: string[];
  target?: {
    ptn: string;
    prodi: string;
    passingGrade: number;
  };
  performancePrediction?: {
    scoreRange: [number, number];
    confidenceLevel: 'Low' | 'Medium' | 'High';
    summary: string;
  };
  stabilityAnalysis?: {
    level: 'Stabil' | 'Perlu Monitoring' | 'Tidak Stabil';
    flags: string[];
  };
  weaknessPriorities?: {
    domain: string;
    accuracy: number;
    priority: 'Kritis' | 'Tinggi' | 'Sedang';
    recommendation: string;
  }[];
  prioritizedWeakConcepts?: { concept: Concept; score: number }[];
}
