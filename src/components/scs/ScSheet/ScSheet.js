import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScFields from './ScFields';

// Material UI
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { IconButton, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';

const styles = theme => ({
  header: {
    background: theme.palette.secondary.darkGreen,
    color: theme.palette.contrastText,
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    borderRadius: 3
  },
  btnContainer: {
    textAlign: 'right'
  },
  formControl: {
    minWidth: 180
  },
  dropdownContainer: {
    textAlign: 'center'
  }
});

const ScSheet = ({ sc, classes, intl }) => {
  const [position, setPosition] = useState('');
  const [scFields, setScFields] = useState([]);

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

  const handleChangePosition = event => {
    setPosition(event.target.value);
  };

  const handleChangeHeadline = (i, event) => {
    const values = [...scFields];
    values[i].headline = event.target.value;
    setScFields(values);
  };

  const handleChangeWeight = (i, event) => {
    const values = [...scFields];
    values[i].weight = event.target.value;
    setScFields(values);
  };

  const handleChangePercentage = (i, event) => {
    const values = [...scFields];
    values[i].percentage = event.target.value;
    setScFields(values);
  };

  const handleChangeEvaluation = (i, event) => {
    const values = [...scFields];
    values[i].evaluation = event.target.value;
    setScFields(values);
  };

  const handleChangeDescription = (i, event) => {
    const values = [...scFields];
    values[i].description = event.target.value;
    setScFields(values);
  };

  const handleChangeGoal = (i, event) => {
    const values = [...scFields];
    values[i].goal = event.target.value;
    setScFields(values);
  };

  const handleChangeGoalComment = (i, event) => {
    const values = [...scFields];
    values[i].goalComment = event.target.value;
    setScFields(values);
  };

  const addFields = () => {
    const initialFieldsData = {
      headline: '',
      weight: undefined,
      percentage: undefined,
      evaluation: undefined,
      description: '',
      goal: '',
      goalComment: ''
    };
    const values = [...scFields];
    values.push(initialFieldsData);
    setScFields(values);
  };

  const removeFields = i => {
    const values = [...scFields];
    values.splice(i, 1);
    setScFields(values);
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
      <ScFields
        fields={scFields}
        changeHeadline={handleChangeHeadline}
        changeWeight={handleChangeWeight}
        changePercentage={handleChangePercentage}
        changeEvaluation={handleChangeEvaluation}
        changeDescription={handleChangeDescription}
        changeGoal={handleChangeGoal}
        changeGoalComment={handleChangeGoalComment}
        removeFields={removeFields}
      />
      <IconButton onClick={addFields}>
        <AddIcon color="primary" />
      </IconButton>
      <div className={classes.btnContainer}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {intl.formatMessage({
            id: 'scsheet.submit'
          })}
        </Button>
      </div>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScSheet)));
