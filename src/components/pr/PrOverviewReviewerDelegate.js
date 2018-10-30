import React from 'react';
import Button from '@material-ui/core/Button/Button';
import * as actions from '../../actions';
import EmployeeSearchDialog from '../employeeSearch/EmployeeSearchDialog';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  button: {
    padding: '0px 0px'
  }
});

export class PrOverviewReviewerDelegate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPr: props.prId,
      open: false
    };
  }

  addReviewer = prId => {
    this.handleClickOpen();
    this.setState({
      currentPr: prId
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectEmployee = employee => {
    this.handleClose();
    this.props.delegateReviewer(this.state.currentPr, employee.id);
  };

  render() {
    let { classes, prId } = this.props;
    return (
      <div>
        <Button
          id={'DelegateButton'}
          color="primary"
          className={classes.button}
          onClick={() => {
            this.addReviewer(prId);
          }}
        >
          DELEGIEREN
        </Button>
        <EmployeeSearchDialog
          open={this.state.open}
          handleClose={this.handleClose}
          selectEmployee={this.selectEmployee}
          title={'Delegieren an'}
        />
      </div>
    );
  }
}
export const StyledComponent = withStyles(styles)(PrOverviewReviewerDelegate);

export default connect(
  state => ({}),
  {
    delegateReviewer: actions.delegateReviewer
  }
)(StyledComponent);
