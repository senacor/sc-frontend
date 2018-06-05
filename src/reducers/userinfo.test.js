import { userinfo, userphoto } from './userinfo';

describe('userinfo reducer', () => {
  it('should set userinfo on FETCHED_USERINFO', () => {
    const stateBefore = {};
    const action = {
      type: 'FETCHED_USERINFO',
      userinfo: {
        givenName: 'Petra',
        surname: 'Panther'
      }
    };

    const stateAfter = userinfo(stateBefore, action);

    expect(stateAfter).toEqual({
      givenName: 'Petra',
      surname: 'Panther'
    });
  });
});

describe('userphoto reducer', () => {
  it('should set userphoto on FETCHED_USERPHOTO', () => {
    const stateBefore = '';
    const action = {
      type: 'FETCHED_USERPHOTO',
      imageString: 'staticImageString'
    };

    const stateAfter = userphoto(stateBefore, action);

    expect(stateAfter).toEqual('staticImageString');
  });
});
