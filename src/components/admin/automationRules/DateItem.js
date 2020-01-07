import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  text: {
    display: 'inline-block',
    position: 'relative',
    top: 13
  },
  rightMenu: {
    width: '100%',
    display: 'block',
    textAlign: 'right'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  btnDelete: {
    backgroundColor: theme.palette.secondary.darkRed,
    color: theme.palette.secondary.white
  }
});

export const DateItem = ({ classes, intl, ruleDate, onDelete, modifyDate }) => {
  const ruleDateDay = parseInt(ruleDate.split('-')[0]);
  const ruleDateMonth = parseInt(ruleDate.split('-')[1]);

  const [month, setMonth] = React.useState(ruleDateMonth);
  const [day, setDay] = React.useState(ruleDateDay);

  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let daysMenu = [];
  for (let i = 1; i <= daysInMonths[month - 1]; i++) {
    daysMenu.push(i);
  }
  const monthsMenu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const onDayChanged = event => {
    setDay(event.target.value);
    modifyDate(event.target.value + '-' + month);
  };

  const onMonthChanged = event => {
    setMonth(event.target.value);
    setDay(1);
    modifyDate('1-' + event.target.value);
  };

  return (
    <Fragment>
      <Grid item sm={8}>
        <Typography variant="body1" className={classes.text}>
          {intl.formatMessage({ id: 'autorules.day' })}:
        </Typography>
        <FormControl className={classes.formControl}>
          <Select value={day} onChange={onDayChanged}>
            {daysMenu.map(i => (
              <MenuItem key={Math.random()} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="body1" className={classes.text}>
          {intl.formatMessage({ id: 'autorules.month' })}:
        </Typography>
        <FormControl className={classes.formControl}>
          <Select value={month} onChange={onMonthChanged}>
            {monthsMenu.map((month, index) => (
              <MenuItem key={Math.random()} value={month}>
                {intl.formatMessage({ id: 'autorules.month.' + month })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid className={classes.rightMenu}>
        <Button
          variant="contained"
          className={classes.btnDelete}
          onClick={onDelete}
        >
          <DeleteIcon />
          {intl.formatMessage({
            id: 'autorules.delete'
          })}
        </Button>
      </Grid>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(DateItem));
