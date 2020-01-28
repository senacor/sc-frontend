import cloneDeep from '../../../../helper/cloneDeep';
import { multiplyWeightByScoreArr, round } from './helperFunctions';

export const percentageArrWithPr = (
  state,
  setState,
  totalWeight,
  weightPercentage
) => {
  const values = cloneDeep(state);
  const newValues = values.map(obj => {
    const newObjectValue = { ...obj };
    newObjectValue.percentage = totalWeight !== 0 ? Math.round((newObjectValue.weight / totalWeight) * 100 * (weightPercentage / 100)) : 0;
    return newObjectValue;
  });
  setState(newValues);
};

export const percentageObjWithoutPr = (
  state,
  setState,
  totalWeight,
  weightPercentage
) => {
  const value = { ...state };
  value.percentage = totalWeight !== 0 ? Math.round((value.weight / totalWeight) * 100 * (weightPercentage / 100)) : 0;
  setState(value);
};

export const calculatePercentageWithPrPerformance = (
  dailyBusinessFields,
  setDailyBusinessFields,
  projectFields,
  setProjectFields,
  totalWeightPerformance,
  performanceWeightPercentage
) => {
  percentageArrWithPr(
    dailyBusinessFields,
    setDailyBusinessFields,
    totalWeightPerformance,
    performanceWeightPercentage
  );
  percentageArrWithPr(
    projectFields,
    setProjectFields,
    totalWeightPerformance,
    performanceWeightPercentage
  );
};

export const calculatePercentageWithPRPrCategories = (
  skillsInTheFields,
  setSkillsInTheFields,
  impactOnTeam,
  setImpactOnTeam,
  serviceQuality,
  setServiceQuality,
  impactOnCompany,
  setImpactOnCompany,
  totalWeightPrCategories,
  prCategoriesWeightPercentage
) => {
  percentageObjWithoutPr(
    skillsInTheFields,
    setSkillsInTheFields,
    totalWeightPrCategories,
    prCategoriesWeightPercentage
  );
  percentageObjWithoutPr(
    impactOnTeam,
    setImpactOnTeam,
    totalWeightPrCategories,
    prCategoriesWeightPercentage
  );
  percentageObjWithoutPr(
    serviceQuality,
    setServiceQuality,
    totalWeightPrCategories,
    prCategoriesWeightPercentage
  );
  percentageObjWithoutPr(
    impactOnCompany,
    setImpactOnCompany,
    totalWeightPrCategories,
    prCategoriesWeightPercentage
  );
};

export const calculateFinalScoreWithPr = (
  useWrappedValues,
  dailyBusiness,
  project,
  skillsInTheFields,
  impactOnTeam,
  serviceQuality,
  impactOnCompany,
  performanceWeightPercentage,
  prCategoriesWeightPercentage,
  performanceWeight,
  prCategoriesWeight
) => {
  let dailyBusinessScore;
  let projectScore;
  let skillsInTheFieldsScore;
  let impactOnTeamScore;
  let serviceQualityScore;
  let impactOnCompanyScore;
  if (useWrappedValues) {
    dailyBusinessScore = multiplyWeightByScoreArr(dailyBusiness, true);
    projectScore = multiplyWeightByScoreArr(project, true);
    skillsInTheFieldsScore =
      skillsInTheFields.weight * skillsInTheFields.evaluation.value;
    impactOnTeamScore = impactOnTeam.weight * impactOnTeam.evaluation.value;
    serviceQualityScore =
      serviceQuality.weight * serviceQuality.evaluation.value;
    impactOnCompanyScore =
      impactOnCompany.weight * impactOnCompany.evaluation.value;
  } else {
    dailyBusinessScore = multiplyWeightByScoreArr(dailyBusiness, false);
    projectScore = multiplyWeightByScoreArr(project, false);
    skillsInTheFieldsScore =
      skillsInTheFields.weight * skillsInTheFields.evaluation;
    impactOnTeamScore = impactOnTeam.weight * impactOnTeam.evaluation;
    serviceQualityScore = serviceQuality.weight * serviceQuality.evaluation;
    impactOnCompanyScore = impactOnCompany.weight * impactOnCompany.evaluation;
  }

  const performanceHelperScore = performanceWeight === 0 ? 0 :
    (performanceWeightPercentage / 100) *
    ((dailyBusinessScore + projectScore) / performanceWeight);
  const prCategoriesHelperScore = prCategoriesWeight === 0 ? 0 :
    (prCategoriesWeightPercentage / 100) *
    ((skillsInTheFieldsScore +
      impactOnTeamScore +
      serviceQualityScore +
      impactOnCompanyScore) /
      prCategoriesWeight);
  const finalScore = round(performanceHelperScore + prCategoriesHelperScore, 1);
  return finalScore;
};
