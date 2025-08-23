/**
 * Calculates monthly can projections with a dynamic can limit (320 or 640)
 * When projection exceeds the limit, it caps at the limit for all subsequent months
 */
export function calculateMonthlyCanProjection(
  initialCans: number,
  growthRate: number,
  month: number,
  maxCans: number = 320
): number {
  // Calculate projected cans without limit
  const projectedCans = initialCans * Math.pow(1 + growthRate / 100, month - 1);
  
  // If first month already exceeds limit, cap it
  if (month === 1) {
    return Math.min(projectedCans, maxCans);
  }
  
  // Check if previous month hit the limit
  const previousMonthProjected = initialCans * Math.pow(1 + growthRate / 100, month - 2);
  if (previousMonthProjected >= maxCans) {
    return maxCans;
  }
  
  // Cap current month if it exceeds limit
  return Math.min(projectedCans, maxCans);
}

/**
 * Generates an array of monthly can projections with a dynamic can limit (320 or 640)
 */
export function generateMonthlyCanProjections(
  initialCans: number,
  growthRate: number,
  totalMonths: number,
  maxCans: number = 320
): number[] {
  const projections = [];
  
  for (let month = 1; month <= totalMonths; month++) {
    projections.push(calculateMonthlyCanProjection(initialCans, growthRate, month, maxCans));
  }
  
  return projections;
}