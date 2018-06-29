import prRatings from './rating';
import { ADD_COMMENT_RESPONSE } from '../helper/dispatchTypes';

describe('rating reducer', () => {
  it('should test the reducer for ADD_COMMENT_RESPONSE', () => {
    let ratingsBefore = {
      _embedded: {
        prRatingResponseList: [
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
        ]
      },
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1/ratings'
        }
      }
    };

    const stateBefore = {};
    const action = {
      type: ADD_COMMENT_RESPONSE,
      prRatings: ratingsBefore
    };

    const stateAfter = prRatings(stateBefore, action);

    expect(stateAfter).toEqual({ prRating: ratingsBefore });
  });
});
