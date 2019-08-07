import React, { useState } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import PrReviewerRating from './PrReviewerRating';
import PrOverallAssessment from './PrOverallAssessment';
import PrTextField from './PrTextField';
import { withStyles } from '@material-ui/core/styles/index';
import { isHr } from '../../helper/checkRole';
import * as visibilityTypes from '../../helper/prVisibility';
import * as finalizationTypes from '../../helper/prFinalization';
import objectGet from 'object-get';
import {
  getPrDetail,
  getUserinfo,
  getUserroles,
  getRequiredFields
} from '../../reducers/selector';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { prStatusEnum } from '../../helper/prStatus';
import { hasRoleInPrBasedOnUserName } from '../../helper/hasRoleInPr';
import { default as ButtonsBelowSheet } from './ButtonsBelowSheet';
import { injectIntl } from 'react-intl';

const styles = () => ({
  paddingBottom: {
    paddingBottom: 24
  },
  containerListItem: {
    display: 'flex'
  },
  required: {
    color: 'rgba(0, 0, 0, 0.42)'
  },
  marginDown: {
    marginBottom: '-10pt',
    width: '80%'
  },
  marginDownSmall: {
    marginBottom: '-10pt',
    width: '23%'
  },
  legend: {
    textAlign: 'blockscope',
    fontSize: '9pt'
  }
});

