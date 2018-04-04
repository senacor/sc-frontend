import prs from './prs';

describe('prs reducer', () => {
  it('tested for prsList', () => {
    const stateBefore = {
      prsList: []
    };
    const action = {
      type: 'FETCH_PRS_RESPONSE',
      prs: ['pr2']
    };
    const stateAfter = prs(stateBefore, action);

    expect(stateAfter).toEqual({
      prsList: [{ prs: ['pr2'], type: 'FETCH_PRS_RESPONSE' }]
    });
  });

  it('tested for addList', () => {
    const stateBefore = {
      prsList: []
    };
    const action = {
      type: 'ADD_PR_RESPONSE',
      pr: ['pr2']
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter).toEqual({
      prsList: [{ pr: ['pr2'], type: 'ADD_PR_RESPONSE' }]
    });
  });
});
