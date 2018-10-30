import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

class PrTextField extends Component {
  render() {
    const {
      isActionPerformer,
      nonActionPerformer,
      openEditing,
      readOnlyFlag,
      readOnlyText,
      writeableText,
      helperText,
      onChange,
      fieldId,
      label,
      startrows,
      errorFlag,
      required
    } = this.props;

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
          helperText={
            'Error: Bitte fülle das Pflichtfeld aus, bevor du das PR freigibst.'
          }
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

    switch (true) {
      case nonActionPerformer && !readOnlyFlag:
        return disabledTextField('');
      case isActionPerformer && !openEditing && !readOnlyFlag:
        return disabledTextField('');
      case isActionPerformer && readOnlyFlag && readOnlyText === null:
        return disabledTextField('');
      case nonActionPerformer && readOnlyFlag && readOnlyText === null:
        return disabledTextField('');
      case isActionPerformer && readOnlyFlag && readOnlyText === '':
        return disabledTextField('');
      case nonActionPerformer && readOnlyFlag && readOnlyText === '':
        return disabledTextField('');
      case isActionPerformer && readOnlyFlag:
        return readOnlyField(readOnlyText);
      case nonActionPerformer && readOnlyFlag:
        return readOnlyField(readOnlyText);
      case isActionPerformer &&
        openEditing &&
        !readOnlyFlag &&
        errorFlag &&
        writeableText !== null &&
        writeableText !== '':
        return enabledTextField(writeableText);
      case isActionPerformer && openEditing && !readOnlyFlag && errorFlag:
        return errorTextField(writeableText);
      case isActionPerformer && openEditing && !readOnlyFlag && !errorFlag:
        return enabledTextField(writeableText);
      default:
        return null;
    }
  }
}

export default PrTextField;
