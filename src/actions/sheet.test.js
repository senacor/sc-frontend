import { addRating } from './index';
import { changeRatingTargetRole } from './sheet';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESPONSE,
  CHANGE_RATING_TARGETROLE_REQUEST,
  CHANGE_RATING_TARGETROLE_RESPONSE,
  ERROR_RESPONSE
} from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const prById = {
  id: 1,
  employee: {
    id: 1,
    login: 'lschäfer',
    firstName: 'Lionel',
    lastName: 'Schäfer',
    title: 'DR',
    email: 'lionel.schäfer@senacor.com',
    entryDate: '2004-05-10'
  },
  supervisor: 'ttran',
  occasion: 'ON_DEMAND',
  status: 'PREPARATION',
  deadline: '2018-03-14',
  prTargetRoleSet: [
    {
      id: 77,
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
};

describe('addRating', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('adds new ratings for the pr and triggers the actions', async () => {
    fetchMock.putOnce('/api/v1/prs/1/ratings/5', {
      id: 5,
      prRatingDescription: 'PROBLEM_ANALYSIS',
      prRatingCategory: 'PERFORMANCE_IN_PROJECT',
      rating: 5,
      comment: 'test',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1/ratings/5'
        }
      }
    });

    fetchMock.get('/api/v1/prs/1/ratings', {
      _embedded: {
        prRatingResponseList: [
          {
            id: 1,
            prRatingDescription: 'WORK_RESULTS',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/1'
              }
            }
          },
          {
            id: 2,
            prRatingDescription: 'FREE_TEXT_FIELD',
            prRatingCategory: 'OVERALL_ASSESSMENT',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/2'
              }
            }
          },
          {
            id: 3,
            prRatingDescription: 'CUSTOMER_INTERACTION',
            prRatingCategory: 'IMPACT_ON_CUSTOMER',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/3'
              }
            }
          },
          {
            id: 4,
            prRatingDescription: 'TEAMWORK',
            prRatingCategory: 'IMPACT_ON_TEAM',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/4'
              }
            }
          },
          {
            id: 5,
            prRatingDescription: 'PROBLEM_ANALYSIS',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: 5,
            comment: 'test',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/5'
              }
            }
          },
          {
            id: 6,
            prRatingDescription: 'CUSTOMER_RETENTION',
            prRatingCategory: 'IMPACT_ON_CUSTOMER',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/6'
              }
            }
          },
          {
            id: 7,
            prRatingDescription: 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT',
            prRatingCategory: 'IMPACT_ON_COMPANY',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/7'
              }
            }
          },
          {
            id: 8,
            prRatingDescription: 'WORKING_MANNER',
            prRatingCategory: 'PERFORMANCE_IN_PROJECT',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/8'
              }
            }
          },
          {
            id: 9,
            prRatingDescription: 'LEADERSHIP',
            prRatingCategory: 'IMPACT_ON_TEAM',
            rating: null,
            comment: null,
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1/ratings/9'
              }
            }
          }
        ]
      }
    });
    const store = mockStore();

    await store.dispatch(addRating(prById, 'PROBLEM_ANALYSIS', 'test', 5, 5));

    expect(store.getActions()).toEqual([
      {
        type: ADD_COMMENT_REQUEST
      },
      {
        type: ADD_COMMENT_RESPONSE,
        payload: {
          prId: 1,
          prRatings: [
            {
              id: 1,
              prRatingDescription: 'WORK_RESULTS',
              prRatingCategory: 'PERFORMANCE_IN_PROJECT',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/1'
                }
              }
            },
            {
              id: 2,
              prRatingDescription: 'FREE_TEXT_FIELD',
              prRatingCategory: 'OVERALL_ASSESSMENT',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/2'
                }
              }
            },
            {
              id: 3,
              prRatingDescription: 'CUSTOMER_INTERACTION',
              prRatingCategory: 'IMPACT_ON_CUSTOMER',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/3'
                }
              }
            },
            {
              id: 4,
              prRatingDescription: 'TEAMWORK',
              prRatingCategory: 'IMPACT_ON_TEAM',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/4'
                }
              }
            },
            {
              id: 5,
              prRatingDescription: 'PROBLEM_ANALYSIS',
              prRatingCategory: 'PERFORMANCE_IN_PROJECT',
              rating: 5,
              comment: 'test',
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/5'
                }
              }
            },
            {
              id: 6,
              prRatingDescription: 'CUSTOMER_RETENTION',
              prRatingCategory: 'IMPACT_ON_CUSTOMER',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/6'
                }
              }
            },
            {
              id: 7,
              prRatingDescription: 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT',
              prRatingCategory: 'IMPACT_ON_COMPANY',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/7'
                }
              }
            },
            {
              id: 8,
              prRatingDescription: 'WORKING_MANNER',
              prRatingCategory: 'PERFORMANCE_IN_PROJECT',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/8'
                }
              }
            },
            {
              id: 9,
              prRatingDescription: 'LEADERSHIP',
              prRatingCategory: 'IMPACT_ON_TEAM',
              rating: null,
              comment: null,
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1/ratings/9'
                }
              }
            }
          ]
        }
      }
    ]);
  });
});

describe('changeRatingTargetRole', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should update the rating for the target role and dispatch the response action', async () => {
    const prId = prById.id;
    const targetRoleName = 'LEAD_DEVELOPER';
    const rating = 3;

    const prTargetRoleResponse = {
      prId,
      targetRoleName,
      rating
    };

    fetchMock.putOnce(`/api/v1/prs/${prId}/role/${targetRoleName}`, {
      rating
    });

    const store = mockStore();
    await store.dispatch(changeRatingTargetRole(prId, targetRoleName, rating));

    expect(store.getActions()).toEqual([
      { type: CHANGE_RATING_TARGETROLE_REQUEST },
      { type: CHANGE_RATING_TARGETROLE_RESPONSE, payload: prTargetRoleResponse }
    ]);
  });

  it('should display the HTTP status code NOT_FOUND when service throws TargetRoleNotFoundException', async () => {
    const prId = prById.id;
    const prTargetRoleNameNotExisting = 'I_DO_NOT_EXIST';
    const rating = 3;

    fetchMock.putOnce(
      `/api/v1/prs/${prId}/role/${prTargetRoleNameNotExisting}`,
      {
        status: 404,
        body: { httpCode: 'NOT_FOUND' }
      }
    );

    const store = mockStore();
    await store.dispatch(
      changeRatingTargetRole(prId, prTargetRoleNameNotExisting, rating)
    );

    expect(store.getActions()).toEqual([
      { type: CHANGE_RATING_TARGETROLE_REQUEST },
      { type: ERROR_RESPONSE, httpCode: 404 }
    ]);
  });
});
