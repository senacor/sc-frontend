import React, { useContext, useEffect, useState } from 'react';
import * as actions from '../../../actions';
import { connect } from 'react-redux';
import { isLoading } from '../../../reducers/selector';
import { StyledComponent as MeetingDetailsView } from './MeetingDetailsView';
import MeetingCreator from '../../scheduling/MeetingCreator';
import { prStatusEnum } from '../../../helper/prStatus';
import { injectIntl } from 'react-intl';
import { MeetingContext, UserinfoContext } from '../../App';

const SchedulingView = ({ pr, addPrStatus, intl }) => {
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;

  const { value: meeting, setValue: setMeeting } = useContext(
    MeetingContext.context
  );
  const [canRequestMeeting, setCanRequestMeeting] = useState(false);

  useEffect(() => {
    if (
      meeting.status === 'DECLINED' ||
      (meeting.status === 'NOT_REQUESTED' &&
        !pr.statuses.includes(prStatusEnum.FINALIZED_REVIEWER))
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
        <MeetingCreator
          handleChange={() => handleChange()}
          intl={intl}
          pr={pr}
        />
      ) : (
        <MeetingDetailsView
          pr={pr}
          userinfo={userinfo}
          userroles={userroles}
          click={() => addPrStatus(pr, prStatusEnum.FIXED_DATE)}
          handleChange={() => handleChange()}
        />
      )}
    </div>
  );
};

export default injectIntl(
  connect(
    state => ({
      isLoading: isLoading(state)
    }),
    {
      addPrStatus: actions.addPrStatus
    }
  )(SchedulingView)
);
