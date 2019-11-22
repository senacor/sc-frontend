import cloneDeep from '../../../helper/cloneDeep';

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
