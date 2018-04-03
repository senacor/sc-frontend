import prs from './prs';

it('test for prsList', () => {
  const stateBefore = {
    prsList: ['pr1'],
    addPr: []
  };
  const action = {
    type: 'FETCH_PRS_RESPONSE',
    prs: ['pr2']
  };

  const stateAfter = prs(stateBefore, action);

  expect(stateAfter).toEqual({
    prsList: ['pr2'],
    addPr: []
  });
});

it('test for addList', () => {
  const stateBefore = {
    prsList: [],
    addPr: ['addPr1']
  };
  const action = {
    type: 'ADD_PR_RESPONSE',
    pr: ['pr2']
  };

  const stateAfter = prs(stateBefore, action);

  expect(stateAfter).toEqual({
    prsList: [],
    addPr: ['pr2']
  });
});
