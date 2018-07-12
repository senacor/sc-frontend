import { prRatings } from './rating';
import {
  ADD_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';

describe('rating reducer', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      1: {
        WORKING_MANNER: {
          id: 3,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'working manner'
        },
        PROBLEM_ANALYSIS: {
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'problem analysis'
        },
        WORK_RESULTS: {
          id: 1,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'work results'
        }
      }
    };
  });

  it('should add the ratings for ADD_COMMENT_RESPONSE to the store', () => {
    let ratings = {
      prRatings: [
        {
          id: 51,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'nestojjkfgjdkghjrighjfkr'
        },
        {
          id: 52,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'kvvvuierkfjrfhkrehghfj'
        },
        {
          id: 53,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'kköhhjcsss'
        }
      ],
      prId: 5
    };

    const action = {
      type: ADD_COMMENT_RESPONSE,
      payload: ratings
    };

    const stateAfter = prRatings(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        WORKING_MANNER: {
          id: 3,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'working manner'
        },
        PROBLEM_ANALYSIS: {
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'problem analysis'
        },
        WORK_RESULTS: {
          id: 1,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'work results'
        }
      },
      5: {
        WORKING_MANNER: {
          comment: 'nestojjkfgjdkghjrighjfkr',
          id: 51,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORKING_MANNER',
          rating: 1
        },
        PROBLEM_ANALYSIS: {
          comment: 'kvvvuierkfjrfhkrehghfj',
          id: 52,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'PROBLEM_ANALYSIS',
          rating: 5
        },
        WORK_RESULTS: {
          comment: 'kköhhjcsss',
          id: 53,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORK_RESULTS',
          rating: 2
        }
      }
    });
  });

  it('should override the ratings for ADD_COMMENT_RESPONSE if dataset is present', () => {
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
      prId: 1
    };

    const action = {
      type: ADD_COMMENT_RESPONSE,
      payload: ratings
    };

    const stateAfter = prRatings(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        WORKING_MANNER: {
          id: 3,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'nestojjkfgjdkghjrighjfkr'
        },
        PROBLEM_ANALYSIS: {
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'kvvvuierkfjrfhkrehghfj'
        },
        WORK_RESULTS: {
          id: 1,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'kköhhjcsss'
        }
      }
    });
  });

  it('should add the ratings for FETCH_PR_BY_ID_RESPONSE to the store', () => {
    let prById = {
      id: 83,
      something: 'else',
      prRatingSet: [
        {
          id: 51,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'nestojjkfgjdkghjrighjfkr'
        },
        {
          id: 52,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'kvvvuierkfjrfhkrehghfj'
        },
        {
          id: 53,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'kköhhjcsss'
        }
      ]
    };

    const action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById
    };

    const stateAfter = prRatings(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        WORKING_MANNER: {
          id: 3,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'working manner'
        },
        PROBLEM_ANALYSIS: {
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'problem analysis'
        },
        WORK_RESULTS: {
          id: 1,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'work results'
        }
      },
      83: {
        WORKING_MANNER: {
          comment: 'nestojjkfgjdkghjrighjfkr',
          id: 51,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORKING_MANNER',
          rating: 1
        },
        PROBLEM_ANALYSIS: {
          comment: 'kvvvuierkfjrfhkrehghfj',
          id: 52,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'PROBLEM_ANALYSIS',
          rating: 5
        },
        WORK_RESULTS: {
          comment: 'kköhhjcsss',
          id: 53,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORK_RESULTS',
          rating: 2
        }
      }
    });
  });

  it('should add all ratings for FETCH_PRS_RESPONSE to the store', () => {
    let prs = [
      {
        id: 5,
        something: 'else',
        prRatingSet: [
          {
            id: 51,
            prRatingDescription: 'WORKING_MANNER',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 1,
            comment: 'nestojjkfgjdkghjrighjfkr'
          },
          {
            id: 52,
            prRatingDescription: 'PROBLEM_ANALYSIS',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 5,
            comment: 'kvvvuierkfjrfhkrehghfj'
          },
          {
            id: 53,
            prRatingDescription: 'WORK_RESULTS',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 2,
            comment: 'kköhhjcsss'
          }
        ]
      },
      {
        id: 8,
        something: 'else',
        prRatingSet: [
          {
            id: 81,
            prRatingDescription: 'WORKING_MANNER',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 1,
            comment: 'nestojjkfgjdkghjrighjfkr'
          },
          {
            id: 82,
            prRatingDescription: 'PROBLEM_ANALYSIS',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 5,
            comment: 'kvvvuierkfjrfhkrehghfj'
          },
          {
            id: 83,
            prRatingDescription: 'WORK_RESULTS',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 2,
            comment: 'kköhhjcsss'
          }
        ]
      }
    ];

    const action = {
      type: FETCH_PRS_RESPONSE,
      prs
    };

    const stateAfter = prRatings(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        WORKING_MANNER: {
          id: 3,
          prRatingDescription: 'WORKING_MANNER',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 1,
          comment: 'working manner'
        },
        PROBLEM_ANALYSIS: {
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 5,
          comment: 'problem analysis'
        },
        WORK_RESULTS: {
          id: 1,
          prRatingDescription: 'WORK_RESULTS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'work results'
        }
      },
      5: {
        WORKING_MANNER: {
          comment: 'nestojjkfgjdkghjrighjfkr',
          id: 51,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORKING_MANNER',
          rating: 1
        },
        PROBLEM_ANALYSIS: {
          comment: 'kvvvuierkfjrfhkrehghfj',
          id: 52,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'PROBLEM_ANALYSIS',
          rating: 5
        },
        WORK_RESULTS: {
          comment: 'kköhhjcsss',
          id: 53,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORK_RESULTS',
          rating: 2
        }
      },
      8: {
        WORKING_MANNER: {
          comment: 'nestojjkfgjdkghjrighjfkr',
          id: 81,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORKING_MANNER',
          rating: 1
        },
        PROBLEM_ANALYSIS: {
          comment: 'kvvvuierkfjrfhkrehghfj',
          id: 82,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'PROBLEM_ANALYSIS',
          rating: 5
        },
        WORK_RESULTS: {
          comment: 'kköhhjcsss',
          id: 83,
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          prRatingDescription: 'WORK_RESULTS',
          rating: 2
        }
      }
    });
  });
});
