import React from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import {
  getPrDetail,
  getMeeting,
  isLoading,
  getUserinfo,
  getUserroles
} from '../../../reducers/selector';
import { StyledComponent as MeetingDetailsView } from './MeetingDetailsView';
import MeetingCreator from '../../scheduling/MeetingCreator';
import { prStatusEnum } from '../../../helper/prStatus';

export class SchedulingView extends React.Component {
  render() {
    const { meeting, prDetail } = this.props;
    return (
      <div id={'outer'}>
        {meeting == null &&
        prDetail &&
        !prDetail.statuses.includes(prStatusEnum.FIXED_DATE) ? (
          this.props.prDetail && (
            <MeetingCreator prDetail={this.props.prDetail} />
          )
        ) : (
          <MeetingDetailsView
            meeting={this.props.meeting}
            pr={this.props.prDetail}
            userinfo={this.props.userinfo}
            userroles={this.props.userroles}
            click={() =>
              this.props.addPrStatus(
                this.props.prDetail,
                prStatusEnum.FIXED_DATE
              )
            }
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    prDetail: getPrDetail()(state),
    meeting: getMeeting(state),
    isLoading: isLoading(state),
    userinfo: getUserinfo(state),
    userroles: getUserroles(state)
  }),
  {
    fetchMeeting: actions.fetchMeeting,
    addPrStatus: actions.addPrStatus
  }
)(SchedulingView);
