import { SC_STATUS } from '../../../helper/scSheetData';

export const isReady = sc => {
  const revData = sc.publishedReviewerData;
  if (sc.statusSet.includes(SC_STATUS.WITH_PR)) {
    return checkEvaluationsFilledWithPR(
      false,
      revData.dailyBusiness,
      revData.project,
      revData.serviceQuality,
      revData.skillsInTheFields,
      revData.impactOnTeam,
      revData.impactOnCompany
    );
  }

  if (sc.statusSet.includes(SC_STATUS.WITHOUT_PR)) {
    return checkEvaluationsFilledWithoutPR(
      false,
      revData.dailyBusiness,
      revData.project,
      revData.workEfficiency,
      revData.workQuality
    );
  }

  return false;
};

export const checkEvaluationsFilledWithPR = (
  useWrappedValues,
  dailyBusiness,
  project,
  serviceQuality,
  skillsInTheFields,
  impactOnTeam,
  impactOnCompany
) => {
  return useWrappedValues
    ? dailyBusinessAndProjectEvaluated(dailyBusiness, project, true) &&
        serviceQuality.evaluation.value > 0 &&
        skillsInTheFields.evaluation.value > 0 &&
        impactOnTeam.evaluation.value > 0 &&
        impactOnCompany.evaluation.value > 0
    : dailyBusinessAndProjectEvaluated(dailyBusiness, project) &&
        serviceQuality.evaluation > 0 &&
        skillsInTheFields.evaluation > 0 &&
        impactOnTeam.evaluation > 0 &&
        impactOnCompany.evaluation > 0;
};

export const checkEvaluationsFilledWithoutPR = (
  useWrappedValues,
  dailyBusiness,
  project,
  workEfficiency,
  workQuality
) => {
  return useWrappedValues
    ? dailyBusinessAndProjectEvaluated(dailyBusiness, project, true) &&
        workEfficiency.evaluation.value > 0 &&
        workQuality.evaluation.value > 0
    : dailyBusinessAndProjectEvaluated(dailyBusiness, project) &&
        workEfficiency.evaluation > 0 &&
        workQuality.evaluation > 0;
};

const dailyBusinessAndProjectEvaluated = (
  dailyBusiness,
  project,
  useWrappedValues
) => {
  const reduceFunction = (result, goal) => {
    if (useWrappedValues) {
      if (!(goal.evaluation.value > 0)) {
        result = false;
      }
      if (goal.title === '') {
        return true;
      }
      return result;
    } else {
      if (!(goal.evaluation > 0)) {
        result = false;
      }
      if (goal.title === '') {
        return true;
      }
      return result;
    }
  };

  return (
    dailyBusiness.reduce(reduceFunction, true) &&
    (project.length === 0 ? true : project.reduce(reduceFunction, true))
  );
};
