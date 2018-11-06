import React from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { getPrDetail, getMeeting } from '../../../reducers/selector';
import { StyledComponent as MeetingDetailsView } from './MeetingDetailsView';
import MeetingCreator from '../../scheduling/MeetingCreator';

export class SchedulingView extends React.Component {
  render() {
    const { meeting } = this.props;
    return (
      <div id={'outer'}>
        {meeting == null ? (
          this.props.prDetail && (
            <MeetingCreator prDetail={this.props.prDetail} />
          )
        ) : (
          <MeetingDetailsView meeting={this.props.meeting} />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    prDetail: getPrDetail()(state),
    meeting: getMeeting(state),
    isLoading: state.isLoading
  }),
  {
    fetchMeeting: actions.fetchMeeting
  }
)(SchedulingView);