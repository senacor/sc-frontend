import React, { useContext, useEffect, useState } from 'react';
import MeetingDetailsView from './MeetingDetailsView';
import MeetingCreator from './MeetingCreator';
import { injectIntl } from 'react-intl';
import { MeetingContext, UserinfoContext } from '../App';

const SchedulingView = ({ sc, intl }) => {
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;

  const { value: meeting } = useContext(MeetingContext.context);
  const [canRequestMeeting, setCanRequestMeeting] = useState(false);

  useEffect(
    () => {
      if (
        meeting.status === 'DECLINED' ||
        (meeting.status === 'NOT_REQUESTED' &&
          //TODO: use constants
          !sc.statusSet.includes('SC_COMPLETED'))
      ) {
        setCanRequestMeeting(true);
      } else {
        setCanRequestMeeting(false);
      }
    },
    [meeting]
  );

  const handleChange = () => {
    setCanRequestMeeting(!canRequestMeeting);
  };

  return (
    <div id={'outer'}>
      {canRequestMeeting ? (
        <MeetingCreator
          handleChange={() => handleChange()}
          intl={intl}
          sc={sc}
        />
      ) : (
        <MeetingDetailsView
          sc={sc}
          userinfo={userinfo}
          userroles={userroles}
          click={() => {
            console.log('HOTOVO');
          }}
          handleChange={() => handleChange()}
        />
      )}
    </div>
  );
};

export default injectIntl(SchedulingView);
