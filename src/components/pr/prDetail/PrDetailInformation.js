import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Grid from '@material-ui/core/Grid';

import { translateContent } from '../../translate/Translate';
import PrHistory from './PrHistory';
import getDisplayName from '../../../helper/getDisplayName';
import { formatDateForFrontend } from '../../../helper/date';
import PrDelegate from '../PrDelegate';
import { prStatusEnum } from '../../../helper/prStatus';
import { connect } from 'react-redux';
import { getUserPrincipalName } from '../../../reducers/selector';

const styles = theme => ({
  root: {
    marginBottom: 2 * theme.spacing.unit
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  avatarContainer: {
    flex: '0 0 auto',
    marginRight: 2 * theme.spacing.unit
  },
  avatar: {
    backgroundColor: theme.palette.primary[500]
  },
  heading: {
    flex: '1 1 auto'
  }
});

export class PrDetailInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  prDelegable = pr => {
    return (
      pr.supervisor.login === this.props.username &&
      pr.statuses.includes(prStatusEnum.FINALIZED_REVIEWER) === false
    );
  };

  render() {
    const { classes, pr } = this.props;

    if (!pr) {
      return null;
    }

    const { firstName, lastName } = pr.employee;
    let dateAccepted = pr.statuses.includes(prStatusEnum.FIXED_DATE);
    const termin =
      pr.meeting && dateAccepted
        ? formatDateForFrontend(pr.meeting.start)
        : 'noch nicht vereinbart';
    const competence = translateContent('COMPETENCE_' + pr.competence);
    const reviewer =
      pr.supervisor.id === pr.reviewer.id
        ? ''
        : `, Beurteiler: ${getDisplayName(pr.reviewer)}`;

    const subheader = `Fälligkeit: ${formatDateForFrontend(
      pr.deadline
    )}, ACD_BOOT, ${competence}, ${translateContent(
      pr.occasion
    )}, Termin: ${termin}`;

    const reviewerHeader = `Vorgesetzter: ${getDisplayName(
      pr.supervisor
    )}${reviewer}`;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.avatarContainer}>
              <Avatar className={classes.avatar}>
                {`${firstName.charAt(0)}${lastName.charAt(0)}`}
              </Avatar>
            </div>
            <div className={classes.heading}>
              <Typography variant={'body2'}>
                {getDisplayName(pr.employee)}
              </Typography>
              <Typography variant={'body2'} color={'textSecondary'}>
                {subheader}
              </Typography>
              <Typography variant={'body2'} color={'textSecondary'}>
                {reviewerHeader}
              </Typography>
            </div>
            <div>
              {this.prDelegable(pr) ? (
                <PrDelegate
                  pr={pr}
                  startValue={
                    pr.supervisor.id !== pr.reviewer.id
                      ? getDisplayName(pr.reviewer)
                      : ''
                  }
                  defaultText={'Nicht übergeben'}
                  isDelegated={pr.supervisor.id !== pr.reviewer.id}
                />
              ) : null}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <PrHistory />
              </Grid>
              <Grid item xs={4} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PrDetailInformation);

export default connect(
  state => ({
    username: getUserPrincipalName(state)
  }),
  {}
)(StyledComponent);
