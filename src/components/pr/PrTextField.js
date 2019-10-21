import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  error: {
    color: theme.palette.secondary.darkRed
  },
  notchedOutline: {
    border: '2px solid black !important'
  }
});

const PrTextField = ({
  classes,
  label,
  helperText,
  text,
  isReadOnly,
  isError,
  action,
  rows,
  printMode,
  intl
}) => {
  const rowsPros = printMode
    ? {}
    : {
        rows: rows ? rows : '6',
        rowsMax: '10'
      };
  if (isError) {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12} className={classes.error}>
          {label}
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={'printChangeToDiv'}
            error
            multiline
            {...rowsPros}
            fullWidth
            variant="outlined"
            helperText={intl.formatMessage({
              id: 'prtextfield.error'
            })}
            defaultValue={text}
            onChange={event => action(event.target.value)}
          />
        </Grid>
      </Grid>
    );
  } else if (isReadOnly) {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {label}
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={'printChangeToDiv'}
            disabled
            multiline
            {...rowsPros}
            fullWidth
            variant="outlined"
            helperText={helperText}
            defaultValue={text}
            onChange={event => action(event.target.value)}
          />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {label}
        </Grid>
        <Grid item xs={12}>
          <TextField
            className={'printChangeToDiv'}
            multiline
            {...rowsPros}
            fullWidth
            variant="outlined"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline
              }
            }}
            helperText={helperText}
            defaultValue={text}
            onChange={event => action(event.target.value)}
          />
        </Grid>
      </Grid>
    );
  }
};

export default injectIntl(withStyles(styles)(PrTextField));
