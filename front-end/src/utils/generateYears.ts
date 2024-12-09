export const generateYears = (startYear: number) => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year.toString());
  }
  return years;
};
