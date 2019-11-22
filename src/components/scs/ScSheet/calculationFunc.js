import cloneDeep from '../../../helper/cloneDeep';

export const reduceWeights = arr => {
  const value = arr.reduce((acc, obj) => {
    return acc + obj.weight;
  }, 0);
  return value;
};

// Helper functions - SC WITHOUT PR
export const updatePercentageArr = (state, setState, totalWeight) => {
  const values = cloneDeep(state);
  const newValues = values.map(obj => {
    const newObjectValue = { ...obj };
    newObjectValue.percentage = Math.round(
      (newObjectValue.weight / totalWeight) * 100
    );
    return newObjectValue;
  });
  setState(newValues);
};

export const updatePercentageObj = (state, setState, totalWeight) => {
  const value = { ...state };
  value.percentage = Math.round((value.weight / totalWeight) * 100);
  setState(value);
};

export const updatePercentageAllWithoutPR = (
  dailyBusinessFields,
  setDailyBusinessFields,
  projectFields,
  setProjectFields,
  workEfficiencyFields,
  setWorkEfficiencyFields,
  workQualityFields,
  setWorkQualityFields,
  totalWeight
) => {
  updatePercentageArr(dailyBusinessFields, setDailyBusinessFields, totalWeight);
  updatePercentageArr(projectFields, setProjectFields, totalWeight);
  updatePercentageObj(
    workEfficiencyFields,
    setWorkEfficiencyFields,
    totalWeight
  );
  updatePercentageObj(workQualityFields, setWorkQualityFields, totalWeight);
};

export const calculateFinalScoreWithoutPR = (
  dailyBusiness,
  project,
  workQuality,
  workEfficiency,
  totalWeight
) => {
  const dailyBusinessScore = multiplyWeightByScoreArr(dailyBusiness);
  const projectScore = multiplyWeightByScoreArr(project);
  const workQualityScore = workQuality.weight * workQuality.evaluation;
  const workEfficiencyScore = workEfficiency.weight * workEfficiency.evaluation;
  const scoreInTotal =
    dailyBusinessScore + projectScore + workQualityScore + workEfficiencyScore;
  const finalScore = scoreInTotal / totalWeight;
  return finalScore;
};

const multiplyWeightByScoreArr = arr => {
  const mapArr = arr.map(obj => obj.weight * obj.evaluation);
  const reducedArr = mapArr.reduce((acc, item) => acc + item);
  return reducedArr;
};

export const round = (value, precision) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
