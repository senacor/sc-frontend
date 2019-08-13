import React, { useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import { injectIntl } from 'react-intl';

import PrReviewerRating from './PrReviewerRating';
import PrOverallAssessment from './PrOverallAssessment';
import PrTextField from './PrTextField';
import { isHr } from '../../helper/checkRole';
import { default as ButtonsBelowSheet } from './ButtonsBelowSheet';
import { UserinfoContext } from '../App';

const styles = () => ({
  paddingBottom: {
    paddingBottom: 24
  },
  required: {
    color: 'rgba(0, 0, 0, 0.42)'
  },
  legend: {
    textAlign: 'blockscope',
    fontSize: '9pt'
  }
});

const PrSheet = props => {
  // FORMAT
  // let pr = {
  //   id: 26,
  //   employee: {
  //     createdDateTime: '2019-08-02T12:44:26.227372',
  //     modifiedDateTime: '2019-08-02T12:44:34.631152',
  //     id: 3001,
  //     firstName: 'Matúš',
  //     lastName: 'Piroh',
  //     login: 'mpiroh',
  //     title: '',
  //     email: 'Matus.Piroh@senacor.com',
  //     endOfProbationPeriod: '2019-08-31',
  //     salaryLevel: 6,
  //     costcenterId: 408,
  //     supervisorId: 297
  //   },
  //   supervisor: {
  //     createdDateTime: '2019-08-02T12:44:26.227372',
  //     modifiedDateTime: '2019-08-02T12:44:34.631152',
  //     id: 3001,
  //     firstName: 'Matúš',
  //     lastName: 'Piroh',
  //     login: 'mpiroh',
  //     title: '',
  //     email: 'Matus.Piroh@senacor.com',
  //     endOfProbationPeriod: '2019-08-31',
  //     salaryLevel: 6,
  //     costcenterId: 408,
  //     supervisorId: 297
  //   },
  //   reviewer: {
  //     createdDateTime: '2019-08-02T12:44:26.227372',
  //     modifiedDateTime: '2019-08-02T12:44:34.631152',
  //     id: 3001,
  //     firstName: 'Matúš',
  //     lastName: 'Piroh',
  //     login: 'mpiroh',
  //     title: '',
  //     email: 'Matus.Piroh@senacor.com',
  //     endOfProbationPeriod: '2019-08-31',
  //     salaryLevel: 6,
  //     costcenterId: 408,
  //     supervisorId: 297
  //   },
  //   deadline: '2019-08-04',
  //   occasion: 'ON_DEMAND',
  //   prRating: {
  //     performanceInProject: {
  //       problemAnalysis: {
  //         comment: 'dasdsad dasdas',
  //         rating: 3
  //       },
  //       workResults: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       },
  //       workingManner: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       }
  //     },
  //     impactOnCostumer: {
  //       customerInteraction: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       },
  //       customerRetention: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       }
  //     },
  //     impactOnTeam: {
  //       teamWork: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       },
  //       leadership: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       }
  //     },
  //     impactOnCompany: {
  //       contributionToCompanyDevelopment: {
  //         comment: 'dasdsad dasdas',
  //         rating: null
  //       }
  //     },
  //     overallAssessment: {
  //       fulfillmentOfRequirement: {
  //         comment: 'dasdsad dasdas',
  //         rating: 0
  //       }
  //     }
  //   },
  //   targetRole: {
  //     plattformGestalter: 1,
  //     itSolutionLeader: 1,
  //     transformationManager: 2,
  //     itLiefersteuerer: 2,
  //     architect: 2,
  //     technicalExpert: 3,
  //     leadDeveloper: 3
  //   },
  //   statusSet: '',
  //   exchangeItemId: 'exchange_item_id',
  //   finalMeetingDate: '2019-08-03',
  //   firstReflectionField: 'first_reflection_field',
  //   secondReflectionField: 'second_reflection_field',
  //   finalCommentEmployee: 'final_comment_employee',
  //   finalCommentHr: 'final_comment_hr',
  //   advancementStrategies: 'advancement_strategies',
  //   inProgressForEmployee: true,
  //   inProgressForReviewer: false,
  //   done: false
  // };

  const { classes, intl, pr } = props;
  const { userroles } = useContext(UserinfoContext.context).value;

  const changeFirstReflectionField = value => {
    pr.firstReflectionField = value;
  };

  const changeSecondReflectionField = value => {
    pr.secondReflectionField = value;
  };

  const changeAdvancementStrategies = value => {
    pr.advancementStrategies = value;
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

  console.log('PR IS: ', pr);
  if (!pr) {
    return null;
  }

  let step1employee = () => {
    return (
      <Grid container spacing={16} className={classes.paddingBottom}>
        <Grid item xs={12}>
          <h3>
            {intl.formatMessage({
              id: 'prsheet.employeerole'
            })}
          </h3>
        </Grid>
        <Grid item xs={12}>
          <PrTextField
            label={intl.formatMessage({
              id: 'ROLE_AND_PROJECT_ENVIRONMENT'
            })}
            helperText={intl.formatMessage({
              id: 'PLACEHOLDER_ROLE_AND_PROJECT_ENVIRONMENT'
            })}
            text={pr.firstReflectionField}
            isReadOnly={false}
            isError={false}
            action={changeFirstReflectionField}
          />
        </Grid>
        <Grid item xs={12}>
          <PrTextField
            label={intl.formatMessage({
              id: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
            })}
            helperText={intl.formatMessage({
              id: 'PLACEHOLDER_INFLUENCE_OF_LEADER_AND_ENVIRONMENT'
            })}
            text={pr.secondReflectionField}
            isReadOnly={false}
            isError={false}
            action={changeSecondReflectionField}
          />
        </Grid>
      </Grid>
    );
  };

  let overallReviewer = () => {
    return (
      <div className={classes.paddingBottom}>
        <Grid container spacing={16} className={classes.paddingBottom}>
          <Grid item xs={12}>
            <h3>
              {intl.formatMessage({
                id: 'prsheet.overall'
              })}
            </h3>
          </Grid>
          <Grid item xs={12}>
            <PrOverallAssessment
              text={
                pr.prRating.overallAssessment.fulfillmentOfRequirement.comment
              }
              rating={
                pr.prRating.overallAssessment.fulfillmentOfRequirement.rating
              }
              targetRoles={pr.targetRole}
              isReadOnly={false}
              isError={false}
              hidden={false}
              actionText={changeFulfillmentOfRequirementComment}
              actionRating={changeFulfillmentOfRequirementRating}
              actionTargetRoles={changeTargetRoles}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16} className={classes.paddingBottom}>
          <Grid item xs={12}>
            <h3>
              {intl.formatMessage({
                id: 'prsheet.measures'
              })}
            </h3>
          </Grid>
          <Grid item xs={12}>
            <PrTextField
              label={intl.formatMessage({
                id: 'pradvancementstrategies.measures'
              })}
              helperText={intl.formatMessage({
                id: 'pradvancementstrategies.helpertext'
              })}
              text={pr.advancementStrategies}
              isReadOnly={false}
              isError={false}
              action={changeAdvancementStrategies}
            />
          </Grid>
        </Grid>
        <Divider />
      </div>
    );
  };

  let finalEmployee = () => {
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
            isReadOnly={false}
            isError={false}
            action={changeFinalCommentEmployee}
          />
        </Grid>
      </Grid>
    );
  };

  let finalHr = () => {
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
            isReadOnly={false}
            isError={false}
            action={changeFinalCommentHr}
          />
        </Grid>
      </Grid>
    );
  };

  let detailReviewer = () => {
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={10}>
            <h3>
              {intl.formatMessage({
                id: 'prsheet.performance'
              })}
            </h3>
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
              isReadOnly={false}
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
              isReadOnly={false}
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
              isReadOnly={false}
              isError={false}
              actionText={changeWorkingMannerComment}
              actionRating={changeWorkingMannerRating}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h3>
              {intl.formatMessage({
                id: 'prsheet.customerimpact'
              })}
            </h3>
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="CUSTOMER_INTERACTION"
              text={pr.prRating.impactOnCostumer.customerInteraction.comment}
              rating={pr.prRating.impactOnCostumer.customerInteraction.rating}
              isReadOnly={false}
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
              isReadOnly={false}
              isError={false}
              actionText={changeCustomerRetentionComment}
              actionRating={changeCustomerRetentionRating}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h3>
              {intl.formatMessage({
                id: 'prsheet.teamimpact'
              })}
            </h3>
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              category="TEAMWORK"
              text={pr.prRating.impactOnTeam.teamWork.comment}
              rating={pr.prRating.impactOnTeam.teamWork.rating}
              isReadOnly={false}
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
              isReadOnly={false}
              isError={false}
              actionText={changeLeadershipComment}
              actionRating={changeLeadershipRating}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <h3>
              {intl.formatMessage({
                id: 'prsheet.companyimpact'
              })}
            </h3>
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
              isReadOnly={false}
              isError={false}
              actionText={changeContributionToCompanyDevelopmentComment}
              actionRating={changeContributionToCompanyDevelopmentRating}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  let requiredInfo = () => {
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

  return (
    <div>
      <Grid container spacing={40}>
        <Grid item xs={12} md={6}>
          {step1employee()}
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
            {isHr(userroles) ? <Divider /> : null}
            {isHr(userroles) ? finalHr() : null}
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            {isHr(userroles) ? <Divider /> : null}
            {isHr(userroles) ? finalHr() : null}
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <ButtonsBelowSheet pr={pr} />
        </Grid>
      </Grid>
    </div>
  );
};

export default injectIntl(withStyles(styles)(PrSheet));
