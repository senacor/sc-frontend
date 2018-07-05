import { userinfo, userphoto } from './userinfo';
import { FETCHED_USERINFO, FETCHED_USERPHOTO } from '../helper/dispatchTypes';

describe('userinfo reducer', () => {
  it('should set userinfo on FETCHED_USERINFO', () => {
    const stateBefore = {};
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
      userPrincipalName: 'ppanther'
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
