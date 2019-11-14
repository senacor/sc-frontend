import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
// Material UI
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import { savePerformanceData } from '../../../calls/sc';
import Leistungen from './categories/Leistungen';
import ButtonsBelowSheet from './ButtonsBelowSheet';

const styles = theme => ({
  header: {
    background: theme.palette.secondary.darkGreen,
    color: theme.palette.contrastText,
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    borderRadius: 3
  },
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  formControl: {
    minWidth: 180
  },
  dropdownContainer: {
    textAlign: 'center'
  }
});

const ScSheet = ({ sc, classes, intl }) => {
  const initialFieldsData = {
    title: '',
    weight: '',
    percentage: '',
    evaluation: '',
    description: '',
    achievement: '',
    comment: ''
  };

  const info = useInfoContext();
  const error = useErrorContext();
  const user = useUserinfoContext();
  const [position, setPosition] = useState('');

  const [
    dailyBusinessEmployeeFields,
    setDailyBusinessEmployeeFields
  ] = useState(sc.employeePerformance.dailyBusiness);
  const [projectEmployeeFields, setProjectEmployeeFields] = useState(
    sc.employeePerformance.project
  );

  const [
    dailyBusinessReviewerFields,
    setDailyBusinessReviewerFields
  ] = useState(sc.reviewerPerformance.dailyBusiness);
  const [projectReviewerFields, setProjectReviewerFields] = useState(
    sc.reviewerPerformance.project
  );

  const mockPositions = [
    'Specialist',
    'Senior (Expert)',
    'Senior (Mgmt.)',
    'Expert',
    'Manager'
  ];

  const handleSubmit = () => {
    // TODO: submitting data and sending to backend
  };

  const handleSave = () => {
    const dailyBusinessFields = user.isReviewerInSc(sc)
      ? dailyBusinessReviewerFields
      : dailyBusinessEmployeeFields;
    const projectFields = user.isReviewerInSc(sc)
      ? projectReviewerFields
      : projectEmployeeFields;

    const data = {
      dailyBusiness: dailyBusinessFields.map(my => {
        return {
          title: my.title,
          evaluation: my.evaluation ? my.evaluation : 0,
          percentage: my.percentage,
          description: my.description,
          achievement: my.achievement,
          weight: my.weight,
          comment: my.comment
        };
      }),
      project: projectFields.map(my => {
        return {
          title: my.title,
          evaluation: my.evaluation ? my.evaluation : 0,
          percentage: my.percentage,
          description: my.description,
          achievement: my.achievement,
          weight: my.weight,
          comment: my.comment
        };
      })
    };
    savePerformanceData(
      sc.id,
      user.isReviewerInSc(sc) ? 'reviewer' : 'employee',
      data,
      info,
      error
    );
  };

  const handleChangePosition = event => {
    setPosition(event.target.value);
  };

  const handleChangePropKeyEmployee = (type, i, propKey, event) => {
    console.log('propKey', propKey);
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessEmployeeFields];
      values[i][propKey] = event.target.value;
      setDailyBusinessEmployeeFields(values);
    } else {
      const values = [...projectEmployeeFields];
      values[i][propKey] = event.target.value;
      setProjectEmployeeFields(values);
    }
  };

  const handleChangePropKeyReviewer = (type, i, propKey, event) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessReviewerFields];
      values[i][propKey] = event.target.value;
      setDailyBusinessReviewerFields(values);
    } else {
      const values = [...projectReviewerFields];
      values[i][propKey] = event.target.value;
      setProjectReviewerFields(values);
    }
  };

  const addFieldsEmployee = type => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessEmployeeFields];
      values.push(initialFieldsData);
      setDailyBusinessEmployeeFields(values);
    } else {
      const values = [...projectEmployeeFields];
      values.push(initialFieldsData);
      setProjectEmployeeFields(values);
    }
  };

  const addFieldsReviewer = type => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessReviewerFields];
      values.push(initialFieldsData);
      setDailyBusinessReviewerFields(values);
    } else {
      const values = [...projectReviewerFields];
      values.push(initialFieldsData);
      setProjectReviewerFields(values);
    }
  };

  const removeFieldsEmployee = (type, i) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessEmployeeFields];
      values.splice(i, 1);
      setDailyBusinessEmployeeFields(values);
    } else {
      const values = [...projectEmployeeFields];
      values.splice(i, 1);
      setProjectEmployeeFields(values);
    }
  };

  const removeFieldsReviewer = (type, i) => {
    if (type === 'dailyBusiness') {
      const values = [...dailyBusinessReviewerFields];
      values.splice(i, 1);
      setDailyBusinessReviewerFields(values);
    } else {
      const values = [...projectReviewerFields];
      values.splice(i, 1);
      setProjectReviewerFields(values);
    }
  };

  const determineUserVariant = () => {
    if (user.isOwnerInSc(sc)) {
      return true;
    } else return false;
  };

  return (
    <Fragment>
      <div className={classes.dropdownContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Position</InputLabel>
          <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={position}
            onChange={handleChangePosition}
          >
            {mockPositions.map((pos, index) => (
              <MenuItem key={index} value={pos}>
                {pos}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Typography variant="h5" className={classes.header}>
        {intl.formatMessage({ id: 'scsheet.category.leistungen' })}
      </Typography>
      {/* CATEGORIES */}
      <Fragment>
        <Leistungen
          isEmployee={determineUserVariant()}
          dailyBusinessEmployeeFields={dailyBusinessEmployeeFields}
          dailyBusinessReviewerFields={dailyBusinessReviewerFields}
          handleChangePropKeyEmployee={handleChangePropKeyEmployee}
          handleChangePropKeyReviewer={handleChangePropKeyReviewer}
          removeFieldsEmployee={removeFieldsEmployee}
          removeFieldsReviewer={removeFieldsReviewer}
          addFieldsEmployee={addFieldsEmployee}
          addFieldsReviewer={addFieldsReviewer}
          projectEmployeeFields={projectEmployeeFields}
          projectReviewerFields={projectReviewerFields}
        />
        {/* Other categories as separated components */}
      </Fragment>
      <ButtonsBelowSheet
        handleSave={handleSave}
        handleSubmit={handleSubmit}
        sc={sc}
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScSheet)));
