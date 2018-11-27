import { prs, sortOrderPrs, tablePrs } from './prs';
import {
  ADD_PR_RESPONSE,
  CHANGE_FINAL_COMMENT_RESPONSE,
  CHANGE_RATING_TARGETROLE_RESPONSE,
  CHANGE_SORT_ORDER,
  DELEGATE_REVIEWER_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE,
  FETCH_OWN_PRS_RESPONSE
} from '../helper/dispatchTypes';

describe('prs reducer', () => {
  const idLeadDeveloper = 14;

  let stateBefore = {
    1: {
      id: 1,
      employee: 'emp1',
      supervisor: 'fukara',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2019-03-14',
      finalCommentEmployee: 'comment pr 1',
      prTargetRoleSet: [
        {
          id: idLeadDeveloper,
          prTargetRoleName: 'LEAD_DEVELOPER',
          rating: 1,
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/2/role/LEAD_DEVELOPER'
            }
          }
        }
      ],
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1'
        }
      }
    },
    2: {
      id: 2,
      employee: 'emp2',
      supervisor: 'fukara',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2018-03-14',
      finalCommentEmployee: 'comment pr 2',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/2'
        }
      }
    },
    3: {
      id: 3,
      employee: 'emp3',
      supervisor: 'fukara',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2020-03-14',
      finalCommentEmployee: 'comment pr 3',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/3'
        }
      }
    }
  };

  it('should generate a Map for reducer FETCH_PRS_RESPONSE', () => {
    const stateBefore = {};
    const action = {
      type: FETCH_PRS_RESPONSE,
      prs: [{ id: 1, occasion: 'ON_DEMAND' }, { id: 2, occasion: 'YEARLY' }]
    };
    const stateAfter = prs(stateBefore, action);

    expect(stateAfter).toEqual({
      1: {
        id: 1,
        occasion: 'ON_DEMAND'
      },
      2: {
        id: 2,
        occasion: 'YEARLY'
      }
    });
  });

  it('should add a new PR for ADD_PR_RESPONSE with id 4', () => {
    const testdata = {
      id: 4,
      employee: 'emp5',
      supervisor: 'test.pr.vorgesetzter',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2021-03-14',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/4'
        }
      }
    };

    const action = {
      type: ADD_PR_RESPONSE,
      pr: testdata
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter[4]).toEqual(testdata);
    expect(Object.keys(stateAfter)).toHaveLength(4);
  });

  it('should override PR for ADD_PR_RESPONSE with id 3', () => {
    const testdata = {
      id: 3,
      employee: 'emp5',
      supervisor: 'test.pr.vorgesetzter',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2021-03-14',
      finalCommentEmployee: 'new Comment',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/3'
        }
      }
    };

    const action = {
      type: ADD_PR_RESPONSE,
      pr: testdata
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter[3]).toEqual(testdata);
    expect(Object.keys(stateAfter)).toHaveLength(3);
  });

  it('should add a new PR for FETCH_PR_BY_ID_RESPONSE with id 4', () => {
    const testdata = {
      id: 4,
      employee: 'emp5',
      supervisor: 'test.pr.vorgesetzter',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2021-03-14',
      finalCommentEmployee: 'new Comment',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/4'
        }
      }
    };

    const action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById: testdata
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter[4]).toEqual(testdata);
    expect(Object.keys(stateAfter)).toHaveLength(4);
  });

  it('should override PR for FETCH_PR_BY_ID_RESPONSE with id 3', () => {
    const testdata = {
      id: 3,
      employee: 'emp5',
      supervisor: 'test.pr.vorgesetzter',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2021-03-14',
      finalCommentEmployee: 'new Comment',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/3'
        }
      }
    };

    const action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById: testdata
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter[3]).toEqual(testdata);
    expect(Object.keys(stateAfter)).toHaveLength(3);
  });

  it('should update the reviewer for PR with id 2 for DELEGATE_REVIEWER_RESPONSE', () => {
    var updatedPrWithNewReviewer = Object.assign({}, stateBefore[2], {
      reviewer: {
        id: 1,
        firstName: 'Hänsel',
        lastName: 'Gretel',
        dateOfLastPr: '2018-01-01'
      }
    });

    const actionAddingDelegatedSupervisor = {
      type: DELEGATE_REVIEWER_RESPONSE,
      prNewReviewer: updatedPrWithNewReviewer
    };

    const stateAfter = prs(stateBefore, actionAddingDelegatedSupervisor);

    expect(stateAfter[2]).toEqual(updatedPrWithNewReviewer);
    expect(Object.keys(stateAfter)).toHaveLength(3);
  });

  it('should test the reducer for CHANGE_SORT_ORDER in ascending order', () => {
    const actionChangeSortOrder = {
      type: CHANGE_SORT_ORDER,
      sortOrder: 'asc'
    };

    const stateAfter = sortOrderPrs(stateBefore, actionChangeSortOrder);

    expect(stateAfter).toEqual('asc');
  });

  it('should test the reducer for CHANGE_SORT_ORDER in descending order', () => {
    const actionChangeSortOrder = {
      type: CHANGE_SORT_ORDER,
      sortOrder: 'desc'
    };

    const stateAfter = sortOrderPrs(stateBefore, actionChangeSortOrder);

    expect(stateAfter).toEqual('desc');
  });

  it('should change the rating of target role IT_SOLUTION_LEADER from 1 to 2', () => {
    const actionChangeRatingTargetRole = {
      type: CHANGE_RATING_TARGETROLE_RESPONSE,
      payload: {
        prId: 1,
        targetRoleName: 'LEAD_DEVELOPER',
        rating: 2
      }
    };

    const stateAfter = prs(stateBefore, actionChangeRatingTargetRole);
    const newRatingLeadDeveloper = stateAfter[1].prTargetRoleSet.filter(
      targetRole => targetRole.id === idLeadDeveloper
    )[0].rating;

    expect(newRatingLeadDeveloper).toEqual(2);
  });

  it('should generate a Map for reducer FETCH_OWN_PRS_RESPONSE', () => {
    const stateBefore = {};
    const action = {
      type: FETCH_OWN_PRS_RESPONSE,
      payload: {
        prTableEntries: [
          { prId: 1, employee: 'TEST' },
          { prId: 2, employee: 'TEST' }
        ]
      }
    };
    const stateAfter = tablePrs(stateBefore, action);

    expect(stateAfter).toEqual({
      1: {
        id: 1,
        employee: 'TEST'
      },
      2: {
        id: 2,
        employee: 'TEST'
      }
    });
  });

  it('should override finalCommentEmployee for CHANGE_FINAL_COMMENT_RESPONSE with id 2', () => {
    const payload = {
      prId: 2,
      comment: 'new Comment'
    };

    const action = {
      type: CHANGE_FINAL_COMMENT_RESPONSE,
      payload
    };

    const stateAfter = prs(stateBefore, action);

    expect(stateAfter[2]).toEqual(
      Object.assign({}, stateBefore[2], {
        finalCommentEmployee: 'new Comment'
      })
    );
    expect(Object.keys(stateAfter)).toHaveLength(3);
  });
});