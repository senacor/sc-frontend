import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import classNames from 'classnames';

import PropTypes from 'prop-types';

const styles = theme => ({
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '3pt 3pt',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  comment: {
    color: theme.palette.primary['400'],
    fontStyle: 'italic'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
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
      classes
    } = this.props;

    let disabledTextField = value => {
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id={fieldId}
            multiline
            fullWidth
            disabled
            rows="4"
            rowsMax="10"
            margin="normal"
            variant="outlined"
            label={label}
            InputProps={{
              disableUnderline: true,
              name: 'comment',
              classes: {
                input: classes.bootstrapInput
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
            className={classes.textField}
            value={value}
            helperText={helperText}
          />
        </form>
      );
    };

    let enabledTextField = value => {
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id={fieldId}
            multiline
            fullWidth
            rows="4"
            rowsMax="10"
            margin="dense"
            variant="outlined"
            label={label}
            InputProps={{
              disableUnderline: true,
              name: 'comment',
              classes: {
                input: classes.bootstrapInput
              }
            }}
            InputLabelProps={{
              shrink: true
            }}
            className={classNames(classes.textField, classes.dense)}
            value={value}
            onChange={onChange}
            helperText={helperText}
          />
        </form>
      );
    };

    let readOnlyField = value => {
      return (
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id={fieldId}
            multiline
            fullWidth
            rows="4"
            rowsMax="10"
            margin="normal"
            variant="outlined"
            label={label}
            InputProps={{
              disableUnderline: true,
              name: 'comment',
              classes: {
                input: classes.bootstrapInput
              },
              readOnly: true
            }}
            InputLabelProps={{
              shrink: true
            }}
            className={classes.textField}
            value={value}
            onChange={onChange}
            helperText={helperText}
          />
        </form>
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
