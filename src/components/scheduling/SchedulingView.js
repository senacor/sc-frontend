import React from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { getPrDetail, getMeeting } from '../../reducers/selector';
import { StyledComponent as MeetingDetailsView } from './MeetingDetailsView';
import MeetingCreator from './MeetingCreator';
import withLoading from '../hoc/Loading';

export class SchedulingView extends React.Component {
  // componentDidMount() {
  //   this.props.fetchPrById(this.props.match.params.id).then(() => {
  //     this.props.fetchMeeting(this.props.prDetail);
  //   });
  // }

  componentDidMount() {
    this.props.fetchMeeting(this.props.prDetail);
  }

  render() {
    const { meeting } = this.props;
    return (
      <div id={'outer'}>
        {meeting == null ? (
          <MeetingCreator prDetail={this.props.prDetail} />
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
    fetchMeeting: actions.fetchMeeting,
    fetchPrById: actions.fetchPrById
  }
  // )(SchedulingView);
)(
  withLoading(props => props.fetchPrById(props.match.params.id))(SchedulingView)
);
