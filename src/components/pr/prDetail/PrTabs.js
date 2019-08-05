import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PrSheet from '../PrSheet';
import SchedulingView from './SchedulingView';
import Paper from '@material-ui/core/Paper';
import { getPrTab } from '../../../reducers/selector';
import { prTabEnum } from '../../../helper/prTabEnum';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
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

const PrTabs = ({ classes, tabValue, setTabValue, intl }) => {
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
            value={prTabEnum.DETAIL_VIEW}
            classes={{
              root: classes.tabStyle
            }}
            label={intl.formatMessage({
              id: 'prtabs.details'
            })}
            id={'TabDetails'}
          />
          <Tab
            value={prTabEnum.SCHEDULE_VIEW}
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
      {tabValue === prTabEnum.DETAIL_VIEW && (
        <TabContainer>
          <PrSheet />
        </TabContainer>
      )}
      {tabValue === prTabEnum.SCHEDULE_VIEW && (
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

export const StyledComponent = withStyles(styles)(PrTabs);

export default injectIntl(
  connect(
    state => ({
      tabValue: getPrTab(state)
    }),
    {
      setTabValue: actions.setPrTabs
    }
  )(StyledComponent)
);
