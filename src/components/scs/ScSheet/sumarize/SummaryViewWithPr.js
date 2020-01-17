import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import PerformanceSummary from './PerformanceSummary';
import SummaryPrCategories from './SummaryPrCategories';

const styles = theme => ({});

const SummaryViewWithPr = ({ sc }) => {
  const [performanceWeightPercentage] = useState(0);
  const [prCategoriesWeightPercentage] = useState(0);

  //TODO: so far using PRIVATE SPACE, use only PUBLSIHED for VIEW!
  //unwrapping private data
  const revData = sc.privateReviewerData;
  const emData = sc.privateEmployeeData;

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
      employee: sc.privateEmployeeData.dailyBusiness[index]
        ? sc.privateEmployeeData.dailyBusiness[index]
        : {},
      reviewer: reviewerRow
    };
  });

  const projectGoals = revData.project.map((reviewerRow, index) => {
    return {
      employee: sc.privateEmployeeData.project[index]
        ? sc.privateEmployeeData.project[index]
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
        handleChangeWeightPercentage={() => {}}
      />
      <SummaryPrCategories
        skillsInTheFieldsFields={skillsInTheFieldsFields}
        impactOnTeamFields={impactOnTeamFields}
        serviceQualityFields={serviceQualityFields}
        impactOnCompanyFields={impactOnCompanyFields}
        prCategoriesWeightPercentage={prCategoriesWeightPercentage}
      />
      {/*<FinalScoreSection finalScore={finalScore} />*/}
    </Fragment>
  );
};
export default injectIntl(withStyles(styles)(SummaryViewWithPr));
