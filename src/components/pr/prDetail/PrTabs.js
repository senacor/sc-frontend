import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import PrSheet from '../PrSheet';
import SchedulingView from './SchedulingView';

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    margin: 3 * theme.spacing.unit
  },
  paper: {
    backgroundColor: theme.palette.primary['W000'],
    margin: 3 * theme.spacing.unit
  },
  indicator: {
    backgroundColor: theme.palette.primary['W000']
  },
  tabStyle: {
    color: theme.palette.primary['W000']
  },
  tabsBackground: {
    backgroundColor: theme.palette.primary[400]
  }
});

const PrTabs = ({ classes, intl, pr }) => {
  const [tabValue, setTabValue] = useState('DETAIL_VIEW'); //or SCHEDULE_VIEW

  const handleChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <Paper className={classes.paper}>
      <AppBar position="static" className={classes.tabsBackground}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          fullWidth
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
        </Tabs>
      </AppBar>
      {tabValue === 'DETAIL_VIEW' && (
        <TabContainer>
          <PrSheet pr={pr} />
        </TabContainer>
      )}
      {tabValue === 'SCHEDULE_VIEW' && (
        <TabContainer>
          <SchedulingView pr={pr} />
        </TabContainer>
      )}
    </Paper>
  );
};

export default injectIntl(withStyles(styles)(PrTabs));
