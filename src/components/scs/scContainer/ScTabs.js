import React from 'react';
import { injectIntl } from 'react-intl';
import {
  AppBar,
  Paper,
  Tab,
  Tabs,
  Typography,
  withStyles
} from '@material-ui/core';
import { SC_STATUS, SC_TAB } from '../../../helper/scSheetData';
import ScSheetContainer from '../ScSheet/scTypes/ScSheetContainer';
import ScSheetSummaryContainer from '../ScSheet/sumarize/ScSheetSummaryContainer';
import { useUserinfoContext } from '../../../helper/contextHooks';

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

const ScTabs = ({
  intl,
  classes,
  sc,
  tabValue,
  handleChangeTab,
  setSc,
  setIsLoading,
  afterScFetched
}) => {
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
          {(user.isReviewerInSc(sc) || user.isOwnerInSc(sc)) && (
            <Tab
              selected={tabValue === SC_TAB.MY_DATA}
              value={SC_TAB.MY_DATA}
              classes={{
                root: classes.tabStyleSc
              }}
              label={intl.formatMessage({
                id: 'sctabs.my.data'
              })}
              id={'TabDetailsEmployee'}
            />
          )}
          <Tab
            selected={tabValue === SC_TAB.SUMMARY}
            value={SC_TAB.SUMMARY}
            classes={{
              root: classes.tabStyleSc
            }}
            label={intl.formatMessage({
              id: 'sctabs.summary'
            })}
            id={'TabDetailsReviewer'}
          />
        </Tabs>
      </AppBar>
      {tabValue === SC_TAB.MY_DATA &&
        (user.isOwnerInSc(sc) || user.isReviewerInSc(sc)) && (
          <TabContainer spacing={classes.spacing}>
            <ScSheetContainer
              sc={sc}
              scWithPr={sc.statusSet.includes(SC_STATUS.WITH_PR)}
              setSc={setSc}
              setIsLoading={setIsLoading}
              afterScFetched={afterScFetched}
              tabValue={tabValue}
            />
          </TabContainer>
        )}
      {tabValue === SC_TAB.SUMMARY && (
        <TabContainer spacing={classes.spacing}>
          <ScSheetSummaryContainer
            sc={sc}
            scWithPr={sc.statusSet.includes(SC_STATUS.WITH_PR)}
            setSc={setSc}
            setIsLoading={setIsLoading}
            afterScFetched={afterScFetched}
            tabValue={tabValue}
          />
        </TabContainer>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(ScTabs));
