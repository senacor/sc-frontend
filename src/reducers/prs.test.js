import prs from './prs';

describe('prs reducer', () => {
  it('should test the reducer for FETCH_PRS_RESPONSE', () => {
    const stateBefore = {
      prsList: []
    };
    const action = {
      type: 'FETCH_PRS_RESPONSE',
      prs: ['pr2']
    };
    const stateAfter = prs(stateBefore, action);

    expect(stateAfter).toEqual({ prsList: ['pr2'] });
  });

  it('should test the reducer for ADD_PR_RESPONSE', () => {
    const stateBefore = {
      prsList: []
    };
    const action = {
      type: 'ADD_PR_RESPONSE',
      pr: 'pr2'
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter).toEqual({ prsList: ['pr2'] });
  });
});
