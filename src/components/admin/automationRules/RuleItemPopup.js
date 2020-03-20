import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  ...theme.styledComponents,
  box: {
    display: 'flex',
    padding: 2 * theme.spacing.unit,
    flexDirection: 'column'
  },
  btn: {
    marginTop: 3 * theme.spacing.unit
  },
  textInput: {
    marginTop: 1 * theme.spacing.unit
  },
  dayLabel: {
    marginTop: 2 * theme.spacing.unit
  },
  title: {
    marginBottom: 2 * theme.spacing.unit,
    fontSize: '1rem'
  },
  textInfoUnderlined: {
    color: theme.palette.primary[700],
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.secondary.darkBlue
    }
  }
});

const RuleItemPopup = ({
  classes,
  intl,
  component,
  textType,
  editRule,
  defaultValue
}) => {
  const [opened, setOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(true);

  //validation
  useEffect(
    () => {
      //validation off for dates
      if (!textType) {
        setValid(true);
        return;
      }
      //text validation
      setValid(
        value != null && value.length > 0 && value.replace(/ /g, '').length > 0
      );
    },
    [value]
  );

  const handleOpen = event => {
    setOpened(true);
    setAnchorEl(event.currentTarget);
    setValue(defaultValue);
    event.stopPropagation();
  };

  const handleClose = event => {
    setOpened(false);
    setAnchorEl(null);
    event.stopPropagation();
  };

  const [month, setMonth] = React.useState(1);

  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let daysMenu = [];
  for (let i = 1; i <= daysInMonths[month - 1]; i++) {
    daysMenu.push(i);
  }
  const monthsMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const onTextChanged = event => {
    setValue(event.target.value);
  };

  const onDayChanged = event => {
    const ruleDateMonth = parseInt(value.split('-')[1], []);
    setValue(event.target.value + '-' + ruleDateMonth);
  };

  const onMonthChanged = event => {
    setMonth(event.target.value);
    setValue('1-' + event.target.value);
  };

  const saveValue = event => {
    editRule(value);
    handleClose(event);
  };

  const convertDayFormat = ruleDate => {
    const ruleDateDay = parseInt(ruleDate.split('-')[0], []);
    const ruleDateMonth = parseInt(ruleDate.split('-')[1], []);
    return (
      ruleDateDay +
      '. ' +
      intl.formatMessage({ id: 'autorules.month.' + ruleDateMonth })
    );
  };

  const renderDatePicker = () => {
    const dayValue = parseInt(value.split('-')[0], []);
    const monthValue = parseInt(value.split('-')[1], []);
    return (
      <Fragment>
        <Typography>{intl.formatMessage({ id: 'autorules.month' })}</Typography>
        <FormControl className={classes.formControl}>
          <Select value={monthValue} onChange={onMonthChanged}>
            {monthsMenu.map((month, index) => (
              <MenuItem key={Math.random()} value={month}>
                {intl.formatMessage({ id: 'autorules.month.' + month })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography className={classes.dayLabel}>
          {intl.formatMessage({ id: 'autorules.day' })}
        </Typography>
        <FormControl className={classes.formControl}>
          <Select value={dayValue} onChange={onDayChanged}>
            {daysMenu.map(i => (
              <MenuItem key={Math.random()} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Fragment>
    );
  };

  const renderTextField = () => {
    return (
      <TextField
        onChange={onTextChanged}
        className={classes.textInput}
        id="outlined-basic"
        variant="outlined"
        autoFocus={true}
        value={value}
      />
    );
  };

  return (
    <Fragment>
      <div onClick={handleOpen}>
        <Typography className={classes.textInfoUnderlined}>
          {textType ? defaultValue : convertDayFormat(defaultValue)}
        </Typography>
      </div>
      <Popover anchorEl={anchorEl} open={opened} onClose={handleClose}>
        <div className={classes.box}>
          <Typography className={classes.title}>Bewertungszeitraum</Typography>
          {textType ? renderTextField() : renderDatePicker()}
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            disabled={!valid}
            onClick={saveValue}
          >
            {intl.formatMessage({ id: 'autorules.save' })}
          </Button>
        </div>
      </Popover>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(RuleItemPopup));
