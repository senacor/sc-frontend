import { prStatusEnum } from '../helper/prStatus';

class MeetingDetailVisibilityService {
  constructor(pr = { statuses: [] }, user = {}, meeting = null) {
    this.pr = pr;
    this.user = user;
    this.meeting = meeting;
  }

  setMeeting = meeting => {
    this.meeting = meeting;
  };

  setPr = pr => {
    this.pr = pr;
  };

  setUser = user => {
    this.user = user;
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
    let { pr, user, meeting } = this;

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
    let isHrMember = user.hasRoleHr();
    let canMakeAction =
      user.isReviewerInPr(pr) ||
      user.isSupervisorInPr(pr) ||
      user.isOwnerInPr(pr);
    let meetingStateOfSelf =
      meeting && !(meeting.status === 'NOT_REQUESTED') && !isHrMember
        ? this.findMeetingStateOfSelf(user.context.value.userinfo, meeting)
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
