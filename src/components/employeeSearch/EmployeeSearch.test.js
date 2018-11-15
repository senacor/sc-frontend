import React from 'react';
import { StyledComponent as EmployeeSearch } from './EmployeeSearch';
import { createShallow } from '@material-ui/core/test-utils/index';

describe('EmployeeSearch Component', () => {
  let searchResults = [
    {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    {
      id: 503,
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    {
      id: 501,
      firstName: 'Manuela',
      lastName: 'Vorgesetzter'
    }
  ];

  it('should display the search field', () => {
    let shallow = createShallow({ dive: true });
    let employeeSearchMock = jest.fn();
    let employeeSearchClearMock = jest.fn();

    const component = shallow(
      <EmployeeSearch
        employeeSearch={employeeSearchMock}
        employeeSearchClear={employeeSearchClearMock}
        employeeSearchResults={searchResults}
        employeeSearchValue={'Ma'}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should clear the searchStore and send a search for employees onChange', () => {
    let employeeSearchMock = jest.fn();
    let employeeSearchClearMock = jest.fn();
    let shallow = createShallow({ dive: true });

    jest.useFakeTimers();

    const component = shallow(
      <EmployeeSearch
        employeeSearch={employeeSearchMock}
        employeeSearchClear={employeeSearchClearMock}
        employeeSearchResults={searchResults}
      />
    );
    expect(employeeSearchClearMock).toHaveBeenCalledTimes(1);

    let event = {
      target: { value: 'Ma' }
    };
    let payload = 'Ma';

    expect(component.find('TextField')).toHaveLength(1);
    component.find('TextField').simulate('change', event);
    jest.runAllTimers();

    expect(employeeSearchMock).toHaveBeenCalledTimes(1);
    expect(employeeSearchMock).toHaveBeenCalledWith(payload);
  });

  it('should be able to select an employee from the List', () => {
    let employeeSearchMock = jest.fn();
    let selectEmployeeMock = jest.fn();
    let employeeSearchClearMock = jest.fn();
    let shallow = createShallow({ dive: true });

    const component = shallow(
      <EmployeeSearch
        employeeSearch={employeeSearchMock}
        employeeSearchResults={searchResults}
        employeeSearchClear={employeeSearchClearMock}
        employeeSearchValue={'M'}
        selectEmployee={selectEmployeeMock}
      />
    );

    component.instance().selectedEmployee(searchResults[2])();

    let payload = searchResults[2];
    expect(selectEmployeeMock).toHaveBeenCalledTimes(1);
    expect(employeeSearchClearMock).toHaveBeenCalledTimes(2);
    expect(selectEmployeeMock).toHaveBeenCalledWith(payload);
    expect(component.find('TextField').props().value).toEqual(
      'Manuela Vorgesetzter'
    );
  });
});
