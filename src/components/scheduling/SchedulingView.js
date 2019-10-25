import React, { useContext, useEffect, useState } from 'react';
import MeetingDetailsView from './MeetingDetailsView';
import MeetingCreator from './MeetingCreator';
import { prStatusEnum } from '../../helper/prStatus';
import { injectIntl } from 'react-intl';
import {
  MeetingContext,
  UserinfoContext,
  PrContext
} from '../App';
import { addPrStatus } from '../../calls/pr';
import { useErrorContext } from '../../helper/contextHooks';

const SchedulingView = ({ pr, intl }) => {
  const { userroles, userinfo } = useContext(UserinfoContext.context).value;
  const { setValue: setPr } = useContext(PrContext.context);
  const error = useErrorContext();

  const { value: meeting } = useContext(MeetingContext.context);
  const [canRequestMeeting, setCanRequestMeeting] = useState(false);

  useEffect(
    () => {
      if (
        meeting.status === 'DECLINED' ||
        (meeting.status === 'NOT_REQUESTED' &&
          !pr.statusSet.includes(prStatusEnum.FINALIZED_REVIEWER))
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
          pr={pr}
        />
      ) : (
        <MeetingDetailsView
          pr={pr}
          userinfo={userinfo}
          userroles={userroles}
          click={() =>
            addPrStatus(pr, prStatusEnum.FIXED_DATE, setPr, error)
          }
          handleChange={() => handleChange()}
        />
      )}
    </div>
  );
};

export default injectIntl(SchedulingView);