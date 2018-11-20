import { prDetailId, newPrId } from './prDetailId';
import { FETCH_PR_BY_ID_RESPONSE } from '../helper/dispatchTypes';
import * as dispatchTypes from '../helper/dispatchTypes';

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

    const stateAfter = prDetailId(stateBefore, action);

    expect(stateAfter).toEqual(83);
  });
});

describe('newPrId reducer', () => {
  it('should set newPrId to id of pr on ADD_PR_RESPONSE', () => {
    const stateBefore = {};
    const action = {
      type: dispatchTypes.ADD_PR_RESPONSE,
      pr: {
        id: 42
      }
    };

    const stateAfter = newPrId(stateBefore, action);

    expect(stateAfter).toEqual(42);
  });

  [
    dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
    dispatchTypes.FETCH_PRS_RESPONSE,
    dispatchTypes.SET_PR_DETAIL
  ].forEach(type => {
    it(`should set newPrId to null on ${type}`, () => {
      const stateBefore = {};
      const action = {
        type: type
      };
      const stateAfter = newPrId(stateBefore, action);

      expect(stateAfter).toEqual(null);
    });
  });
});
