const daysCalc = (end: any, start:any) => {
  const difference = end - start;
  const daysDifference = difference/1000/60/60/24;
  return daysDifference.toFixed(1);
};

export default daysCalc;