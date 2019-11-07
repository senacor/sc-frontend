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
import { IconButton, Tooltip, Typography } from '@material-ui/core';

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
  addProjectButton: {
    color: theme.palette.secondary.yellow
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
  const [scDailyBusinessFields, setScDailyBusinessFields] = useState([]);
  const [scProjectFields, setScProjectFields] = useState([]);

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

  const handleChangePropKey = (type, i, propKey, event) => {
    if (type === 'dailyBusiness') {
      const values = [...scDailyBusinessFields];
      values[i][propKey] = event.target.value;
      setScDailyBusinessFields(values);
    } else {
      const values = [...scProjectFields];
      values[i][propKey] = event.target.value;
      setScProjectFields(values);
    }
  };

  const addFields = type => {
    const initialFieldsData = {
      headline: '',
      weight: undefined,
      percentage: undefined,
      evaluation: undefined,
      description: '',
      goal: '',
      goalComment: ''
    };
    if (type === 'dailyBusiness') {
      const values = [...scDailyBusinessFields];
      values.push(initialFieldsData);
      setScDailyBusinessFields(values);
    } else {
      const values = [...scProjectFields];
      values.push(initialFieldsData);
      setScProjectFields(values);
    }
  };

  const removeFields = (type, i) => {
    if (type === 'dailyBusiness') {
      const values = [...scDailyBusinessFields];
      values.splice(i, 1);
      setScDailyBusinessFields(values);
    } else {
      const values = [...scProjectFields];
      values.splice(i, 1);
      setScProjectFields(values);
    }
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
        fields={scDailyBusinessFields}
        type={'dailyBusiness'}
        handleChange={handleChangePropKey}
        removeFields={removeFields}
      />
      <Tooltip
        title={intl.formatMessage({
          id: 'scsheet.tooltip.addField.dailyBusiness'
        })}
      >
        <IconButton onClick={() => addFields('dailyBusiness')}>
          <AddIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ScFields
        fields={scProjectFields}
        type={'project'}
        handleChange={handleChangePropKey}
        removeFields={removeFields}
      />
      <Tooltip
        title={intl.formatMessage({ id: 'scsheet.tooltip.addField.project' })}
      >
        <IconButton onClick={() => addFields('project')}>
          <AddIcon className={classes.addProjectButton} />
        </IconButton>
      </Tooltip>
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
