export const formatLocalDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export const getBirthDateWithOffset = (daysOffset: number): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  date.setDate(date.getDate() + daysOffset);
  return formatLocalDate(date);
};
