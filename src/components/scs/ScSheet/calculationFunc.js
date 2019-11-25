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

export const determineFinalPercentage = score => {
  let value;
  if (score <= 1.5) {
    value = 75;
  } else if (score < 2 && score >= 1.5) {
    value = 100;
  } else if (score < 2.5 && score >= 2) {
    value = 125;
  } else if (score < 3 && score >= 2.5) {
    value = 150;
  } else if (score < 3.5 && score >= 3) {
    value = 175;
  } else if (score < 4 && score > 3.5) {
    value = 200;
  } else if (score < 4.5 && score > 4) {
    value = 250;
  } else if (score >= 4.5) {
    value = 300;
  } else value = 100;
  return value;
};

export const determineFinalText = score => {
  let value;
  if (score >= 0.5 && score < 1.5) {
    value = 'scsheet.finalText.0.5';
  } else if (score >= 1.5 && score < 2.5) {
    value = 'scsheet.finalText.1.5';
  } else if (score >= 2.5 && score < 3.5) {
    value = 'scsheet.finalText.2.5';
  } else if (score >= 3.5 && score < 4.5) {
    value = 'scsheet.finalText.3.5';
  } else if (score >= 4.5) {
    value = 'scsheet.finalText.4.5';
  } else value = '';
  return value;
};
