export const getTimeInfo = (time) => {
  const date = new Date(time + "Z");
  const dateHour = date.getHours();
  const dateMin = date.getMinutes();
  return [dateHour, dateMin];
};
