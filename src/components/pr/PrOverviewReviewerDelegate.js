import React from 'react';
import * as actions from '../../actions';
import EmployeeSearchDialog from '../employeeSearch/EmployeeSearchDialog';
import { connect } from 'react-redux';
import PrStatusActionButton from './prDetail/PrStatusActionButton';

export class PrOverviewReviewerDelegate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPr: props.prId,
      open: false
    };
  }

  addReviewer = prId => () => {
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
    let { prId } = this.props;
    return (
      <div>
        <PrStatusActionButton
          label={'DELEGIEREN'}
          releaseButtonClick={this.addReviewer(prId)}
        />

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
export default connect(
  state => ({}),
  {
    delegateReviewer: actions.delegateReviewer
  }
)(PrOverviewReviewerDelegate);
