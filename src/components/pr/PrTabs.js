import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import PrSheet from './PrSheet';
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
  tabStyle: {
    color: theme.palette.secondary.white
  },
  tabsBackground: {
    backgroundColor: theme.palette.primary[400]
  },
  spacing: {
    padding: 3 * theme.spacing.unit
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

const PrTabs = ({
  classes,
  intl,
  pr,
  formerEmployee,
  fromInactive,
  printMode
}) => {
  const [tabValue, setTabValue] = useState('DETAIL_VIEW'); //or SCHEDULE_VIEW

  const handleChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <Paper className={classes.paper}>
      <AppBar
        position="static"
        className={`${classes.tabsBackground} ignorePrint`}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          classes={{
            indicator: classes.indicator
          }}
        >
          <Tab
            value={'DETAIL_VIEW'}
            classes={{
              root: classes.tabStyle
            }}
            label={intl.formatMessage({
              id: 'prtabs.details'
            })}
            id={'TabDetails'}
          />
          {!pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
            !formerEmployee && (
              <Tab
                value={'SCHEDULE_VIEW'}
                classes={{
                  root: classes.tabStyle
                }}
                label={intl.formatMessage({
                  id: 'prtabs.findtermin'
                })}
                id={'TabTerminfindung'}
              />
            )}
        </Tabs>
      </AppBar>
      {tabValue === 'DETAIL_VIEW' && (
        <TabContainer spacing={classes.spacing}>
          <PrSheet printMode={printMode} pr={pr} fromInactive={fromInactive} />
        </TabContainer>
      )}
      {tabValue === 'SCHEDULE_VIEW' && (
        <TabContainer spacing={classes.spacing}>
          <SchedulingView pr={pr} />
        </TabContainer>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(PrTabs));
