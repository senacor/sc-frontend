import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PrSheet from '../PrSheet';
import SchedulingView from './SchedulingView';
import Paper from '@material-ui/core/Paper';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

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

class PrTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="secondary"
            classes={{
              indicator: classes.indicator
            }}
          >
            <Tab
              classes={{
                root: classes.tabStyle
              }}
              label="Details"
            />
            <Tab
              classes={{
                root: classes.tabStyle
              }}
              label="Terminfindung"
            />
          </Tabs>
        </Paper>
        {value === 0 && (
          <TabContainer>
            <PrSheet />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <SchedulingView />
          </TabContainer>
        )}
      </div>
    );
  }
}

PrTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrTabs);
