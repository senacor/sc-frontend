import { userinfo, userphoto } from './userinfo';
import {
  FETCHED_USERINFO,
  FETCHED_USERPHOTO,
  REVIEWER_INFO_RESPONSE
} from '../helper/dispatchTypes';

describe('userinfo reducer', () => {
  it('should set userinfo on FETCHED_USERINFO', () => {
    const stateBefore = { numberOfPrsToReview: 2 };
    const action = {
      type: FETCHED_USERINFO,
      userinfo: {
        givenName: 'Petra',
        surname: 'Panther',
        userPrincipalName: 'ppanther@polaris.senacor.com'
      }
    };

    const stateAfter = userinfo(stateBefore, action);

    expect(stateAfter).toEqual({
      givenName: 'Petra',
      surname: 'Panther',
      userPrincipalName: 'ppanther',
      numberOfPrsToReview: 2
    });
  });

  it('should add numberOfPrsToReview to userinfo without destroying the old state', () => {
    const stateBefore = {
      givenName: 'Petra',
      surname: 'Panther',
      userPrincipalName: 'ppanther',
      numberOfPrsToReview: 2
    };
    const action = {
      type: REVIEWER_INFO_RESPONSE,
      payload: {
        reviewerInfo: {
          numberOfPrsToReview: 5,
          numberOfPrsToSupervise: 7
        }
      }
    };

    const stateAfter = userinfo(stateBefore, action);

    expect(stateAfter).toEqual({
      givenName: 'Petra',
      surname: 'Panther',
      userPrincipalName: 'ppanther',
      numberOfPrsToReview: 5,
      numberOfPrsToSupervise: 7
    });
  });
});

describe('userphoto reducer', () => {
  it('should set userphoto on FETCHED_USERPHOTO', () => {
    const stateBefore = '';
    const action = {
      type: FETCHED_USERPHOTO,
      imageString: 'staticImageString'
    };

    const stateAfter = userphoto(stateBefore, action);

    expect(stateAfter).toEqual('staticImageString');
  });
});
