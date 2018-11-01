import React from 'react';
import * as actions from '../../actions';
import EmployeeSearchDialog from '../employeeSearch/EmployeeSearchDialog';
import { connect } from 'react-redux';
import PrStatusActionButton from './prDetail/PrStatusActionButton';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import EmployeeSearch from '../employeeSearch/EmployeeSearch';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Dialog from '@material-ui/core/Dialog/Dialog';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Icon from '@material-ui/core/Icon/Icon';

const styles = {
  button: {
    padding: '0px 0px'
  },
  errorMessage: {
    color: '#ff0000'
  }
};

export class PrOverviewReviewerDelegate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPr: props.prId,
      open: false,
      errorMessage: ''
    };
  }

  selectEmployee = employee => {
    this.props.onSelectEmployee(employee);
  };

  render() {
    let { employeeName, classes } = this.props;
    return (
      <EmployeeSearch
        employeeSearchValue={employeeName}
        selectEmployee={this.selectEmployee}
        inputElement={(value, onChange) => (
          <TextField
            id="adornment-filter"
            label="Name"
            value={value}
            onChange={onChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon id="adornmentIcon">edit</Icon>
                </InputAdornment>
              ),
              name: 'employeeSearchValue',
              shrink: true
            }}
          />
        )}
      />
    );
  }
}
const StyledComponent = withStyles(styles)(PrOverviewReviewerDelegate);

export default connect(
  state => ({}),
  {
    delegateReviewer: actions.delegateReviewer,
    stackedAction: actions.stackedAction
  }
)(StyledComponent);
