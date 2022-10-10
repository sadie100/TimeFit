export const getISOTimeValue = (time) => {
  // const timeDate = new Date(time + "Z");
  const timeDate = new Date(time);
  const year = timeDate.getFullYear();
  const month = timeDate.getMonth();
  const date = timeDate.getDate();
  const hour = timeDate.getHours();
  const min = timeDate.getMinutes();
  return { year, month, date, hour, min };
};

export const getTimeInfo = (time) => {
  const { hour, min } = getISOTimeValue(time);
  return [hour, min];
};

export const setDoubleDigits = (value) => {
  return value.toString().padStart(2, "0");
};

export const getTimeFormat = (time) => {
  const { year, month, date, hour, min } = time;
  return `${year}년 ${month}월 ${date}일 ${setDoubleDigits(
    hour
  )}:${setDoubleDigits(min)}`;
};

export const getHourFormat = (time) => {
  const { hour, min } = time;
  return `${setDoubleDigits(hour)}:${setDoubleDigits(min)}`;
};

export const reservationTime = () => {
  const openAt = 9;
  const closeAt = 22;
  const totalRowEnd = (closeAt - openAt) * 60;

  const times = Array.from(
    { length: closeAt - openAt },
    (data, idx) => openAt + idx
  ).map((d, idx) => {
    return {
      label: d,
      rowStart: idx === 0 ? 1 : idx * 60,
      rowEnd: (idx + 1) * 60,
    };
  });
  return { openAt, closeAt, totalRowEnd, times };
};
