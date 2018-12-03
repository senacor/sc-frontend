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
import { connect } from 'react-redux';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import BackToTableButton from './BackToTableButton';
import { getUserPrincipalName } from '../../../reducers/selector';
import ShowReviewer from './ShowReviewer';
import { prStatusEnum } from '../../../helper/prStatus';

const styles = theme => ({
  root: {
    marginBottom: 2 * theme.spacing.unit
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
  },
  list: {
    margin: '0px',
    padding: '0px'
  }
});

export class PrDetailInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    const { classes, pr, username } = this.props;

    if (!pr) {
      return null;
    }

    const { firstName, lastName } = pr.employee;
    let dateAccepted = pr.statuses.includes(prStatusEnum.FIXED_DATE);
    const termin = pr.meetingDay
      ? dateAccepted
        ? formatDateForFrontend(pr.meetingDay)
        : formatDateForFrontend(pr.meetingDay) + ' (noch nicht bestätigt)'
      : 'noch nicht vereinbart';
    const competence = translateContent('COMPETENCE_' + pr.competence);

    const subheader = `Fälligkeit: ${formatDateForFrontend(
      pr.deadline
    )}, ACD_BOOT, ${competence}, ${translateContent(
      pr.occasion
    )}, Termin: ${termin}`;

    const supervisorHeader = `Vorgesetzter: ${getDisplayName(pr.supervisor)}`;

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
              <List className={classes.list}>
                <ListItem className={classes.list}>
                  <Typography variant={'body2'} color={'textSecondary'}>
                    {supervisorHeader}
                  </Typography>
                  <ShowReviewer
                    pr={pr}
                    prefix={', Beurteiler: '}
                    username={username}
                  />
                </ListItem>
              </List>
            </div>
            <div>
              <BackToTableButton pr={pr} />
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