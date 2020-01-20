export const checkEvaluationsFilledWithPR = (
  dailyBusiness,
  project,
  serviceQuality,
  skillsInTheFields,
  impactOnTeam,
  impactOnCompany
) => {
  return (
    dailyBusinessAndProjectEvaluated(dailyBusiness, project) &&
    serviceQuality.evaluation > 0 &&
    skillsInTheFields.evaluation > 0 &&
    impactOnTeam.evaluation > 0 &&
    impactOnCompany.evaluation > 0
  )
};

export const checkEvaluationsFilledWithoutPR = (
  dailyBusiness,
  project,
  workEfficiency,
  workQuality
) => {
  return (
    dailyBusinessAndProjectEvaluated(dailyBusiness, project) &&
    workEfficiency.evaluation > 0 &&
    workQuality.evaluation > 0
  );
}

const dailyBusinessAndProjectEvaluated = (dailyBusiness, project) => {
  return dailyBusiness.reduce((result, goal) => {
    if (!(goal.evaluation > 0)) {
      result = false;
    }
    return result;
  }, true) &&
    project.reduce((result, goal) => {
      if (!(goal.evaluation > 0)) {
        result = false;
      }
      return result;
    }, true)
}
