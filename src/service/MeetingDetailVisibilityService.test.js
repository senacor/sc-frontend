import MeetingDetailVisibilityService from './MeetingDetailVisibilityService';
import ROLES from '../helper/roles';
import { prStatusEnum } from '../helper/prStatus';

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

  it('should show a skip meeting button', () => {
    let pr = {
      statuses: [
        prStatusEnum.RELEASED_SHEET_EMPLOYEE,
        prStatusEnum.RELEASED_SHEET_REVIEWER
      ],
      employee: { login: 'test.pr.mitarbeiter1' }
    };
    let userinfo = { userPrincipalName: 'test.pr.mitarbeiter1' };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);
    service.setUserinfo(userinfo);

    expect(service.getJump()).toBeTruthy();
  });

  it('should inform HR that the meeting is not yet accepted', () => {
    let pr = {
      statuses: [prStatusEnum.REQUESTED_DATE]
    };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);
    service.setUserroles(userroleHr);

    expect(service.getHrInfoNotAccepted()).toBeTruthy();
  });

  it('should inform HR that the meeting is not requested', () => {
    let service = new MeetingDetailVisibilityService();
    service.setUserroles(userroleHr);

    expect(service.getHrInfoNotSent()).toBeTruthy();
  });

  it('should know that the meeting was fixed outside the app because it is not accepted but finished', () => {
    let pr = {
      statuses: [prStatusEnum.REQUESTED_DATE, prStatusEnum.FIXED_DATE]
    };
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

    expect(service.getEvaluationExternal()).toBeTruthy();
  });

  it('should know that the meeting was fixed outside the app because it does not exist but is finished', () => {
    let pr = {
      statuses: [prStatusEnum.REQUESTED_DATE, prStatusEnum.FIXED_DATE]
    };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);

    expect(service.getEvaluationExternal()).toBeTruthy();
  });

  it('should not be possible to request a meeting if it does not exist, but the meeting progress already has finished', () => {
    let pr = {
      statuses: [prStatusEnum.REQUESTED_DATE, prStatusEnum.FIXED_DATE]
    };

    let service = new MeetingDetailVisibilityService();
    service.setPr(pr);

    expect(service.getReadOnly()).toBeTruthy();
  });

  it('should not be possible to request a meeting if it does not exist, but the user is HrMember', () => {
    let service = new MeetingDetailVisibilityService();
    service.setUserroles(userroleHr);

    expect(service.getReadOnly()).toBeTruthy();
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
