import { filter } from './filter';
import { ADD_FILTER } from '../helper/dispatchTypes';
import FILTER_GROUPS from '../components/humanResources/filterGroups';

describe('filter reducer', () => {
  it('should add first filter to hr filter', async () => {
    let stateBefore;

    let data = {
      supervisor: {
        searchString: 'employee=503',
        values: 'Volker Vorgesetzter'
      }
    };

    const action = {
      type: ADD_FILTER,
      payload: { filterGroup: FILTER_GROUPS.HR, filter: data }
    };
    const stateAfter = filter(stateBefore, action);

    expect(stateAfter).toEqual({
      hr: {
        supervisor: {
          searchString: 'employee=503',
          values: 'Volker Vorgesetzter'
        }
      }
    });
  });

  it('should add new filter to hr filter', async () => {
    let stateBefore = {
      hr: {
        employee: {
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        }
      }
    };

    let data = {
      supervisor: {
        searchString: 'employee=503',
        values: 'Volker Vorgesetzter'
      }
    };

    const action = {
      type: ADD_FILTER,
      payload: { filterGroup: FILTER_GROUPS.HR, filter: data }
    };
    const stateAfter = filter(stateBefore, action);

    expect(stateAfter).toEqual({
      hr: {
        employee: {
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        },
        supervisor: {
          searchString: 'employee=503',
          values: 'Volker Vorgesetzter'
        }
      }
    });
  });
});
