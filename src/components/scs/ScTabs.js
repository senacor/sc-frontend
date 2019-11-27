import React, { useState } from 'react';
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
import { SC_TAB } from '../../helper/scSheetData';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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

  // TODO delete type select after demo
  const [scWithPr, setScWithPr] = useState(false);

  const handleChangeType = event => {
    setScWithPr(event.target.value);
  };

  return (
    <Paper className={classes.paper}>
      <div style={{ textAlign: 'center' }}>
        <FormControl style={{ marginTop: 15, marginBottom: 15 }}>
          <InputLabel id="type-select-label">{'Type'}</InputLabel>
          <Select
            labelid="type-select-label"
            id="demo-simple-select"
            value={scWithPr}
            onChange={event => handleChangeType(event)}
          >
            <MenuItem value={false}>Ohne PR</MenuItem>
            <MenuItem value={true}>Mit PR</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

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
          <ScSheet sc={sc} withPrCategories={scWithPr} />
        </TabContainer>
      )}
      {tabValue === SC_TAB.REVIEWER && (
        <TabContainer spacing={classes.spacing}>
          <ScSheet sc={sc} />
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
