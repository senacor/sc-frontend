import React from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  Paper,
  AppBar,
  Tabs,
  Tab,
  Typography
} from '@material-ui/core';
import { SC_TAB, SC_STATUS } from '../../../helper/scSheetData';
import { useUserinfoContext } from '../../../helper/contextHooks';
import ScSheet from '../ScSheet/ScSheet';
import SchedulingView from '../../scheduling/SchedulingView';

const styles = theme => ({
  ...theme.styledComponents,
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 3 * theme.spacing.unit
  },
  tabStyleSc: {
    backgroundColor: theme.palette.secondary.main
  },
  tabsBackground: {
    backgroundColor: theme.palette.primary[400]
  },
  indicator: {
    backgroundColor: theme.palette.secondary.white
  },
  spacing: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 10
  }
});

const TabContainer = ({ spacing, children }) => {
  return (
    <Typography component="div" className={spacing}>
      {children}
    </Typography>
  );
};

const ScTabs = ({ intl, classes, sc, tabValue, handleChangeTab }) => {
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
            value={SC_TAB.EMPLOYEE}
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
            value={SC_TAB.REVIEWER}
            classes={{
              root: classes.tabStyleSc
            }}
            label={intl.formatMessage({
              id: 'sctabs.reviewer'
            })}
            id={'TabDetailsReviewer'}
          />
          <Tab
            value={SC_TAB.MEETING}
            label={intl.formatMessage({
              id: 'sctabs.findtermin'
            })}
            id={'TabTerminfindung'}
          />
        </Tabs>
      </AppBar>
      {tabValue === SC_TAB.EMPLOYEE && (
        <TabContainer spacing={classes.spacing}>
          <ScSheet
            sc={sc}
            scWithPr={sc.statusSet.includes(SC_STATUS.WITH_PR)}
          />
        </TabContainer>
      )}
      {tabValue === SC_TAB.REVIEWER && (
        <TabContainer spacing={classes.spacing}>
          <ScSheet
            sc={sc}
            scWithPr={sc.statusSet.includes(SC_STATUS.WITH_PR)}
          />
        </TabContainer>
      )}
      {tabValue === SC_TAB.MEETING && (
        <TabContainer spacing={classes.spacing}>
          <SchedulingView sc={sc} />
        </TabContainer>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScTabs));
