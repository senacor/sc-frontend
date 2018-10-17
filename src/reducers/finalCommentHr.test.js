import {
  ADD_PR_RESPONSE,
  CHANGE_HR_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import { finalCommentHr } from './finalCommentHr';

describe('final comment from HR', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      1: 'final comment to pr 1',
      2: 'final comment to pr 2',
      3: 'final comment to pr 3',
      4: 'final comment to pr 4',
      5: 'final comment to pr 5'
    };
  });

  it('should add the comments for FETCH_PRS_RESPONSE to the store', () => {
    let emptyState = {};

    const action = {
      type: FETCH_PRS_RESPONSE,
      prs: [
        { id: 1, finalCommentHr: 'final comment to pr 1' },
        { id: 2, finalCommentHr: 'final comment to pr 2' },
        { id: 3, finalCommentHr: 'final comment to pr 3' },
        { id: 4, finalCommentHr: 'final comment to pr 4' },
        { id: 5, finalCommentHr: 'final comment to pr 5' }
      ]
    };

    const stateAfter = finalCommentHr(emptyState, action);

    expect(stateAfter).toEqual(initialState);
  });

  it('should change the comment for CHANGE_HR_COMMENT_RESPONSE to the store', () => {
    let payload = {
      comment: 'new Comment',
      prId: 3
    };

    const action = {
      type: CHANGE_HR_COMMENT_RESPONSE,
      payload
    };

    const stateAfter = finalCommentHr(initialState, action);

    expect(stateAfter).toEqual({
      1: 'final comment to pr 1',
      2: 'final comment to pr 2',
      3: 'new Comment',
      4: 'final comment to pr 4',
      5: 'final comment to pr 5'
    });
  });

  it('should add the comment for ADD_PR_RESPONSE to the store', () => {
    let payload = {
      id: 6,
      employee: 'emp5',
      supervisor: 'test.pr.vorgesetzter',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      finalCommentHr: 'new Comment',
      deadline: '2021-03-14',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/4'
        }
      }
    };

    const action = {
      type: ADD_PR_RESPONSE,
      pr: payload
    };

    const stateAfter = finalCommentHr(initialState, action);

    expect(stateAfter).toEqual({
      1: 'final comment to pr 1',
      2: 'final comment to pr 2',
      3: 'final comment to pr 3',
      4: 'final comment to pr 4',
      5: 'final comment to pr 5',
      6: 'new Comment'
    });
  });

  it('should add the comment for FETCH_PR_BY_ID_RESPONSE to the store', () => {
    let payload = {
      id: 6,
      employee: 'emp5',
      supervisor: 'test.pr.vorgesetzter',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      finalCommentHr: 'new Comment',
      deadline: '2021-03-14',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/4'
        }
      }
    };

    const action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById: payload
    };

    const stateAfter = finalCommentHr(initialState, action);

    expect(stateAfter).toEqual({
      1: 'final comment to pr 1',
      2: 'final comment to pr 2',
      3: 'final comment to pr 3',
      4: 'final comment to pr 4',
      5: 'final comment to pr 5',
      6: 'new Comment'
    });
  });
});
