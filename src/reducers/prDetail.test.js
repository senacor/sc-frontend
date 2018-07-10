import { prDetail } from './prDetail';
import { FETCH_PR_BY_ID_RESPONSE } from '../helper/dispatchTypes';

describe('prDetail reducer', () => {
  it('should set prDetail to id of pr on FETCH_PR_BY_ID_RESPONSE', () => {
    const stateBefore = {};
    const action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById: {
        id: 83,
        something: 'else'
      }
    };

    const stateAfter = prDetail(stateBefore, action);

    expect(stateAfter).toEqual(83);
  });
});
