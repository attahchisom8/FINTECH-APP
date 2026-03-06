/**
 * generateHealthScore - generate a score based on users spensing, income and past
 * qns current spwnding
 * @income: Isers income
 * @MonthlyExpenses: average amount spent usually within 6 months
 * lastMonth: lastonth ezpenses
 * @currentMonth: currentMonth expenses
 *
 * Return: score between 0 and 100
 */

export const  generateHealthScore = async(
    income: number,
    monthlyExpenses: number,
    lastMonth: number,
    currentMonth: number
) => {
  let score = 0;
  const savingRate = (income -monthlyExpenses) / (income || 1);

  // measure useers saving rates
  if (savingRate >= 0.5)
    score += 50;
  else if (savingRate >= 0.2)
    score += 35;
  else if (savingRate >= 0.1)
    score += 20;

  // measure spending incresed or decreased across momths
  const trend = (currentMonth - lastMonth) / (lastMonth || 1)
  if (trend <= -0.1)
    score += 30;
  else if (trend <= 0)
    score += 20;
  else if (trend <= 0.1)
    score -= 5;
  else
    score -= 10;

  // check ufcuser is epending more than 80% of their income
  if(lastMonth < (0.8 * income))
    score += 20;

  return Math.max(0, Math.min(score, 100));
}
