import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { injectIntl } from 'react-intl';

const PrTextField = ({
  label,
  helperText,
  text,
  isReadOnly,
  isError,
  action,
  rows,
  intl
}) => {
  if (isError) {
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {label}
        </Grid>
        <Grid item xs={12}>
          <TextField
            error
            multiline
            rows={rows ? rows : '6'}
            rowsMax="10"
            fullWidth
            variant="outlined"
            inputProps={{ 'aria-label': 'bare' }}
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
            multiline
            rows={rows ? rows : '6'}
            rowsMax="10"
            fullWidth
            variant="outlined"
            inputProps={{ 'aria-label': 'bare', readOnly: true }}
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
            multiline
            rows={rows ? rows : '6'}
            rowsMax="10"
            fullWidth
            variant="outlined"
            inputProps={{ 'aria-label': 'bare' }}
            helperText={helperText}
            defaultValue={text}
            onChange={event => action(event.target.value)}
          />
        </Grid>
      </Grid>
    );
  }
};

export default injectIntl(PrTextField);
