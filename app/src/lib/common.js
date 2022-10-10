export const filterObj = (obj) => {
  const filtered = {};
  for (let prop in obj) {
    if (!!obj[prop]) {
      filtered[prop] = obj[prop];
    }
  }
  return filtered;
};
