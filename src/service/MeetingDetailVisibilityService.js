import { prStatusEnum } from '../helper/prStatus';
import { isPersonalDev } from '../helper/checkRole';
import { hasRoleInPrBasedOnUserName } from '../helper/checkRole';

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

  execute() {
    let { pr, userroles, userinfo, meeting } = this;

    let evaluation = {
      pleaseAccept: false,
      hrInfoNotAccepted: false,
      hrInfoNotSent: false,
      evaluationExternal: false,
      meetingDeclined: false,
      action: false,
      meetingExists: false
    };

    let reviewerHasFinished = pr.statusSet.includes(
      prStatusEnum.FINALIZED_REVIEWER
    );
    let isHrMember = isPersonalDev(userroles);
    let hasRoleInPr = hasRoleInPrBasedOnUserName(pr, userinfo);
    let canMakeAction = hasRoleInPr(['supervisor', 'reviewer', 'employee']);
    let meetingStateOfSelf =
      meeting && !(meeting.status === 'NOT_REQUESTED') && !isHrMember
        ? this.findMeetingStateOfSelf(userinfo, meeting)
        : ['UNKNOWN'];
    let meetingStateOfSelfUnknown = meetingStateOfSelf.includes('UNKNOWN');
    let meetingStateDeclined = meeting && meeting.status === 'DECLINED';

    if (
      !reviewerHasFinished &&
      meetingStateOfSelfUnknown &&
      canMakeAction &&
      !meetingStateDeclined
    ) {
      evaluation.pleaseAccept = true;
    }
    if (meetingStateDeclined && !reviewerHasFinished) {
      evaluation.meetingDeclined = true;
    }
    if (
      !reviewerHasFinished &&
      meeting != null &&
      meeting.status === 'NO_ANSWER' &&
      isHrMember
    ) {
      evaluation.hrInfoNotAccepted = true;
    }
    if (
      !reviewerHasFinished &&
      meeting != null &&
      meeting.status === 'NOT_REQUESTED' &&
      isHrMember
    ) {
      evaluation.hrInfoNotSent = true;
    }
    if (
      reviewerHasFinished &&
      meeting != null &&
      meeting.status !== 'ACCEPTED'
    ) {
      evaluation.evaluationExternal = true;
    }
    if (!reviewerHasFinished && canMakeAction) {
      evaluation.action = true;
    }
    if (meeting != null && !(meeting.status === 'NOT_REQUESTED')) {
      evaluation.meetingExists = true;
    }

    return evaluation;
  }

  getAccept = () => {
    return this.execute().pleaseAccept;
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
  getAction = () => {
    // return this.execute().action;
    return true;
  };
  getMeetingExists = () => {
    return this.execute().meetingExists;
  };
  getMeetingDeclined = () => {
    return this.execute().meetingDeclined;
  };
}

export default MeetingDetailVisibilityService;
