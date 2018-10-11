import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Grid from '@material-ui/core/Grid';

import moment from 'moment';

import { translateContent } from '../../translate/Translate';
import PrHistory from './PrHistory';

const styles = theme => ({
  root: {
    marginBottom: 2 * theme.spacing.unit
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
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
  state = { expanded: false };

  render() {
    const { classes, pr } = this.props;

    if (!pr) {
      return null;
    }

    const { firstName, lastName } = pr.employee;
    const fullName = `${firstName} ${lastName}`;
    const subheader = `Fälligkeit: ${moment(pr.deadline).format(
      'DD.MM.YY'
    )}, ACD_BOOT, Developer, ${translateContent(pr.occasion)}`;

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
              <Typography variant={'body2'}>{fullName}</Typography>
              <Typography variant={'body2'} color={'textSecondary'}>
                {subheader}
              </Typography>
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

export default withStyles(styles)(PrDetailInformation);
