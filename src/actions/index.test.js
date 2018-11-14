import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import {
  addPr,
  delegateReviewer,
  fetchPrById,
  fetchPrs,
  changePrSortOrder
} from './index';
import * as dispatchTypes from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchPrs', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('fetches the prs and triggers the actions', async () => {
    fetchMock.getOnce('/api/v1/prs', {
      body: {
        _embedded: {
          prResponseList: [
            {
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
              _links: {
                self: {
                  href: 'http://localhost:8010/api/v1/prs/1'
                }
              }
            }
          ]
        },
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs'
          }
        }
      }
    });
    const store = mockStore();

    await store.dispatch(fetchPrs());

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FETCH_PRS_REQUEST
      },
      {
        type: dispatchTypes.ERROR_GONE
      },
      {
        type: dispatchTypes.FETCH_PRS_RESPONSE,
        prs: [
          {
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
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/prs/1'
              }
            }
          }
        ]
      }
    ]);
  });

  it('handles an empty prs list', async () => {
    fetchMock.getOnce('/api/v1/prs', {
      body: {
        _links: {
          self: {
            href: 'http://localhost:8080/api/v1/prs'
          }
        }
      }
    });
    const store = mockStore();

    await store.dispatch(fetchPrs());

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FETCH_PRS_REQUEST
      },
      {
        type: dispatchTypes.ERROR_GONE
      },
      {
        type: dispatchTypes.FETCH_PRS_RESPONSE,
        prs: []
      }
    ]);
  });
});

describe('addPr', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('adds a new pr and triggers the actions', async () => {
    fetchMock.postOnce('/api/v1/prs', {
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
      deadline: moment().format('YYYY-MM-DD'),
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1'
        }
      }
    });
    const store = mockStore();

    await store.dispatch(addPr());

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.ADD_PR_REQUEST
      },
      {
        type: dispatchTypes.ADD_PR_RESPONSE,
        pr: {
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
          deadline: moment().format('YYYY-MM-DD'),
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/1'
            }
          }
        }
      }
    ]);
  });
});

describe('fetchPrById', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('fetches a pr by his id and triggers the actions', async () => {
    fetchMock.getOnce('/api/v1/prs/1', {
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
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1'
        }
      }
    });
    const store = mockStore();

    await store.dispatch(fetchPrById(1));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.FETCH_PR_BY_ID_REQUEST
      },
      {
        type: dispatchTypes.ERROR_GONE
      },
      {
        type: dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
        prById: {
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
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/1'
            }
          }
        }
      }
    ]);
  });
});

describe('sortPRs', () => {
  it('should dispatch CHANGE_SORT_ORDER', async () => {
    const store = mockStore();
    await store.dispatch(changePrSortOrder());

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.CHANGE_SORT_ORDER
      }
    ]);
  });
});

describe('delgatePr', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('delegate pr to a new person (reviewer) and trigger the actions', async () => {
    fetchMock.putOnce('/api/v1/prs/1/delegation', () => {
      return {
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
        reviewer: 'max mustermann',
        occasion: 'ON_DEMAND',
        status: 'PREPARATION',
        deadline: '2018-03-14',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/1'
          }
        }
      };
    });

    const store = mockStore();

    await store.dispatch(delegateReviewer(1, 3));

    expect(store.getActions()).toEqual([
      {
        type: dispatchTypes.DELEGATE_REVIEWER_REQUEST
      },
      {
        type: dispatchTypes.DELEGATE_REVIEWER_RESPONSE,
        prNewReviewer: {
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
          reviewer: 'max mustermann',
          occasion: 'ON_DEMAND',
          status: 'PREPARATION',
          deadline: '2018-03-14',
          _links: {
            self: {
              href: 'http://localhost:8010/api/v1/prs/1'
            }
          }
        }
      }
    ]);
  });
});
