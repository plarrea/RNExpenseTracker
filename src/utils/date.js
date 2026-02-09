export const getFormattedDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getDateMinusDay = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
