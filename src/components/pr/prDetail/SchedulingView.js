import React, { useEffect, useState } from 'react';
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
import { injectIntl } from 'react-intl';

const SchedulingView = ({
  meeting,
  prDetail,
  userinfo,
  userroles,
  addPrStatus,
  intl
}) => {
  const [canRequestMeeting, setCanRequestMeeting] = useState(false);

  useEffect(() => {
    if (
      meeting.status === 'DECLINED' ||
      (meeting.status === 'NOT_REQUESTED' &&
        !prDetail.statuses.includes(prStatusEnum.FINALIZED_REVIEWER))
    ) {
      setCanRequestMeeting(true);
    } else {
      setCanRequestMeeting(false);
    }
  }, []);

  const handleChange = () => {
    setCanRequestMeeting(!canRequestMeeting);
  };

  return (
    <div id={'outer'}>
      {canRequestMeeting ? (
        <MeetingCreator handleChange={() => handleChange()} intl={intl} />
      ) : (
        <MeetingDetailsView
          meeting={meeting}
          pr={prDetail}
          userinfo={userinfo}
          userroles={userroles}
          click={() => addPrStatus(prDetail, prStatusEnum.FIXED_DATE)}
          handleChange={() => handleChange()}
        />
      )}
    </div>
  );
};

export default injectIntl(
  connect(
    state => ({
      prDetail: getPrDetail()(state),
      meeting: getMeeting(state),
      isLoading: isLoading(state),
      userinfo: getUserinfo(state),
      userroles: getUserroles(state)
    }),
    {
      addPrStatus: actions.addPrStatus
    }
  )(SchedulingView)
);
