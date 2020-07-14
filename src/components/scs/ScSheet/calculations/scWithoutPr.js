import cloneDeep from '../../../../helper/cloneDeep';
import { multiplyWeightByScoreArr, round } from './helperFunctions';

// Helper functions - SC WITHOUT PR
export const percentageArrWithoutPr = (state, setState, totalWeight) => {
  const values = cloneDeep(state);
  const newValues = values.map(obj => {
    const newObjectValue = { ...obj };
    newObjectValue.percentage =
      totalWeight !== 0
        ? Math.round((newObjectValue.weight / totalWeight) * 100)
        : 0;
    return newObjectValue;
  });
  setState(newValues);
};

export const percentageObjWithoutPr = (state, setState, totalWeight) => {
  const value = { ...state };
  value.percentage =
    totalWeight !== 0 ? Math.round((value.weight / totalWeight) * 100) : 0;
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
  useWrappedValues,
  dailyBusiness,
  project,
  workQuality,
  workEfficiency,
  totalWeight
) => {
  let dailyBusinessScore;
  let projectScore;
  let workQualityScore;
  let workEfficiencyScore;
  if (useWrappedValues) {
    dailyBusinessScore = multiplyWeightByScoreArr(dailyBusiness, true);
    projectScore = multiplyWeightByScoreArr(project, true);
    workQualityScore = workQuality.weight * workQuality.evaluation.value;
    workEfficiencyScore =
      workEfficiency.weight * workEfficiency.evaluation.value;
  } else {
    dailyBusinessScore = multiplyWeightByScoreArr(dailyBusiness);
    projectScore = multiplyWeightByScoreArr(project);
    workQualityScore = workQuality.weight * workQuality.evaluation;
    workEfficiencyScore = workEfficiency.weight * workEfficiency.evaluation;
  }
  const scoreInTotal =
    dailyBusinessScore + projectScore + workQualityScore + workEfficiencyScore;
  const finalScore = totalWeight !== 0 ? scoreInTotal / totalWeight : 0;
  return round(finalScore, 2);
};
