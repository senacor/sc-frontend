import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import PerformanceSummary from './PerformanceSummary';
import SummaryPrCategories from './SummaryPrCategories';
import { reduceWeights } from '../calculations/helperFunctions';
import { calculateFinalScoreWithPr, calculatePercentageWithPrPerformance, calculatePercentageWithPRPrCategories } from '../calculations/scWithPr';
import FinalScoreSection from '../FinalScoreSection';
import SummaryButtonsBelowSheet from './SummaryButtonsBelowSheet';

const styles = theme => ({});

const SummaryViewWithPr = ({ sc, setSc, afterScFetched }) => {
  const revData = sc.publishedReviewerData;
  const emData = sc.publishedEmployeeData;

  //SCORE CALCULATION based on REVIEWER score
  const totalWeightPerformance =
    reduceWeights(revData.dailyBusiness) + reduceWeights(revData.project);

  const totalWeightPrCategories =
    revData.skillsInTheFields.weight +
    revData.impactOnTeam.weight +
    revData.serviceQuality.weight +
    revData.impactOnCompany.weight;

  const prCategoriesWeightPercentage = revData.skillsWeightPercentage;
  const performanceWeightPercentage = 100 - prCategoriesWeightPercentage;

  const finalScore = calculateFinalScoreWithPr(
    false,
    revData.dailyBusiness,
    revData.project,
    revData.skillsInTheFields,
    revData.impactOnTeam,
    revData.serviceQuality,
    revData.impactOnCompany,
    performanceWeightPercentage,
    prCategoriesWeightPercentage,
    totalWeightPerformance,
    totalWeightPrCategories
  );

  //CALCULATING PERCENTAGE FOR EACH GOAL based on Reviewer data
  const setDailyBusinessFields = value => (revData.dailyBusiness = value);
  const setProjectFields = value => (revData.project = value);
  const setSkillsInTheFieldsFields = value =>
    (revData.skillsInTheFields = value);
  const setImpactOnTeamFields = value => (revData.impactOnTeam = value);
  const setServiceQualityFields = value => (revData.serviceQuality = value);
  const setImpactOnCompanyFields = value => (revData.impactOnCompany = value);
  calculatePercentageWithPrPerformance(
    revData.dailyBusiness,
    setDailyBusinessFields,
    revData.project,
    setProjectFields,
    totalWeightPerformance,
    performanceWeightPercentage
  );
  calculatePercentageWithPRPrCategories(
    revData.skillsInTheFields,
    setSkillsInTheFieldsFields,
    revData.impactOnTeam,
    setImpactOnTeamFields,
    revData.serviceQuality,
    setServiceQualityFields,
    revData.impactOnCompany,
    setImpactOnCompanyFields,
    totalWeightPrCategories,
    prCategoriesWeightPercentage
  );

  //building structure {employee: employeePublishedGoal, reviewer: reviewerPublishedGoal}
  const skillsInTheFieldsFields = {
    employee: emData.skillsInTheFields,
    reviewer: revData.skillsInTheFields
  };
  const impactOnTeamFields = {
    employee: emData.impactOnTeam,
    reviewer: revData.impactOnTeam
  };
  const serviceQualityFields = {
    employee: emData.serviceQuality,
    reviewer: revData.serviceQuality
  };
  const impactOnCompanyFields = {
    employee: emData.impactOnCompany,
    reviewer: revData.impactOnCompany
  };

  const dailyBusinessGoals = revData.dailyBusiness.map((reviewerRow, index) => {
    return {
      employee: sc.publishedEmployeeData.dailyBusiness[index]
        ? sc.publishedEmployeeData.dailyBusiness[index]
        : {},
      reviewer: reviewerRow
    };
  });

  const projectGoals = revData.project.map((reviewerRow, index) => {
    return {
      employee: sc.publishedEmployeeData.project[index]
        ? sc.publishedEmployeeData.project[index]
        : {},
      reviewer: reviewerRow
    };
  });

  return (
    <Fragment>
      <PerformanceSummary
        dailyBusinessGoals={dailyBusinessGoals}
        projectGoals={projectGoals}
        hasWeightPercentage
        performanceWeightPercentage={performanceWeightPercentage}
      />
      <SummaryPrCategories
        skillsInTheFieldsFields={skillsInTheFieldsFields}
        impactOnTeamFields={impactOnTeamFields}
        serviceQualityFields={serviceQualityFields}
        impactOnCompanyFields={impactOnCompanyFields}
        prCategoriesWeightPercentage={prCategoriesWeightPercentage}
      />
      <FinalScoreSection finalScore={finalScore} reviewerScore />
      <SummaryButtonsBelowSheet sc={sc} setSc={setSc} afterScFetched={afterScFetched} />
    </Fragment>
  );
};
export default injectIntl(withStyles(styles)(SummaryViewWithPr));
