import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ScSheet from './ScSheet/ScSheet';
import { useUserinfoContext } from '../../helper/contextHooks';
import SchedulingView from '../scheduling/SchedulingView';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 3 * theme.spacing.unit
  },
  paper: {
    backgroundColor: theme.palette.secondary.white,
    margin: 3 * theme.spacing.unit
  },
  indicator: {
    backgroundColor: theme.palette.secondary.white
  },
  tabStyleSc: {
    backgroundColor: theme.palette.secondary.main
  },
  tabsBackground: {
    backgroundColor: theme.palette.primary[400]
  },
  spacing: {
    padding: theme.spacing.unit
  }
});

const TabContainer = ({ spacing, children }) => {
  return (
    <Typography component="div" className={spacing}>
      {children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const ScTabs = ({ classes, intl, sc, tabValue, handleChangeTab }) => {
  const user = useUserinfoContext();

  return (
    <Paper className={classes.paper}>
      <AppBar position="static" className={classes.tabsBackground}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          variant="fullWidth"
          indicatorColor="secondary"
          classes={{
            indicator: classes.indicator
          }}
        >
          <Tab
            disabled={user.isReviewerInSc(sc)} // TODO: depends also on status of current SC
            value={'SC_EMPLOYEE'}
            classes={{
              root: classes.tabStyleSc
            }}
            label={intl.formatMessage({
              id: 'sctabs.employee'
            })}
            id={'TabDetailsEmployee'}
          />
          <Tab
            disabled={!user.isReviewerInSc(sc)}
            value={'SC_REVIEWER'}
            classes={{
              root: classes.tabStyleSc
            }}
            label={intl.formatMessage({
              id: 'sctabs.reviewer'
            })}
            id={'TabDetailsReviewer'}
          />
          <Tab
            value={'SCHEDULE_VIEW'}
            label={intl.formatMessage({
              id: 'sctabs.findtermin'
            })}
            id={'TabTerminfindung'}
          />
        </Tabs>
      </AppBar>
      {tabValue === 'SC_EMPLOYEE' && (
        <TabContainer spacing={classes.spacing}>
          <ScSheet sc={sc} />
        </TabContainer>
      )}
      {tabValue === 'SC_REVIEWER' && (
        <TabContainer spacing={classes.spacing}>
          <ScSheet sc={sc} withSkills />
        </TabContainer>
      )}
      {tabValue === 'SCHEDULE_VIEW' && (
        <TabContainer spacing={classes.spacing}>
          <SchedulingView sc={sc} />
        </TabContainer>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScTabs));
