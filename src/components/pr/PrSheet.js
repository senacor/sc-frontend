import React, { useState } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import PrReviewerRating from './PrReviewerRating';
import PrOverallAssessment from './PrOverallAssessment';
import PrSheetEmployee from './PrSheetEmployee';
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
import PrFinalCommentEmployee from './PrFinalCommentEmployee';
import PrFinalCommentHr from './PrFinalCommentHr';
import PrAdvancementStrategies from './PrAdvancementStrategies';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { prStatusEnum } from '../../helper/prStatus';
import { hasRoleInPrBasedOnUserName } from '../../helper/hasRoleInPr';
import { default as ButtonsBelowSheet } from './ButtonsBelowSheet';
import { injectIntl } from 'react-intl';

const styles = () => ({
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
  // const pr = {
  //   "id": 26,
  //   "employee": {
  //     "createdDateTime": "2019-08-02T12:44:26.227372",
  //     "modifiedDateTime": "2019-08-02T12:44:34.631152",
  //     "id": 3001,
  //     "firstName": "Matúš",
  //     "lastName": "Piroh",
  //     "login": "mpiroh",
  //     "title": "",
  //     "email": "Matus.Piroh@senacor.com",
  //     "endOfProbationPeriod": "2019-08-31",
  //     "salaryLevel": 6,
  //     "costcenterId": 408,
  //     "supervisorId": 297
  //   },
  //   "supervisor": {
  //     "createdDateTime": "2019-08-02T12:44:26.227372",
  //     "modifiedDateTime": "2019-08-02T12:44:34.631152",
  //     "id": 3001,
  //     "firstName": "Matúš",
  //     "lastName": "Piroh",
  //     "login": "mpiroh",
  //     "title": "",
  //     "email": "Matus.Piroh@senacor.com",
  //     "endOfProbationPeriod": "2019-08-31",
  //     "salaryLevel": 6,
  //     "costcenterId": 408,
  //     "supervisorId": 297
  //   },
  //   "reviewer": {
  //     "createdDateTime": "2019-08-02T12:44:26.227372",
  //     "modifiedDateTime": "2019-08-02T12:44:34.631152",
  //     "id": 3001,
  //     "firstName": "Matúš",
  //     "lastName": "Piroh",
  //     "login": "mpiroh",
  //     "title": "",
  //     "email": "Matus.Piroh@senacor.com",
  //     "endOfProbationPeriod": "2019-08-31",
  //     "salaryLevel": 6,
  //     "costcenterId": 408,
  //     "supervisorId": 297
  //   },
  //   "deadline": "2019-08-04",
  //   "occasion": "ON_DEMAND",
  //   "prRating": "pr_rating_json",
  //   "targetRole": "target_role_json",
  //   "prStatusEntry": "",
  //   "exchangeItemId": "exchange_item_id",
  //   "finalMeetingDate": "2019-08-03",
  //   "firstReflectionField": "first_reflection_field",
  //   "secondReflectionField": "second_reflection_field",
  //   "finalCommentEmployee": "final_comment_employee",
  //   "finalCommentHr": "final_comment_hr",
  //   "advancementStrategies": "advancement_strategies",
  //   "inProgressForEmployee": true,
  //   "inProgressForReviewer": false,
  //   "done": false
  // };

  const { prById, classes, userinfo, requiredFields, intl, userroles } = props;

  const [pr, setPr] = useState(prById);
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
      <List>
        <ListItem className={classes.marginDown}>
          <ListItemText
            primary={intl.formatMessage({
              id: 'prsheet.employeerole'
            })}
          />
        </ListItem>
        <List disablePadding>
          <PrSheetEmployee
            pr={pr}
            errorFlag={errorFlagEmployee}
            readOnly={isVisibleToReviewer()}
            category="ROLE_AND_PROJECT_ENVIRONMENT"
            isActionPerformer={isActionPerformerForEmployeeActions}
            nonActionPerformer={nonActionPerformerForEmployeeActions}
          />
          <PrSheetEmployee
            pr={pr}
            errorFlag={errorFlagEmployee}
            readOnly={isVisibleToReviewer()}
            category="INFLUENCE_OF_LEADER_AND_ENVIRONMENT"
            isActionPerformer={isActionPerformerForEmployeeActions}
            nonActionPerformer={nonActionPerformerForEmployeeActions}
          />
        </List>
      </List>
    );
  };

  let overallReviewer = () => {
    return (
      <List>
        <ListItem className={classes.marginDown}>
          <ListItemText
            primary={intl.formatMessage({
              id: 'prsheet.overall'
            })}
          />
        </ListItem>

        <List disablePadding>
          <PrOverallAssessment
            pr={pr}
            errorFlag={errorFlagReviewer}
            readOnly={isVisibleToEmployee()}
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            openEditing={!isFinalizedForReviewer()}
          />
        </List>

        <Divider />
        <ListItem className={classes.marginDown}>
          <ListItemText
            primary={intl.formatMessage({
              id: 'prsheet.measures'
            })}
          />
        </ListItem>
        <List disablePadding>
          <PrAdvancementStrategies
            pr={pr}
            readOnly={isVisibleToEmployee()}
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            open={!isFinalizedForReviewer()}
          />
        </List>
      </List>
    );
  };

  let finalEmployee = () => {
    return (
      <List>
        <List disablePadding>
          <PrFinalCommentEmployee
            pr={pr}
            readOnly={isFinalizedForEmployee()}
            open={isFinalizedForReviewer()}
            isActionPerformer={isActionPerformerForEmployeeActions}
            nonActionPerformer={nonActionPerformerForEmployeeActions}
          />
        </List>
      </List>
    );
  };

  let finalHr = () => {
    return (
      <List>
        <List disablePadding>
          <PrFinalCommentHr
            pr={pr}
            open={isFinalizedForEmployee()}
            readOnly={isArchived()}
            isActionPerformer={isHr(userroles)}
          />
        </List>
      </List>
    );
  };

  let detailReviewer = () => {
    return (
      <List>
        <div className={classes.containerListItem}>
          <ListItem className={classes.marginDown}>
            <ListItemText
              primary={intl.formatMessage({
                id: 'prsheet.performance'
              })}
            />
          </ListItem>
          <ListItem className={classes.marginDownSmall}>
            <Typography
              variant={'caption'}
              color={'textSecondary'}
              className={classes.legend}
            >
              {intl.formatMessage({
                id: 'prsheet.notfulfilled'
              })}{' '}
              <br />
              {intl.formatMessage({
                id: 'prsheet.excellent'
              })}
            </Typography>
          </ListItem>
        </div>
        <List disablePadding>
          <PrReviewerRating
            pr={pr}
            category="PROBLEM_ANALYSIS"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            pr={pr}
            category="WORK_RESULTS"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            pr={pr}
            category="WORKING_MANNER"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
        </List>
        <ListItem className={classes.marginDown}>
          <ListItemText
            primary={intl.formatMessage({
              id: 'prsheet.customerimpact'
            })}
          />
        </ListItem>
        <List disablePadding>
          <PrReviewerRating
            pr={pr}
            category="CUSTOMER_INTERACTION"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            pr={pr}
            category="CUSTOMER_RETENTION"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
        </List>
        <ListItem className={classes.marginDown}>
          <ListItemText
            primary={intl.formatMessage({
              id: 'prsheet.teamimpact'
            })}
          />
        </ListItem>
        <List disablePadding>
          <PrReviewerRating
            pr={pr}
            category="TEAMWORK"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            pr={pr}
            category="LEADERSHIP"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
        </List>
        <ListItem className={classes.marginDown}>
          <ListItemText
            primary={intl.formatMessage({
              id: 'prsheet.companyimpact'
            })}
          />
        </ListItem>
        <List disablePadding>
          <PrReviewerRating
            pr={pr}
            category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
        </List>
      </List>
    );
  };

  let requiredInfo = () => {
    return (
      <List>
        <ListItem>
          <Typography className={classes.required} variant="caption">
            {intl.formatMessage({
              id: 'prsheet.required'
            })}
          </Typography>
        </ListItem>
      </List>
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
          <Divider />
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
