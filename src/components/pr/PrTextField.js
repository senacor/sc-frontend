import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const styles = theme => ({
  disabled: {
    borderRadius: 4, //abgerundete Ecken
    border: '2px solid #b3c8cb', //Randfarbe und Dicke
    fontSize: 16,
    padding: '7pt 8pt', //schiebt Feldrand nach außen, erst oben, dann Seite, dadurch Randabstand
    textAlign: 'justify', //Blocksatz
    '&:focus': {
      //reinklicken
      borderColor: '#26646d', //Randfarbe beim reinklicken
      boxShadow: '0 0 0 0.2rem rgba(128,164,169,.25)' //Farbschattierung beim Reinklicken
    },
    marginLeft: -8,
    marginTop: -8
  },
  enabled: {
    borderRadius: 4, //abgerundete Ecken
    border: '2px solid #4d8087', //Randfarbe und Dicke
    fontSize: 16,
    padding: '7pt 8pt', //schiebt Feldrand nach außen, erst oben, dann Seite, dadurch Randabstand
    textAlign: 'justify', //Blocksatz
    '&:focus': {
      //reinklicken
      borderColor: '#26646d', //Randfarbe beim reinklicken
      boxShadow: '0 0 0 0.9rem rgba(128,164,169,.15)' //Farbschattierung beim Reinklicken
    },
    marginLeft: -8,
    marginTop: -8
  },
  readonly: {
    borderRadius: 4, //abgerundete Ecken
    border: '2px solid #b3c8cb', //Randfarbe und Dicke
    fontSize: 16,
    padding: '7pt 8pt', //schiebt Feldrand nach außen, erst oben, dann Seite, dadurch Randabstand
    textAlign: 'justify', //Blocksatz
    marginLeft: -8,
    marginTop: -8
  }
});

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
      classes
    } = this.props;

    let disabledTextField = value => {
      return (
        <TextField
          id={fieldId}
          multiline
          fullWidth
          disabled
          rows={startrows ? startrows : '4'}
          rowsMax="10"
          margin="normal"
          variant="outlined"
          label={label}
          InputProps={{
            disableUnderline: true,
            name: 'comment',
            classes: {
              input: classes.disabled
            }
          }}
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
          rows={startrows ? startrows : '4'}
          rowsMax="10"
          variant="outlined"
          margin="normal"
          label={label}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.enabled
            }
          }}
          value={value}
          onChange={onChange}
          helperText={helperText}
        />
      );
    };

    let readOnlyField = value => {
      return (
        <TextField
          id={fieldId}
          multiline
          fullWidth
          rows={startrows ? startrows : '4'}
          rowsMax="10"
          margin="normal"
          variant="outlined"
          label={label}
          InputProps={{
            disableUnderline: true,
            classes: {
              input: classes.readonly
            },
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
      case isActionPerformer && !openEditing:
        return disabledTextField('');
      case readOnlyFlag && readOnlyText === null:
        return disabledTextField('');
      case isActionPerformer && readOnlyFlag:
        return readOnlyField(readOnlyText);
      case nonActionPerformer && readOnlyFlag:
        return readOnlyField(readOnlyText);
      case isActionPerformer && openEditing && !readOnlyFlag:
        return enabledTextField(writeableText);
      default:
        return null;
    }
  }
}

PrTextField.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrTextField);
