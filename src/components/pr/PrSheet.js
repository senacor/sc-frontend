import React, { Fragment, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import { injectIntl } from 'react-intl';
import PrReviewerRating from './PrReviewerRating';
import PrOverallAssessment from './PrOverallAssessment';
import PrTextField from './PrTextField';
import AdvancementStrategies from './AdvancementStrategies';
import { isPersonalDev } from '../../helper/checkRole';
import ButtonsBelowSheet from './ButtonsBelowSheet';
import { ErrorContext, InfoContext, UserinfoContext } from '../App';
import ROLES from '../../helper/roles';
// Material UI
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  paddingBottom: {
    paddingBottom: 3 * theme.spacing.unit
  },
  paddingTop: {
    paddingTop: 3 * theme.spacing.unit
  },
  required: {
    color: theme.palette.secondary.grey
  },
  legend: {
    textAlign: 'blockscope',
    fontSize: '9pt'
  }
});

const PrSheet = props => {
  const { classes, intl, pr } = props;
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const errorContext = useContext(ErrorContext.context);
  const infoContext = useContext(InfoContext.context);

  const changeFirstReflectionField = value => {
    pr.firstReflectionField = value;
  };

  const changeSecondReflectionField = value => {
    pr.secondReflectionField = value;
  };

  const changeFinalCommentEmployee = value => {
    pr.finalCommentEmployee = value;
  };

  const changeFinalCommentHr = value => {
    pr.finalCommentHr = value;
  };

  // Problem analysis
  const changeProblemAnalysisComment = value => {
    pr.prRating.performanceInProject.problemAnalysis.comment = value;
  };

  const changeProblemAnalysisRating = value => {
    pr.prRating.performanceInProject.problemAnalysis.rating = value;
  };

  // Work results
  const changeWorkResultsComment = value => {
    pr.prRating.performanceInProject.workResults.comment = value;
  };

  const changeWorkResultsRating = value => {
    pr.prRating.performanceInProject.workResults.rating = value;
  };

  // Working manner
  const changeWorkingMannerComment = value => {
    pr.prRating.performanceInProject.workingManner.comment = value;
  };

  const changeWorkingMannerRating = value => {
    pr.prRating.performanceInProject.workingManner.rating = value;
  };

  // Customer interaction
  const changeCustomerInteractionComment = value => {
    pr.prRating.impactOnCostumer.customerInteraction.comment = value;
  };

  const changeCustomerInteractionRating = value => {
    pr.prRating.impactOnCostumer.customerInteraction.rating = value;
  };

  // Customer retention
  const changeCustomerRetentionComment = value => {
    pr.prRating.impactOnCostumer.customerRetention.comment = value;
  };

  const changeCustomerRetentionRating = value => {
    pr.prRating.impactOnCostumer.customerRetention.rating = value;
  };

  // Teamwork
  const changeTeamWorkComment = value => {
    pr.prRating.impactOnTeam.teamWork.comment = value;
  };

  const changeTeamWorkRating = value => {
    pr.prRating.impactOnTeam.teamWork.rating = value;
  };

  // Leadership
  const changeLeadershipComment = value => {
    pr.prRating.impactOnTeam.leadership.comment = value;
  };

  const changeLeadershipRating = value => {
    pr.prRating.impactOnTeam.leadership.rating = value;
  };

  // Contribution to company development
  const changeContributionToCompanyDevelopmentComment = value => {
    pr.prRating.impactOnCompany.contributionToCompanyDevelopment.comment = value;
  };

  const changeContributionToCompanyDevelopmentRating = value => {
    pr.prRating.impactOnCompany.contributionToCompanyDevelopment.rating = value;
  };

  const changeFulfillmentOfRequirementComment = value => {
    pr.prRating.overallAssessment.fulfillmentOfRequirement.comment = value;
  };

  const changeFulfillmentOfRequirementRating = value => {
    pr.prRating.overallAssessment.fulfillmentOfRequirement.rating = value;
  };

  const changeTargetRoles = (targetRole, value) => {
    switch (targetRole) {
      case 'plattformGestalter':
        pr.targetRole.plattformGestalter = value;
        break;
      case 'itSolutionLeader':
        pr.targetRole.itSolutionLeader = value;
        break;
      case 'transformationManager':
        pr.targetRole.transformationManager = value;
        break;
      case 'itLiefersteuerer':
        pr.targetRole.itLiefersteuerer = value;
        break;
      case 'architect':
        pr.targetRole.architect = value;
        break;
      case 'technicalExpert':
        pr.targetRole.technicalExpert = value;
        break;
      case 'leadDeveloper':
        pr.targetRole.leadDeveloper = value;
        break;
      default:
        break;
    }
  };

  if (!pr) {
    return null;
  }

  const readOnly = input => {
    switch (input) {
      case 'REFLECTIONS_EMPLOYEE':
        return (
          pr.employee.id !== userinfo.userId ||
          pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED')
        );
      case 'RATINGS_REVIEWER':
        //reviewer of my pr
        if (userinfo.userId === pr.reviewer.id) {
          return pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER');
        }
        return true;
      case 'FINAL_COMMENT_EMPLOYEE':
        return (
          pr.employee.id !== userinfo.userId ||
          !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') ||
          !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') ||
          pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE')
        );
      case 'FINAL_COMMENT_HR':
        return (
          !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') ||
          !pr.statusSet.includes('FILLED_SHEET_REVIEWER_SUBMITTED') ||
          !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_EMPLOYEE') ||
          !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') ||
          pr.statusSet.includes('PR_COMPLETED')
        );
      default:
        return true;
    }
  };

  const isRequiredForReflectionFields = input => {
    return (
      !pr.statusSet.includes('FILLED_SHEET_EMPLOYEE_SUBMITTED') &&
      pr.employee.id === userinfo.userId
    );
  };

  const firstStepEmployee = () => {
    return (
      <Grid container spacing={16} className={classes.paddingBottom}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.paddingTop}>
            {intl.formatMessage({
              id: 'prsheet.employeerole'
            })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <PrTextField
            label={
              isRequiredForReflectionFields()
                ? intl.formatMessage({
                    id: 'ROLE_AND_PROJECT_ENVIRONMENT'
                  }) + ' *'
                : intl.formatMessage({
                    id: 'ROLE_AND_PROJECT_ENVIRONMENT'
                  })
            }
            helperText={intl.formatMessage({
              id: 'PLACEHOLDER_ROLE_AND_PROJECT_ENVIRONMENT'
            })}
            text={pr.firstReflectionField}
            isReadOnly={readOnly('REFLECTIONS_EMPLOYEE')}
            isError={
              errorContext.value.errors &&
              errorContext.value.errors.firstReflectionField
            }
            action={changeFirstReflectionField}
          />
        </Grid>
        <Grid item xs={12}>
          <PrTextField
            label={
              isRequiredForReflectionFields()
                ? intl.formatMessage({
                    id: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
                  }) + ' *'
                : intl.formatMessage({
                    id: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
                  })
            }
            helperText={intl.formatMessage({
              id: 'PLACEHOLDER_INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
            })}
            text={pr.secondReflectionField}
            isReadOnly={readOnly('REFLECTIONS_EMPLOYEE')}
            isError={
              errorContext.value.errors &&
              errorContext.value.errors.secondReflectionField
            }
            action={changeSecondReflectionField}
          />
        </Grid>
      </Grid>
    );
  };

  const overallReviewer = () => {
    return (
      <div className={classes.paddingBottom}>
        <Grid container spacing={16} className={classes.paddingBottom}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.paddingTop}>
              {intl.formatMessage({
                id: 'prsheet.overall'
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrOverallAssessment
              pr={pr}
              userinfo={userinfo}
              userroles={userroles}
              text={
                pr.prRating.overallAssessment.fulfillmentOfRequirement.comment
              }
              rating={
                pr.prRating.overallAssessment.fulfillmentOfRequirement.rating
              }
              targetRoles={pr.targetRole}
              isReadOnly={readOnly}
              isError={
                errorContext.value.errors &&
                errorContext.value.errors.overallAssessmentComment
              }
              hidden={false}
              actionText={changeFulfillmentOfRequirementComment}
              actionRating={changeFulfillmentOfRequirementRating}
              actionTargetRoles={changeTargetRoles}
            />
          </Grid>
        </Grid>
        <Divider />
        <Fragment>
          <Typography
            variant="h6"
            className={`${classes.paddingTop} ${classes.paddingBottom}`}
          >
            {intl.formatMessage({
              id: 'prsheet.measures'
            })}
          </Typography>
          <AdvancementStrategies
            advStrategies={pr.advancementStrategies}
            readOnly={readOnly}
          />
        </Fragment>
      </div>
    );
  };

  const finalEmployee = () => {
    return (
      <Grid container spacing={16} className={classes.paddingBottom}>
        <Grid item xs={12}>
          <PrTextField
            label={intl.formatMessage({
              id: 'FINAL_COMMENT_EMPLOYEE'
            })}
            helperText={intl.formatMessage({
              id: 'prfinalcommentemployee.notes'
            })}
            text={pr.finalCommentEmployee}
            isReadOnly={readOnly('FINAL_COMMENT_EMPLOYEE')}
            isError={false}
            action={changeFinalCommentEmployee}
          />
        </Grid>
      </Grid>
    );
  };

  const finalHr = () => {
    return (
      <Grid container spacing={16} className={classes.paddingBottom}>
        <Grid item xs={12}>
          <PrTextField
            label={intl.formatMessage({
              id: 'FINAL_COMMENT_HR'
            })}
            helperText={intl.formatMessage({
              id: 'prfinalcommenthr.hronly'
            })}
            text={pr.finalCommentHr}
            isReadOnly={readOnly('FINAL_COMMENT_HR')}
            isError={false}
            action={changeFinalCommentHr}
          />
        </Grid>
      </Grid>
    );
  };

  const detailReviewer = () => {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={10}>
            <Typography variant="h6" className={classes.paddingTop}>
              {intl.formatMessage({
                id: 'prsheet.performance'
              })}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant={'caption'}
              color={'textSecondary'}
              className={classes.legend}
            >
              {intl.formatMessage({
                id: 'prsheet.notfulfilled'
              })}
              <br />
              {intl.formatMessage({
                id: 'prsheet.excellent'
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="PROBLEM_ANALYSIS"
              text={pr.prRating.performanceInProject.problemAnalysis.comment}
              rating={pr.prRating.performanceInProject.problemAnalysis.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeProblemAnalysisComment}
              actionRating={changeProblemAnalysisRating}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="WORK_RESULTS"
              text={pr.prRating.performanceInProject.workResults.comment}
              rating={pr.prRating.performanceInProject.workResults.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeWorkResultsComment}
              actionRating={changeWorkResultsRating}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="WORKING_MANNER"
              text={pr.prRating.performanceInProject.workingManner.comment}
              rating={pr.prRating.performanceInProject.workingManner.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeWorkingMannerComment}
              actionRating={changeWorkingMannerRating}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.paddingTop}>
              {intl.formatMessage({
                id: 'prsheet.customerimpact'
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="CUSTOMER_INTERACTION"
              text={pr.prRating.impactOnCostumer.customerInteraction.comment}
              rating={pr.prRating.impactOnCostumer.customerInteraction.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeCustomerInteractionComment}
              actionRating={changeCustomerInteractionRating}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="CUSTOMER_RETENTION"
              text={pr.prRating.impactOnCostumer.customerRetention.comment}
              rating={pr.prRating.impactOnCostumer.customerRetention.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeCustomerRetentionComment}
              actionRating={changeCustomerRetentionRating}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.paddingTop}>
              {intl.formatMessage({
                id: 'prsheet.teamimpact'
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="TEAMWORK"
              text={pr.prRating.impactOnTeam.teamWork.comment}
              rating={pr.prRating.impactOnTeam.teamWork.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeTeamWorkComment}
              actionRating={changeTeamWorkRating}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="LEADERSHIP"
              text={pr.prRating.impactOnTeam.leadership.comment}
              rating={pr.prRating.impactOnTeam.leadership.rating}
              isReadOnly={readOnly}
              isError={false}
              actionText={changeLeadershipComment}
              actionRating={changeLeadershipRating}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.paddingTop}>
              {intl.formatMessage({
                id: 'prsheet.companyimpact'
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
              text={
                pr.prRating.impactOnCompany.contributionToCompanyDevelopment
                  .comment
              }
              rating={
                pr.prRating.impactOnCompany.contributionToCompanyDevelopment
                  .rating
              }
              isReadOnly={readOnly}
              isError={false}
              actionText={changeContributionToCompanyDevelopmentComment}
              actionRating={changeContributionToCompanyDevelopmentRating}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const requiredInfo = () => {
    return (
      <Grid container spacing={16} className={classes.paddingBottom}>
        <Grid item xs={12}>
          <Typography className={classes.required} variant="caption">
            {intl.formatMessage({
              id: 'prsheet.required'
            })}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  // TODO: create PrSheet folder and move functions to separated files to make them as functional components
  return (
    <div>
      <Grid container spacing={40}>
        <Grid item xs={12} md={6}>
          {firstStepEmployee()}
          <Divider />
          <Hidden mdUp>
            {detailReviewer()}
            <Divider />
          </Hidden>
          {overallReviewer()}
          {finalEmployee()}
          {requiredInfo()}
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            {detailReviewer()}
            {isPersonalDev(userroles) ? <Divider /> : null}
            {isPersonalDev(userroles) ? finalHr() : null}
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            {isPersonalDev(userroles) ? <Divider /> : null}
            {isPersonalDev(userroles) ? finalHr() : null}
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <ButtonsBelowSheet
            pr={pr}
            errorContext={errorContext}
            infoContext={infoContext}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default injectIntl(withStyles(styles)(PrSheet));
