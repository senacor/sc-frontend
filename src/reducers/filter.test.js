import { filter } from './filter';
import {
  ADD_FILTER,
  ADD_SUBFILTER,
  DELETE_SUBFILTER,
  RESET_FILTERGROUP
} from '../helper/dispatchTypes';
import FILTER_GROUPS from '../components/humanResources/filterGroups';
import HR_ELEMENTS from '../components/humanResources/hrElements';

describe('filter reducer', () => {
  it('should have default value actual Year for deadline if store is empty', async () => {
    let stateBefore;

    let data = {};
    const hr_initDateFrom = new Date().getFullYear() + '-01-01';
    const hr_initDateTo = new Date().getFullYear() + '-12-31';

    const action = {
      type: ADD_FILTER,
      payload: { filterGroup: FILTER_GROUPS.HR, filter: data }
    };
    const stateAfter = filter(stateBefore, action);

    expect(stateAfter).toEqual({
      hr: {
        deadline: {
          searchString: `deadlineFrom=${hr_initDateFrom}&deadlineTo=${hr_initDateTo}`,
          values: {
            From: '2018-01-01',
            To: '2018-12-31'
          }
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

  it('should add new subfilter to hr filter', async () => {
    let stateBefore = {
      hr: {
        employee: {
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        }
      }
    };

    let data = {
      searchString: 'employee=503',
      values: 'Volker Vorgesetzter'
    };

    const action = {
      type: ADD_SUBFILTER,
      payload: {
        filterGroup: FILTER_GROUPS.HR,
        filterBy: HR_ELEMENTS.SUPERVISOR,
        filter: data
      }
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

  it('should change subfilter to hr filter', async () => {
    let stateBefore = {
      hr: {
        employee: {
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        }
      }
    };

    let data = {
      searchString: 'employee=503',
      values: 'Volker Vorgesetzter'
    };

    const action = {
      type: ADD_SUBFILTER,
      payload: {
        filterGroup: FILTER_GROUPS.HR,
        filterBy: HR_ELEMENTS.EMPLOYEE,
        filter: data
      }
    };
    const stateAfter = filter(stateBefore, action);

    expect(stateAfter).toEqual({
      hr: {
        employee: {
          searchString: 'employee=503',
          values: 'Volker Vorgesetzter'
        }
      }
    });
  });

  it('should remove the subfilter from hr filter', async () => {
    let stateBefore = {
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
    };

    const action = {
      type: DELETE_SUBFILTER,
      payload: { filterGroup: FILTER_GROUPS.HR, filterBy: 'supervisor' }
    };
    const stateAfter = filter(stateBefore, action);

    expect(stateAfter).toEqual({
      hr: {
        employee: {
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        }
      }
    });
  });

  it('should reset the filter to default', async () => {
    let stateBefore = {
      hr: {
        employee: {
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        },
        supervisor: {
          searchString: 'employee=503',
          values: 'Volker Vorgesetzter'
        }
      },
      EMPLOYEE: {
        supervisor: {
          searchString: 'employee=504',
          values: 'Ronald Martins'
        }
      }
    };

    const action = {
      type: RESET_FILTERGROUP,
      payload: { filterGroup: FILTER_GROUPS.HR }
    };
    const stateAfter = filter(stateBefore, action);
    const hr_initDateFrom = new Date().getFullYear() + '-01-01';
    const hr_initDateTo = new Date().getFullYear() + '-12-31';

    expect(stateAfter).toEqual({
      hr: {
        deadline: {
          searchString: `deadlineFrom=${hr_initDateFrom}&deadlineTo=${hr_initDateTo}`,
          values: {
            From: '2018-01-01',
            To: '2018-12-31'
          }
        }
      },
      EMPLOYEE: {
        supervisor: {
          searchString: 'employee=504',
          values: 'Ronald Martins'
        }
      }
    });
  });
});
