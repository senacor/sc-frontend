import MeetingDetailVisibilityService from './MeetingDetailVisibilityService';
import ROLES from '../helper/roles';
import { prStatusEnum } from '../helper/prStatus';
import { userinfo } from '../reducers/userinfo';

describe('MeetingDetailVisibilityService', () => {
  let userroleHr = [ROLES.PR_HR];

  it('should ask the user to accept the meeting', () => {
    let pr = {
      statuses: [prStatusEnum.REQUESTED_DATE],
      employee: { login: 'test.pr.mitarbeiter1' }
    };
    let userinfo = { userPrincipalName: 'test.pr.mitarbeiter1' };
    let meeting = {
      requiredAttendees: {
        'test.pr.mitarbeiter1': {
          email: 'test.pr.mitarbeiter1@senacor.com',
          status: 'UNKNOWN'
        }
      }
    };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);
    service.setMeeting(meeting);
    service.setUserinfo(userinfo);

    expect(service.getAccept()).toBeTruthy();
  });

  it('should inform HR that the meeting is not yet accepted', () => {
    let meeting = { status: 'NO_ANSWER' };
    let userinfo = { userPrincipalName: 'test.pr.hr' };

    let service = new MeetingDetailVisibilityService();
    service.setMeeting(meeting);
    service.setUserroles(userroleHr);
    service.setUserinfo(userinfo);

    expect(service.getHrInfoNotAccepted()).toBeTruthy();
  });

  it('should inform HR that the meeting is not requested', () => {
    let meeting = { status: 'NOT_REQUESTED' };

    let service = new MeetingDetailVisibilityService();
    service.setUserroles(userroleHr);
    service.setMeeting(meeting);

    expect(service.getHrInfoNotSent()).toBeTruthy();
  });

  it('should know that the meeting was fixed outside the app because it is not accepted but finished', () => {
    let pr = {
      statuses: [prStatusEnum.FINALIZED_REVIEWER]
    };
    let meeting = { status: 'NOT_REQUESTED' };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);
    service.setMeeting(meeting);
    service.setUserinfo(userinfo);

    expect(service.getEvaluationExternal()).toBeTruthy();
  });

  it('should know that the meeting was fixed outside the app because it does not exist but is finished', () => {
    let pr = {
      statuses: [prStatusEnum.FINALIZED_REVIEWER]
    };
    let meeting = {
      status: 'DECLINED',
      requiredAttendees: {
        'test.pr.mitarbeiter1': {
          email: 'test.pr.mitarbeiter1@senacor.com',
          status: 'UNKNOWN'
        }
      }
    };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);
    service.setUserinfo(userinfo);
    service.setMeeting(meeting);

    expect(service.getEvaluationExternal()).toBeTruthy();
  });

  it('should be possible to request a meeting if it is not yet requested and the user is logged in as actionPerformer of PR', () => {
    let pr = {
      employee: { login: 'test.pr.mitarbeiter1' },
      statuses: []
    };
    let userinfo = { userPrincipalName: 'test.pr.mitarbeiter1' };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);
    service.setUserinfo(userinfo);

    expect(service.getAction()).toBeTruthy();
  });
});
