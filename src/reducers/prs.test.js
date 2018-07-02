import prs from './prs';
import {
  FETCH_PRS_RESPONSE,
  DELEGATE_REVIEWER_RESPONSE,
} from '../helper/dispatchTypes';

describe('prs reducer', () => {
  it('should test the reducer for FETCH_PRS_RESPONSE', () => {
    const stateBefore = {
      prsList: []
    };
    const action = {
      type: FETCH_PRS_RESPONSE,
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
      type: ADD_PR_RESPONSE,
      pr: 'pr2'
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter).toEqual({ prsList: ['pr2'] });
  });

  it('should test the reducer for DELEGATE_REVIEWER_RESPONSE, to see if a new delegated reviewer is added in the state', () => {
    const stateBefore = {
      prsList: [
        {
          id: 1,
          employee: 'emp1',
          supervisor: 'fukara',
          occasion: 'ON_DEMAND',
          status: 'PREPARATION',
          deadline: '2019-03-14',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/1'
            }
          }
        },
        {
          id: 2,
          employee: 'emp2',
          supervisor: 'fukara',
          occasion: 'ON_DEMAND',
          status: 'PREPARATION',
          deadline: '2018-03-14',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/2'
            }
          }
        },
        {
          id: 3,
          employee: 'emp3',
          supervisor: 'fukara',
          occasion: 'ON_DEMAND',
          status: 'PREPARATION',
          deadline: '2020-03-14',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/3'
            }
          }
        }
      ]
    };

    const actionAddingDelegatedSupervisor = {
      type: DELEGATE_REVIEWER_RESPONSE,
      delegatedSupervisor: 'dummy',
      prId: 2
    };

    const stateAfter = prs(stateBefore, actionAddingDelegatedSupervisor);

    const expectedOutput = {
      prsList: [
        stateBefore.prsList[0],

        Object.assign(stateBefore.prsList[1], {
          delegatedSupervisor: 'dummy'
        }),
        stateBefore.prsList[2]
      ]
    };

    expect(stateAfter).toEqual(expectedOutput);
  });
});
