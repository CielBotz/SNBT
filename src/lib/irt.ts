/**
 * Simplified IRT Scoring (3PL Model approximation)
 * In a real SNBT, this is calculated across all participants.
 * For simulation, we use the pre-defined question parameters.
 */
export function calculateIRTScore(results: { correct: boolean; irtParams: { difficulty: number; discrimination: number; guessing: number } }[]): number {
  if (results.length === 0) return 200;

  let weightedSum = 0;
  let maxWeightedSum = 0;

  results.forEach((r) => {
    const { difficulty, discrimination, guessing } = r.irtParams;
    
    // Weight is higher for more difficult and more discriminating questions
    // Normalized difficulty to 0-1 range for weighting (original is -3 to 3)
    const normalizedDifficulty = (difficulty + 3) / 6;
    
    // In IRT, discrimination (a) is a multiplier for the difficulty-ability gap.
    // We use it as a primary weight. Guessing (c) reduces the information value of a question.
    const weight = discrimination * (1 + normalizedDifficulty) * (1 - guessing);

    if (r.correct) {
      weightedSum += weight;
    }
    
    maxWeightedSum += weight;
  });

  // Base score is 200. We add up to 800 points based on performance.
  const performanceRatio = maxWeightedSum > 0 ? (weightedSum / maxWeightedSum) : 0;
  const score = 200 + (performanceRatio * 800);

  return Math.max(200, Math.min(1000, Math.round(score)));
}

/**
 * Simulates national ranking and percentile based on score
 */
export function getNationalStats(score: number) {
  // Simulated normal distribution: mean 550, std dev 120
  const mean = 550;
  const stdDev = 120;
  
  // Z-score
  const z = (score - mean) / stdDev;
  
  // Percentile approximation (Error function)
  const percentile = 0.5 * (1 + erf(z / Math.sqrt(2)));
  
  const totalParticipants = 850000; // Typical SNBT participants
  const rank = Math.round(totalParticipants * (1 - percentile));
  
  return {
    rank: Math.max(1, rank),
    totalParticipants,
    percentile: Math.round(percentile * 100)
  };
}

// Helper for percentile calculation
function erf(x: number): number {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}
