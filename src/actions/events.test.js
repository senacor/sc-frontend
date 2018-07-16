import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { getEvents } from './events';
import { replaceParametersInDefaultText } from './events';
import { FETCHED_EVENTS } from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getEvents redux action', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch all events', async () => {
    let data = {
      _embedded: {
        eventResponseList: [
          {
            id: 1,
            eventableEntityType: 'PR',
            eventableEntityId: 3,
            eventTypeResponse: {
              id: 1,
              description: 'EMPLOYEE_RELEASED_PR',
              defaultText: '{employee} hat PR freigegeben.',
              eventTypeParamResponseSet: [
                {
                  id: 1,
                  textParam: 'employee',
                  textValue: 'Max Mustermann'
                }
              ]
            },
            createdAt: '2018-07-09T14:54:25.675+0000',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/events/1'
              }
            }
          },
          {
            id: 2,
            eventableEntityType: 'PR',
            eventableEntityId: 3,
            eventTypeResponse: {
              id: 1,
              description: 'SUPERVISOR_REVIEWED_PR',
              defaultText: '{supervisor} hat PR bewertet.',
              eventTypeParamResponseSet: [
                {
                  id: 1,
                  textParam: 'supervisor',
                  textValue: 'Volker Vorgesetzter'
                }
              ]
            },
            createdAt: '2018-07-09T14:54:25.675+0000',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/events/1'
              }
            }
          }
        ]
      }
    };

    fetchMock.getOnce('/api/v1/events', {
      body: data
    });
    const store = mockStore();

    await store.dispatch(getEvents());

    let outputData = {
      _embedded: {
        eventResponseList: [
          {
            id: 1,
            eventableEntityType: 'PR',
            eventableEntityId: 3,
            text: 'Max Mustermann hat PR freigegeben.',
            createdAt: '2018-07-09T14:54:25.675+0000',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/events/1'
              }
            }
          },
          {
            id: 2,
            eventableEntityType: 'PR',
            eventableEntityId: 3,
            text: 'Volker Vorgesetzter hat PR bewertet.',
            createdAt: '2018-07-09T14:54:25.675+0000',
            _links: {
              self: {
                href: 'http://localhost:8010/api/v1/events/1'
              }
            }
          }
        ]
      }
    };

    expect(store.getActions()).toContainEqual({
      type: FETCHED_EVENTS,
      events: outputData._embedded.eventResponseList
    });
  });

  it('should replace parameters in default text string', () => {
    let defaultText =
      '{supervisor} hat PR für {employee} an {reviewer} delegiert.';
    let parameterList = [
      {
        id: 1,
        textParam: 'employee',
        textValue: 'Michaela Mitarbeiterin'
      },
      {
        id: 2,
        textParam: 'supervisor',
        textValue: 'Volker Vorgesetzter'
      },
      {
        id: 3,
        textParam: 'reviewer',
        textValue: 'Martin Mitarbeiter'
      }
    ];
    let result = replaceParametersInDefaultText(parameterList, defaultText);

    expect(result).toBe(
      'Volker Vorgesetzter hat PR für Michaela Mitarbeiterin an Martin Mitarbeiter delegiert.'
    );
  });
});
