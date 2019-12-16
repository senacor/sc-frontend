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
    newObjectValue.percentage = Math.round(
      (newObjectValue.weight / totalWeight) * 100 * (weightPercentage / 100)
    );
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
  value.percentage = Math.round(
    (value.weight / totalWeight) * 100 * (weightPercentage / 100)
  );
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
  const dailyBusinessScore = multiplyWeightByScoreArr(dailyBusiness);
  const projectScore = multiplyWeightByScoreArr(project);
  const skillsInTheFieldsScore =
    skillsInTheFields.weight * skillsInTheFields.evaluation;
  const impactOnTeamScore = impactOnTeam.weight * impactOnTeam.evaluation;
  const serviceQualityScore = serviceQuality.weight * serviceQuality.evaluation;
  const impactOnCompanyScore =
    impactOnCompany.weight * impactOnCompany.evaluation;

  const performanceHelperScore =
    (performanceWeightPercentage / 100) *
    ((dailyBusinessScore + projectScore) / performanceWeight);
  const prCategoriesHelperScore =
    (prCategoriesWeightPercentage / 100) *
    ((skillsInTheFieldsScore +
      impactOnTeamScore +
      serviceQualityScore +
      impactOnCompanyScore) /
      prCategoriesWeight);
  const finalScore = round(performanceHelperScore + prCategoriesHelperScore, 1);
  return finalScore;
};