const PrSheet = props => {
  // FORMAT
  const prMock = {
    id: 26,
    employee: {
      createdDateTime: '2019-08-02T12:44:26.227372',
      modifiedDateTime: '2019-08-02T12:44:34.631152',
      id: 3001,
      firstName: 'Matúš',
      lastName: 'Piroh',
      login: 'mpiroh',
      title: '',
      email: 'Matus.Piroh@senacor.com',
      endOfProbationPeriod: '2019-08-31',
      salaryLevel: 6,
      costcenterId: 408,
      supervisorId: 297
    },
    supervisor: {
      createdDateTime: '2019-08-02T12:44:26.227372',
      modifiedDateTime: '2019-08-02T12:44:34.631152',
      id: 3001,
      firstName: 'Matúš',
      lastName: 'Piroh',
      login: 'mpiroh',
      title: '',
      email: 'Matus.Piroh@senacor.com',
      endOfProbationPeriod: '2019-08-31',
      salaryLevel: 6,
      costcenterId: 408,
      supervisorId: 297
    },
    reviewer: {
      createdDateTime: '2019-08-02T12:44:26.227372',
      modifiedDateTime: '2019-08-02T12:44:34.631152',
      id: 3001,
      firstName: 'Matúš',
      lastName: 'Piroh',
      login: 'mpiroh',
      title: '',
      email: 'Matus.Piroh@senacor.com',
      endOfProbationPeriod: '2019-08-31',
      salaryLevel: 6,
      costcenterId: 408,
      supervisorId: 297
    },
    deadline: '2019-08-04',
    occasion: 'ON_DEMAND',
    prRating: 'pr_rating_json',
    targetRole: 'target_role_json',
    prStatusEntry: '',
    exchangeItemId: 'exchange_item_id',
    finalMeetingDate: '2019-08-03',
    firstReflectionField: 'first_reflection_field',
    secondReflectionField: 'second_reflection_field',
    finalCommentEmployee: 'final_comment_employee',
    finalCommentHr: 'final_comment_hr',
    advancementStrategies: 'advancement_strategies',
    inProgressForEmployee: true,
    inProgressForReviewer: false,
    done: false
  };

  const { prById, classes, userinfo, requiredFields, intl, userroles } = props;

  const [pr, setPr] = useState(prMock);
  const [firstReflectionField, setFirstReflectionField] = useState(
    pr.firstReflectionField
  );
  const [secondReflectionField, setSecondReflectionField] = useState(
    pr.secondReflectionField
  );
  const [advancementStrategies, setAdvancementStrategies] = useState(
    pr.advancementStrategies
  );

  const [finalCommentEmployee, setFinalCommentEmployee] = useState(
    pr.finalCommentEmployee
  );

  const [finalCommentHr, setFinalCommentHr] = useState(pr.finalCommentHr);

  const changeFirstReflectionField = value => {
    setFirstReflectionField(value);
  };

  const changeSecondReflectionField = value => {
    setSecondReflectionField(value);
  };

  const changeAdvancementStrategies = value => {
    setAdvancementStrategies(value);
  };

  const changeFinalCommentEmployee = value => {
    setFinalCommentEmployee(value);
  };

  const changeFinalCommentHr = value => {
    setFinalCommentHr(value);
  };

  let errorFlagReviewer = !requiredFields.reviewer;
  let errorFlagEmployee = !requiredFields.employee;

  console.log('PR IS: ', pr);
  if (!pr) {
    return null;
  }

  let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
  let isActionPerformerForEmployeeActions = hasRoleInPr(['employee']);
  let nonActionPerformerForEmployeeActions =
    hasRoleInPr(['supervisor', 'reviewer']) || isHr(userroles);
  let isActionPerformerForReviewerActions = hasRoleInPr([
    'supervisor',
    'reviewer'
  ]);
  let nonActionPerformerForReviewerActions =
    hasRoleInPr(['employee']) || isHr(userroles);

  const isVisibleToEmployee = () => {
    return (
      objectGet(props, 'pr.prVisibilityEntry.visibilityToEmployee') ===
      visibilityTypes.VISIBLE
    );
  };

  const isVisibleToReviewer = () => {
    return (
      objectGet(props, 'pr.prVisibilityEntry.visibilityToReviewer') ===
      visibilityTypes.VISIBLE
    );
  };

  const isFinalizedForReviewer = () => {
    return (
      objectGet(
        props,
        'pr.prFinalizationStatus.finalizationStatusOfReviewer'
      ) === finalizationTypes.FINALIZED
    );
  };

  const isFinalizedForEmployee = () => {
    return (
      objectGet(
        props,
        'pr.prFinalizationStatus.finalizationStatusOfEmployee'
      ) === finalizationTypes.FINALIZED
    );
  };

  const isArchived = () => {
    return pr.statuses.includes(prStatusEnum.ARCHIVED_HR);
  };

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
            text={firstReflectionField}
            isReadOnly={false}
            isError={false}
            action={value => changeFirstReflectionField(value)}
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
            text={secondReflectionField}
            isReadOnly={false}
            isError={false}
            action={value => changeSecondReflectionField(value)}
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
              pr={pr}
              errorFlag={errorFlagReviewer}
              readOnly={isVisibleToEmployee()}
              isActionPerformer={true}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              openEditing={!isFinalizedForReviewer()}
              isReadOnly={false}
              isError={false}
              text={''}
              action={() => {}}
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
              text={advancementStrategies}
              isReadOnly={false}
              isError={false}
              action={value => changeAdvancementStrategies(value)}
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
            text={finalCommentEmployee}
            isReadOnly={false}
            isError={false}
            action={value => changeFinalCommentEmployee(value)}
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
            text={finalCommentHr}
            isReadOnly={false}
            isError={false}
            action={value => changeFinalCommentHr(value)}
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
              pr={pr}
              category="PROBLEM_ANALYSIS"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              pr={pr}
              category="WORK_RESULTS"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              pr={pr}
              category="WORKING_MANNER"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
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
              pr={pr}
              category="CUSTOMER_INTERACTION"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              pr={pr}
              category="CUSTOMER_RETENTION"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
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
              pr={pr}
              category="TEAMWORK"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
            />
          </Grid>
          <Grid item xs={12}>
            <PrReviewerRating
              pr={pr}
              category="LEADERSHIP"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
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
              pr={pr}
              category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={isVisibleToEmployee()}
              openEditing={!isFinalizedForReviewer()}
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
          <ButtonsBelowSheet />
        </Grid>
      </Grid>
    </div>
  );
};

export const StyledComponent = withStyles(styles)(PrSheet);
export default injectIntl(
  connect(
    state => ({
      prById: getPrDetail()(state),
      userroles: getUserroles(state),
      userinfo: getUserinfo(state),
      requiredFields: getRequiredFields(state)
    }),
    {}
  )(StyledComponent)
);
