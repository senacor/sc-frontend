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
import * as actions from '../../actions';
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
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import { prStatusEnum } from '../../helper/prStatus';
import { hasRoleInPrBasedOnUserName } from '../../helper/hasRoleInPr';

const styles = theme => ({
  containerVertical: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  nested: {
    paddingLeft: '3%'
  },
  rightAlignText: {
    textAlign: 'right',
    marginRight: '3%',
    color: '#6E6E6E'
  },
  buttonDesktop: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '2%'
  },
  buttonDesktopDisabled: {
    position: 'relative',
    marginRight: '1%',
    backgroundColor: theme.palette.primary['50'],
    color: '#FFF',
    marginBottom: '2%'
  },
  required: {
    color: 'rgba(0, 0, 0, 0.42)'
  },
  marginDown: {
    marginBottom: '-10pt'
  },
  red: { color: '#ff0000' }
});

class PrSheet extends React.Component {
  isVisibleToEmployee = () => {
    return (
      objectGet(this.props, 'prById.prVisibilityEntry.visibilityToEmployee') ===
      visibilityTypes.VISIBLE
    );
  };

  isVisibleToReviewer = () => {
    return (
      objectGet(this.props, 'prById.prVisibilityEntry.visibilityToReviewer') ===
      visibilityTypes.VISIBLE
    );
  };

  isFinalizedForReviewer = () => {
    return (
      objectGet(
        this.props,
        'prById.prFinalizationStatus.finalizationStatusOfReviewer'
      ) === finalizationTypes.FINALIZED
    );
  };

  isFinalizedForEmployee = () => {
    return (
      objectGet(
        this.props,
        'prById.prFinalizationStatus.finalizationStatusOfEmployee'
      ) === finalizationTypes.FINALIZED
    );
  };

  isArchived = () => {
    return this.props.prById.statuses.includes(prStatusEnum.ARCHIVED_HR);
  };

  render() {
    const { prById, classes, userinfo, requiredFields } = this.props;

    let errorFlagReviewer = !requiredFields.reviewer;
    let errorFlagEmployee = !requiredFields.employee;
    let globalErrorFlag = errorFlagEmployee || errorFlagReviewer;

    if (!prById) {
      return null;
    }

    let hasRoleInPr = hasRoleInPrBasedOnUserName(prById, userinfo);
    let isActionPerformerForEmployeeActions = hasRoleInPr(['employee']);
    let nonActionPerformerForEmployeeActions =
      hasRoleInPr(['supervisor', 'reviewer']) || isHr(this.props.userroles);
    let isActionPerformerForReviewerActions = hasRoleInPr([
      'supervisor',
      'reviewer'
    ]);
    let nonActionPerformerForReviewerActions =
      hasRoleInPr(['employee']) || isHr(this.props.userroles);

    let step1employee = () => {
      return (
        <List>
          <ListItem className={classes.marginDown}>
            <ListItemText primary="Mitarbeiterrolle" />
          </ListItem>
          <List disablePadding>
            <PrSheetEmployee
              prById={prById}
              errorFlag={errorFlagEmployee}
              readOnly={this.isVisibleToReviewer()}
              category="ROLE_AND_PROJECT_ENVIRONMENT"
              isActionPerformer={isActionPerformerForEmployeeActions}
              nonActionPerformer={nonActionPerformerForEmployeeActions}
            />
            <PrSheetEmployee
              prById={prById}
              errorFlag={errorFlagEmployee}
              readOnly={this.isVisibleToReviewer()}
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
            <ListItemText primary="Gesamtschätzung und Entwicklungsbedarfe" />
          </ListItem>
          <List disablePadding>
            <PrOverallAssessment
              prById={prById}
              errorFlag={errorFlagReviewer}
              readOnly={this.isVisibleToEmployee()}
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
            />
          </List>
        </List>
      );
    };

    let finalEmployee = () => {
      return (
        <List>
          <List disablePadding>
            <div className={classes.containerListItem}>
              <PrFinalCommentEmployee
                prById={prById}
                readOnly={this.isFinalizedForEmployee()}
                open={this.isFinalizedForReviewer()}
                isActionPerformer={isActionPerformerForEmployeeActions}
                nonActionPerformer={nonActionPerformerForEmployeeActions}
              />
            </div>
          </List>
        </List>
      );
    };

    let finalHr = () => {
      return (
        <List>
          <List disablePadding>
            <div className={classes.containerListItem}>
              <PrFinalCommentHr
                prById={prById}
                open={this.isFinalizedForEmployee()}
                readOnly={this.isArchived()}
                isActionPerformer={isHr(this.props.userroles)}
              />
            </div>
          </List>
        </List>
      );
    };

    let detailReviewer = () => {
      return (
        <List>
          <ListItem className={classes.marginDown}>
            <ListItemText primary="Leistungen im Projekt" />
          </ListItem>
          <List disablePadding>
            <PrReviewerRating
              prById={prById}
              category="PROBLEM_ANALYSIS"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
            <PrReviewerRating
              prById={prById}
              category="WORK_RESULTS"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
            <PrReviewerRating
              prById={prById}
              category="WORKING_MANNER"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
          </List>
          <ListItem className={classes.marginDown}>
            <ListItemText primary="Wirkung beim Kunden" />
          </ListItem>
          <List disablePadding>
            <PrReviewerRating
              prById={prById}
              category="CUSTOMER_INTERACTION"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
            <PrReviewerRating
              prById={prById}
              category="CUSTOMER_RETENTION"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
          </List>
          <ListItem className={classes.marginDown}>
            <ListItemText primary="Wirkung im Team" />
          </ListItem>
          <List disablePadding>
            <PrReviewerRating
              prById={prById}
              category="TEAMWORK"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
            <PrReviewerRating
              prById={prById}
              category="LEADERSHIP"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
            />
          </List>
          <ListItem className={classes.marginDown}>
            <ListItemText primary="Wirkung im Unternehmen" />
          </ListItem>
          <List disablePadding>
            <PrReviewerRating
              prById={prById}
              category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
              isActionPerformer={isActionPerformerForReviewerActions}
              nonActionPerformer={nonActionPerformerForReviewerActions}
              readOnly={this.isVisibleToEmployee()}
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
              *Pflichtfeld
            </Typography>
          </ListItem>
        </List>
      );
    };

    let errorText = () => {
      return (
        <List>
          <ListItem>
            <Typography className={classes.red}>
              Bitte alle Pflichtfelder ausfüllen!
            </Typography>
          </ListItem>
        </List>
      );
    };

    return (
      <div>
        {globalErrorFlag ? errorText() : null}
        <Grid container spacing={40}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            {step1employee()}
            <Divider />
            <Hidden lgUp>
              {detailReviewer()}
              <Divider />
            </Hidden>
            {overallReviewer()}
            <Divider />
            {finalEmployee()}
            {requiredInfo()}
          </Grid>
          <Hidden mdDown>
            <Grid item lg={6} xl={6}>
              {detailReviewer()}
              {isHr(this.props.userroles) ? <Divider /> : null}
              {isHr(this.props.userroles) ? finalHr() : null}
            </Grid>
          </Hidden>
        </Grid>
        <Divider />
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrSheet);
export default connect(
  state => ({
    prById: getPrDetail()(state),
    userroles: getUserroles(state),
    userinfo: getUserinfo(state),
    requiredFields: getRequiredFields(state)
  }),
  {
    setVisibilityById: actions.setVisibilityById
  }
)(StyledComponent);
