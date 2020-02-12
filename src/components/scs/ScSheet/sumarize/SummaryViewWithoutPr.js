import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import { CATEGORY } from '../../../../helper/scSheetData';
import MixedScRow from './MixedScRow';
import PerformanceSummary from './PerformanceSummary';
import { reduceWeights } from '../calculations/helperFunctions';
import {
  calculateFinalScoreWithoutPr,
  calculatePercentageWithoutPr
} from '../calculations/scWithoutPr';
import FinalScoreSection from '../FinalScoreSection';
import SummaryButtonsBelowSheet from './SummaryButtonsBelowSheet';
import { isReady } from '../evaluationsCheck';

const styles = theme => ({
  ...theme.styledComponents
});

const SummaryViewWithoutPr = ({ sc, setSc, afterScFetched, classes, intl }) => {
  const revData = sc.publishedReviewerData;
  const emData = sc.publishedEmployeeData;

  //SCORE CALCULATION based on REVIEWER score
  const totalWeight =
    reduceWeights(revData.dailyBusiness) +
    reduceWeights(revData.project) +
    revData.workEfficiency.weight +
    revData.workQuality.weight;

  const finalScore = calculateFinalScoreWithoutPr(
    false,
    revData.dailyBusiness,
    revData.project,
    revData.workEfficiency,
    revData.workQuality,
    totalWeight
  );

  //CALCULATE PERCENTAGE FOR EACH GOAL based on Reviewer data
  const setDailyBusinessFields = value => (revData.dailyBusiness = value);
  const setProjectFields = value => (revData.project = value);
  const setWorkEfficiencyFields = value => (revData.workEfficiency = value);
  const setWorkQualityFields = value => (revData.workQuality = value);
  calculatePercentageWithoutPr(
    revData.dailyBusiness,
    setDailyBusinessFields,
    revData.project,
    setProjectFields,
    revData.workEfficiency,
    setWorkEfficiencyFields,
    revData.workQuality,
    setWorkQualityFields,
    totalWeight
  );

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

  const workEffeciencyFields = {
    employee: emData.workEfficiency,
    reviewer: revData.workEfficiency
  };

  const workQualityFields = {
    employee: emData.workQuality,
    reviewer: revData.workQuality
  };

  const renderWorkEfficiency = () => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workEffectivity' })}
        </Typography>
        <MixedScRow
          rowEmployee={workEffeciencyFields.employee}
          rowReviewer={workEffeciencyFields.reviewer}
          type={CATEGORY.WORK_EFFICIENCY}
          title={intl.formatMessage({
            id: 'scsheet.subcategory.workEffectivity'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.workEffectivity'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
        />
      </Fragment>
    );
  };

  const renderWorkQuality = () => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workQuality' })}
        </Typography>
        <MixedScRow
          rowEmployee={workQualityFields.employee}
          rowReviewer={workQualityFields.reviewer}
          type={CATEGORY.WORK_QUALITY}
          title={intl.formatMessage({
            id: 'scsheet.subcategory.workQuality'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.workQuality'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
        />
      </Fragment>
    );
  };

  return (
    <Fragment>
      <PerformanceSummary
        dailyBusinessGoals={dailyBusinessGoals}
        projectGoals={projectGoals}
        handleChangeWeightPercentage={() => {}}
      />
      {renderWorkEfficiency()}
      {renderWorkQuality()}
      <FinalScoreSection
        isReady={isReady(sc)}
        finalScore={finalScore}
        reviewerScore
      />
      <SummaryButtonsBelowSheet
        sc={sc}
        setSc={setSc}
        afterScFetched={afterScFetched}
      />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(SummaryViewWithoutPr));
