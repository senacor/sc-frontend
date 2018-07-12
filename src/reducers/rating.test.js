import { prRatings } from './rating';
import { ADD_COMMENT_RESPONSE } from '../helper/dispatchTypes';

describe('rating reducer', () => {
  it('should test the reducer for ADD_COMMENT_RESPONSE', () => {
    let ratings = {
      prRatings: [
        {
          id: 3,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'nestojjkfgjdkghjrighjfkr'
        },
        {
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'kvvvuierkfjrfhkrehghfj'
        },
        {
          id: 1,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'kköhhjcsss'
        }
      ],
      prId: 5
    };

    const stateBefore = {};
    const action = {
      type: ADD_COMMENT_RESPONSE,
      payload: ratings
    };

    const stateAfter = prRatings(stateBefore, action);

    expect(stateAfter).toEqual({
      '5': [
        {
          WORKING_MANNER: {
            comment: 'nestojjkfgjdkghjrighjfkr',
            id: 3,
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            prRatingDescription: 'WORKING_MANNER',
            rating: 1
          }
        },
        {
          PROBLEM_ANALYSIS: {
            comment: 'kvvvuierkfjrfhkrehghfj',
            id: 5,
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            prRatingDescription: 'PROBLEM_ANALYSIS',
            rating: 5
          }
        },
        {
          WORK_RESULTS: {
            comment: 'kköhhjcsss',
            id: 1,
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            prRatingDescription: 'WORK_RESULTS',
            rating: 2
          }
        }
      ]
    });
  });
});
