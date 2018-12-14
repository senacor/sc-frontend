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
import { isHr } from '../../../helper/checkRole';

export class SchedulingView extends React.Component {
  constructor(props) {
    super(props);
    if (isHr(this.props.userroles)) {
      console.log('isHr');
      this.state = {
        canRequestMeeting: false
      };
    } else if (
      this.props.meeting.status === 'DECLINED' ||
      (this.props.meeting.status === 'NOT_REQUESTED' &&
        !this.props.prDetail.statuses.includes(prStatusEnum.FINALIZED_REVIEWER))
    ) {
      console.log(this.props.meeting.status);
      this.state = {
        canRequestMeeting: true
      };
    } else {
      console.log('else');
      console.log(this.props.meeting.status);
      console.log(
        !this.props.prDetail.statuses.includes(prStatusEnum.FINALIZED_REVIEWER)
      );
      this.state = {
        canRequestMeeting: false
      };
    }
  }

  handleChange = () => {
    this.state.canRequestMeeting
      ? this.setState({ canRequestMeeting: false })
      : this.setState({ canRequestMeeting: true });
  };

  render() {
    return (
      <div id={'outer'}>
        {this.state.canRequestMeeting ? (
          <MeetingCreator handleChange={() => this.handleChange()} />
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
            handleChange={() => this.handleChange()}
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
