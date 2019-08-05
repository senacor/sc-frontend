import React from 'react';

import TextField from '@material-ui/core/TextField';

import { textFieldEnum } from '../../helper/textFieldEnum';
import { injectIntl } from 'react-intl';

//TODO: We dont need this component anymore, DELETE ?
const PrTextField = ({
  helperText,
  onChange,
  fieldId,
  label,
  startrows,
  required,
  state,
  value,
  intl
}) => {
  let disabledTextField = value => {
    return (
      <TextField
        id={fieldId}
        multiline
        fullWidth
        disabled
        required={required}
        rows={startrows ? startrows : '6'}
        rowsMax="10"
        margin="normal"
        variant="outlined"
        label={label}
        value={value}
        helperText={helperText}
      />
    );
  };

  let enabledTextField = value => {
    return (
      <TextField
        id={fieldId}
        multiline
        fullWidth
        required={required}
        rows={startrows ? startrows : '6'}
        rowsMax="10"
        variant="outlined"
        margin="normal"
        label={label}
        value={value}
        onChange={onChange}
        helperText={helperText}
      />
    );
  };

  let errorTextField = value => {
    return (
      <TextField
        error
        id={fieldId}
        multiline
        fullWidth
        required={required}
        rows={startrows ? startrows : '6'}
        rowsMax="10"
        variant="outlined"
        margin="normal"
        label={label}
        value={value}
        onChange={onChange}
        helperText={intl.formatMessage({
          id: 'prtextfield.error'
        })}
      />
    );
  };

  let readOnlyField = value => {
    return (
      <TextField
        id={fieldId}
        multiline
        fullWidth
        required={required}
        rows={startrows ? startrows : '6'}
        rowsMax="10"
        margin="normal"
        variant="outlined"
        label={label}
        InputProps={{
          readOnly: true
        }}
        value={value}
        onChange={onChange}
        helperText={helperText}
      />
    );
  };

  switch (state) {
    case textFieldEnum.ENABLED:
      return enabledTextField(value);
    case textFieldEnum.DISABLED:
      return disabledTextField(value);
    case textFieldEnum.READONLY:
      return readOnlyField(value);
    case textFieldEnum.ERROR:
      return errorTextField(value);
    default:
      return null;
  }
};

export default injectIntl(PrTextField);
