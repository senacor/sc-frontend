import { FILTER_POSSIBILITIES_RESPONSE } from '../helper/dispatchTypes';
import { filterPossibilities } from './filterPossibilities';

describe('filterPossibilities reducer', () => {
  it('should stored the values if FILTER_POSSIBILITIES_RESPONSE is dispatched', async () => {
    let stateBefore = {};

    let data = { levels: ['1', '2'], occassions: ['ON_DEMAND', 'YEARLY'] };

    const action = {
      type: FILTER_POSSIBILITIES_RESPONSE,
      payload: data
    };
    const stateAfter = filterPossibilities(stateBefore, action);

    expect(stateAfter).toEqual({
      levels: ['1', '2'],
      occassions: ['ON_DEMAND', 'YEARLY']
    });
  });
});
