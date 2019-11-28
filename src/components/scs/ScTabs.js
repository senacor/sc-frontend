import React, { Fragment } from 'react';
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
import { SC_TAB, SC_STATUS } from '../../helper/scSheetData';
import {
  FormControl,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@material-ui/core';
import { positions } from '../../helper/scSheetData';
import { modifyString } from '../../helper/string';

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
  chooseScType: {
    backgroundColor: theme.palette.secondary.white,
    margin: 3 * theme.spacing.unit,
    padding: theme.spacing.unit
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
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  formControl: {
    minWidth: 180
  },
  radioGroup: {
    display: 'inline-block'
  },
  submitScType: {
    height: 40,
    marginTop: 'auto',
    marginBottom: 'auto'
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

const ScTabs = ({
  classes,
  intl,
  sc,
  tabValue,
  handleChangeTab,
  position,
  handleChangePosition,
  handleChangeType,
  scWithPr,
  handleSubmitScType
}) => {
  const user = useUserinfoContext();

  return (
    <Fragment>
      {user.isReviewerInSc(sc) && (
        <Paper className={classes.chooseScType}>
          <Typography variant="h5">Scorecard selection</Typography>
          <div className={classes.dropdownContainer}>
            <FormControl className={classes.formControl}>
              <FormLabel component="legend">
                {intl.formatMessage({ id: 'scsheet.position' })}
              </FormLabel>
              <Select
                labelid="demo-simple-select-label"
                id="demo-simple-select"
                value={position}
                disabled={!user.isReviewerInSc(sc)}
                onChange={handleChangePosition}
              >
                {positions.map((pos, index) => (
                  <MenuItem key={index} value={pos.toUpperCase()}>
                    {modifyString(pos)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel component="legend">
                {intl.formatMessage({ id: 'scsheet.sctype' })}
              </FormLabel>
              <RadioGroup
                aria-label="sc-type"
                name="sc-type-radios"
                onChange={handleChangeType}
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value={SC_STATUS.WITH_PR}
                  control={<Radio />}
                  label={intl.formatMessage({ id: 'scsheet.sctype.withPR' })}
                />
                <FormControlLabel
                  value={SC_STATUS.WITHOUT_PR}
                  control={<Radio />}
                  label={intl.formatMessage({
                    id: 'scsheet.sctype.withoutPR'
                  })}
                />
              </RadioGroup>
            </FormControl>
            <Button
              disabled={!scWithPr || !position}
              onClick={handleSubmitScType}
              color="secondary"
              variant="contained"
              className={classes.submitScType}
            >
              {intl.formatMessage({ id: 'scsheet.submit' })}
            </Button>
          </div>
        </Paper>
      )}
      {scWithPr && (
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
              <ScSheet sc={sc} scWithPr />
            </TabContainer>
          )}
          {tabValue === SC_TAB.REVIEWER && (
            <TabContainer spacing={classes.spacing}>
              <ScSheet sc={sc} scWithPr />
            </TabContainer>
          )}
          {tabValue === SC_TAB.MEETING && (
            <TabContainer spacing={classes.spacing}>
              <SchedulingView sc={sc} />
            </TabContainer>
          )}
        </Paper>
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScTabs));
