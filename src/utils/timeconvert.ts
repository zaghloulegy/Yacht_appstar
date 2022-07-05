const convertTime = (timestamp: any) => {
  const number = parseInt(timestamp);
  return new Date(number);
};

export default convertTime;