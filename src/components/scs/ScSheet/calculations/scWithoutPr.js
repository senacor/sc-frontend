import cloneDeep from '../../../../helper/cloneDeep';
import { multiplyWeightByScoreArr, round } from './helperFunctions';

// Helper functions - SC WITHOUT PR
export const percentageArrWithoutPr = (state, setState, totalWeight) => {
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

export const percentageObjWithoutPr = (state, setState, totalWeight) => {
  const value = { ...state };
  value.percentage = Math.round((value.weight / totalWeight) * 100);
  setState(value);
};

export const calculatePercentageWithoutPr = (
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
  percentageArrWithoutPr(
    dailyBusinessFields,
    setDailyBusinessFields,
    totalWeight
  );
  percentageArrWithoutPr(projectFields, setProjectFields, totalWeight);
  percentageObjWithoutPr(
    workEfficiencyFields,
    setWorkEfficiencyFields,
    totalWeight
  );
  percentageObjWithoutPr(workQualityFields, setWorkQualityFields, totalWeight);
};

export const calculateFinalScoreWithoutPr = (
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
    round(dailyBusinessScore, 1) +
    round(projectScore, 1) +
    round(workQualityScore, 1) +
    round(workEfficiencyScore, 1);
  const finalScore = scoreInTotal / totalWeight;
  return round(finalScore);
};
