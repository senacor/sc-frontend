export const weightSumWithoutPR = (
  dailyBusiness,
  project,
  workEfficiency,
  workQuality
) => {
  const weightSum =
    reduceWeights(dailyBusiness) +
    reduceWeights(project) +
    workEfficiency.weight +
    workQuality.weight;
  return weightSum;
};

const reduceWeights = arr => {
  const value = arr.reduce((acc, obj) => {
    return acc + obj.weight;
  }, 0);
  return value;
};
