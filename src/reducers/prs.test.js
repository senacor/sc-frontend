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

  it('should test the reducer for ADD_SUPERVISOR', () => {
    const stateBefore = {
      prsList: []
    };

    let pr = {
      id: 1,
      employee: 'emp',
      supervisor: 'fukara',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2018-03-14',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/22'
        }
      }
    };

    const actionAddingPr = {
      type: 'ADD_PR_RESPONSE',
      pr: pr
    };
    const actionAddingDelegatedSupervisor = {
      type: 'ADD_SUPERVISOR',
      supervisor: 'dummy',
      prId: 1
    };

    const stateAfter = prs(
      prs(stateBefore, actionAddingPr),
      actionAddingDelegatedSupervisor
    );

    expect(stateAfter).toEqual({
      prsList: [
        {
          deadline: '2018-03-14',
          delegateSupervisor: 'dummy',
          employee: 'emp',
          id: 1,
          occasion: 'ON_DEMAND',
          status: 'PREPARATION',
          supervisor: 'fukara'
        }
      ]
    });
  });
});
