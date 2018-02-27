import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchTasks } from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fetchTasks', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('fetches the tasks and triggers the actions', async () => {
    fetchMock.getOnce('/api/v1/tasks', {
      body: {
        _embedded: {
          taskResponseList: [
            {
              id: 1,
              title: 'Test title',
              description: 'Test Description',
              username: 'ttran',
              deadline: '2017-12-31',
              _links: {
                self: {
                  href: '/api/v1/tasks/1'
                }
              }
            }
          ]
        },
        _links: {
          self: {
            href: 'http://localhost:8080/api/v1/tasks'
          }
        }
      }
    });
    const store = mockStore();

    await store.dispatch(fetchTasks());

    expect(store.getActions()).toEqual([
      {
        type: 'FETCH_TASKS_REQUEST'
      },
      {
        type: 'FETCH_TASKS_RESPONSE',
        tasks: [
          {
            id: 1,
            title: 'Test title',
            description: 'Test Description',
            username: 'ttran',
            deadline: '2017-12-31',
            _links: {
              self: {
                href: '/api/v1/tasks/1'
              }
            }
          }
        ]
      }
    ]);
  });

  it('handles an empty task list', async () => {
    fetchMock.getOnce('/api/v1/tasks', {
      body: {
        _links: {
          self: {
            href: 'http://localhost:8080/api/v1/tasks'
          }
        }
      }
    });
    const store = mockStore();

    await store.dispatch(fetchTasks());

    expect(store.getActions()).toEqual([
      {
        type: 'FETCH_TASKS_REQUEST'
      },
      {
        type: 'FETCH_TASKS_RESPONSE',
        tasks: []
      }
    ]);
  });
});
