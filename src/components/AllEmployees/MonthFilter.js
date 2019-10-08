import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { IconButton, Grid, Typography, withStyles } from '@material-ui/core';
import { months } from '../../helper/filterData';
import { injectIntl } from 'react-intl';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

const styles = theme => ({
  expansionFilter: {
    display: 'block'
  },
  inputForFormer: {
    width: 105,
    margin: 2 * theme.spacing.unit
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

const MonthFilter = ({ month, year, handleChange, classes, intl }) => {
  return (
    <div className={classes.expansionFilter}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-month">
          {intl.formatMessage({ id: 'filter.month' })}
        </InputLabel>
        <Select
          value={`${month}/${year}`}
          onChange={handleChange}
          input={<Input id="select-month" className={classes.inputForFormer} />}
          renderValue={selected => (
            <div className={classes.chips}>{`${selected.length} items`}</div>
          )}
        >
          <Grid container style={{ textAlign: 'center' }}>
            <Grid xs={3}>
              <IconButton>
                <ArrowBack />
              </IconButton>
            </Grid>
            <Grid xs={6}>
              <Typography>YEAR</Typography>
            </Grid>
            <Grid xs={3}>
              <IconButton>
                <ArrowForward />
              </IconButton>
            </Grid>
          </Grid>
          {months.map(month => (
            <MenuItem key={month} value={month}>
              <Checkbox checked={false} />
              <ListItemText primary={month} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default injectIntl(withStyles(styles)(MonthFilter));
