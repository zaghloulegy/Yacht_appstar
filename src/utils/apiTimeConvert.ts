const APIConvertTime = (timestamp: any) => {
  const number = parseInt(timestamp);
  let day = `${new Date(number).getUTCDate()}`;
  if(`${day}`.length === 1) {
    day = `0${day}`
  };
  let month = `${new Date(number).getUTCMonth() + 1}`;
  if(`${month}`.length === 1) {
    month = `0${month}`
  };
  const year = new Date(number).getUTCFullYear();
  return `${year}-${month}-${day}`;
};

export default APIConvertTime;