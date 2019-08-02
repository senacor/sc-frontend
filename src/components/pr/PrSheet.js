import React from 'react';
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
  const { prById, classes, userinfo, requiredFields, intl, userroles } = props;

  let errorFlagReviewer = !requiredFields.reviewer;
  let errorFlagEmployee = !requiredFields.employee;

  if (!prById) {
    return null;
  }

  let hasRoleInPr = hasRoleInPrBasedOnUserName(prById, userinfo);
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
      objectGet(props, 'prById.prVisibilityEntry.visibilityToEmployee') ===
      visibilityTypes.VISIBLE
    );
  };

  const isVisibleToReviewer = () => {
    return (
      objectGet(props, 'prById.prVisibilityEntry.visibilityToReviewer') ===
      visibilityTypes.VISIBLE
    );
  };

  const isFinalizedForReviewer = () => {
    return (
      objectGet(
        props,
        'prById.prFinalizationStatus.finalizationStatusOfReviewer'
      ) === finalizationTypes.FINALIZED
    );
  };

  const isFinalizedForEmployee = () => {
    return (
      objectGet(
        props,
        'prById.prFinalizationStatus.finalizationStatusOfEmployee'
      ) === finalizationTypes.FINALIZED
    );
  };

  const isArchived = () => {
    return prById.statuses.includes(prStatusEnum.ARCHIVED_HR);
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
            prById={prById}
            errorFlag={errorFlagEmployee}
            readOnly={isVisibleToReviewer()}
            category="ROLE_AND_PROJECT_ENVIRONMENT"
            isActionPerformer={isActionPerformerForEmployeeActions}
            nonActionPerformer={nonActionPerformerForEmployeeActions}
          />
          <PrSheetEmployee
            prById={prById}
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
            prById={prById}
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
            prById={prById}
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
            prById={prById}
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
            prById={prById}
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
            prById={prById}
            category="PROBLEM_ANALYSIS"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            prById={prById}
            category="WORK_RESULTS"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            prById={prById}
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
            prById={prById}
            category="CUSTOMER_INTERACTION"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            prById={prById}
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
            prById={prById}
            category="TEAMWORK"
            isActionPerformer={isActionPerformerForReviewerActions}
            nonActionPerformer={nonActionPerformerForReviewerActions}
            readOnly={isVisibleToEmployee()}
            openEditing={!isFinalizedForReviewer()}
          />
          <PrReviewerRating
            prById={prById}
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
            prById={prById}
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
