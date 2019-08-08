import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PrSheet from '../PrSheet';
import SchedulingView from './SchedulingView';
import Paper from '@material-ui/core/Paper';
import { injectIntl } from 'react-intl';

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
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    backgroundColor: theme.palette.primary['300']
  },
  indicator: {
    backgroundColor: '#FFFFFF'
  },
  tabStyle: {
    color: '#FFFFFF'
  }
});

const PrTabs = ({ classes, intl }) => {
  const [tabValue, setTabValue] = useState('DETAIL_VIEW'); //or SCHEDULE_VIEW
  const handleChange = (event, value) => {
    setTabValue(value);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
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
      </Paper>
      {tabValue === 'DETAIL_VIEW' && (
        <TabContainer>
          <PrSheet />
        </TabContainer>
      )}
      {tabValue === 'SCHEDULE_VIEW' && (
        <TabContainer>
          <SchedulingView />
        </TabContainer>
      )}
    </div>
  );
};

PrTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(PrTabs));
