import { prStatusEnum } from '../helper/prStatus';
import { isHr } from '../helper/checkRole';
import { hasRoleInPrBasedOnUserName } from '../helper/hasRoleInPr';

class MeetingDetailVisibilityService {
  constructor(
    pr = { statuses: [] },
    userroles = [],
    userinfo = {},
    meeting = null
  ) {
    this.pr = pr;
    this.userroles = userroles;
    this.userinfo = userinfo;
    this.meeting = meeting;
  }

  setMeeting = meeting => {
    this.meeting = meeting;
  };

  setPr = pr => {
    this.pr = pr;
  };

  setUserinfo = userinfo => {
    this.userinfo = userinfo;
  };

  setUserroles = userroles => {
    this.userroles = userroles;
  };

  emailToLogin = email => {
    return email.replace('@senacor.com', '');
  };

  findMeetingStateOfSelf = (userinfo, meeting) => {
    return Object.keys(meeting.requiredAttendees).map(employee => {
      let email = meeting.requiredAttendees[employee].email;
      let status = meeting.requiredAttendees[employee].status;
      if (userinfo.userPrincipalName === this.emailToLogin(email)) {
        return status;
      }
      return null;
    });
  };

  findAllMeetingStatesOfRequired = meeting => {
    return Object.keys(meeting.requiredAttendees).map(employee => {
      return meeting.requiredAttendees[employee].status;
    });
  };

  execute() {
    let { pr, userroles, userinfo, meeting } = this;

    let evaluation = {
      pleaseAccept: false,
      jump: false,
      hrInfoNotAccepted: false,
      hrInfoNotSent: false,
      evaluationExternal: false,
      readOnly: false,
      action: false
    };

    let meetingRequestSent = pr.statuses.includes(prStatusEnum.REQUESTED_DATE);
    let findMeetingFinished = pr.statuses.includes(prStatusEnum.FIXED_DATE);
    let isHrMember = isHr(userroles);
    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
    let canMakeAction = hasRoleInPr(['supervisor', 'reviewer', 'employee']);
    let bothFilledInFirstStep =
      pr.statuses.includes(prStatusEnum.RELEASED_SHEET_REVIEWER) &&
      pr.statuses.includes(prStatusEnum.RELEASED_SHEET_EMPLOYEE);
    let meetingStateOfSelf = meeting
      ? this.findMeetingStateOfSelf(userinfo, meeting)
      : ['UNKNOWN'];
    let meetingStateOfSelfUnknown = meetingStateOfSelf.includes('UNKNOWN');
    let notAllRequiredAttendeesHaveAccepted = meeting
      ? this.findAllMeetingStatesOfRequired(meeting).includes('UNKNOWN')
      : true;

    if (
      meetingRequestSent &&
      !findMeetingFinished &&
      meetingStateOfSelfUnknown &&
      canMakeAction
    ) {
      evaluation.pleaseAccept = true;
    }
    if (bothFilledInFirstStep && !findMeetingFinished && canMakeAction) {
      evaluation.jump = true;
    }
    if (meetingRequestSent && !findMeetingFinished && isHrMember) {
      evaluation.hrInfoNotAccepted = true;
    }
    if (!meetingRequestSent && !findMeetingFinished && isHrMember) {
      evaluation.hrInfoNotSent = true;
    }
    if (findMeetingFinished && notAllRequiredAttendeesHaveAccepted) {
      evaluation.evaluationExternal = true;
    }
    if (!meeting && (isHrMember || findMeetingFinished)) {
      evaluation.readOnly = true;
    }
    if (!meetingRequestSent && canMakeAction) {
      evaluation.action = true;
    }

    return evaluation;
  }

  getAccept = () => {
    return this.execute().pleaseAccept;
  };

  getJump = () => {
    return this.execute().jump;
  };

  getHrInfoNotAccepted = () => {
    return this.execute().hrInfoNotAccepted;
  };

  getHrInfoNotSent = () => {
    return this.execute().hrInfoNotSent;
  };

  getEvaluationExternal = () => {
    return this.execute().evaluationExternal;
  };

  getReadOnly = () => {
    return this.execute().readOnly;
  };
  getAction = () => {
    return this.execute().action;
  };
}

export default MeetingDetailVisibilityService;
