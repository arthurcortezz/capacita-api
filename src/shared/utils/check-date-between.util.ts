export function checkDateBetween(
  startDate: Date,
  endDate: Date,
  targetDate: Date,
) {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const targetYear = targetDate.getFullYear();
  const targetMonth = targetDate.getMonth();

  if (targetYear < startYear || targetYear > endYear) {
    return false;
  }

  if (targetYear === startYear && targetMonth < startMonth) {
    return false;
  }

  if (targetYear === endYear && targetMonth > endMonth) {
    return false;
  }

  return true;
}
