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

  it('should show the employeeList', () => {
    let employeeSearchMock = jest.fn();
    let employeeSearchClearMock = jest.fn();
    let shallow = createShallow({ dive: true });

    const component = shallow(
      <EmployeeSearch
        employeeSearch={employeeSearchMock}
        employeeSearchResults={searchResults}
        employeeSearchClear={employeeSearchClearMock}
        employeeSearchValue={'M'}
      />
    );

    expect(component.find('WithStyles(ListItemText)')).toHaveLength(3);
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

    expect(
      component.find('WithStyles(ListItemText)[primary="Manuela Vorgesetzter"]')
    ).toHaveLength(1);

    component
      .find('WithStyles(ListItemText)[primary="Manuela Vorgesetzter"]')
      .parent()
      .simulate('click');

    let payload = searchResults[2];
    expect(selectEmployeeMock).toHaveBeenCalledTimes(1);
    expect(employeeSearchClearMock).toHaveBeenCalledTimes(2);
    expect(selectEmployeeMock).toHaveBeenCalledWith(payload);
    expect(component.find('TextField').props().value).toEqual(
      'Manuela Vorgesetzter'
    );
  });

  it('should exclude employees by excludeList', () => {
    let employeeSearchMock = jest.fn();
    let selectEmployeeMock = jest.fn();
    let employeeSearchClearMock = jest.fn();

    let shallow = createShallow({ dive: true });

    let component = shallow(
      <EmployeeSearch
        employeeSearch={employeeSearchMock}
        employeeSearchResults={searchResults}
        employeeSearchClear={employeeSearchClearMock}
        employeeSearchValue={'M'}
        excludeList={[503]}
        selectEmployee={selectEmployeeMock}
      />
    ).setState({ searchReady: false });

    expect(
      component.find('WithStyles(ListItemText)[primary="Manuela Vorgesetzter"]')
    ).toHaveLength(1);

    expect(
      component.find('WithStyles(ListItemText)[primary="Martin Mitarbeiter"]')
    ).toHaveLength(0);

    component
      .find('WithStyles(ListItemText)[primary="Manuela Vorgesetzter"]')
      .parent()
      .simulate('click');

    let payload = searchResults[2];
    expect(selectEmployeeMock).toHaveBeenCalledTimes(1);
    expect(employeeSearchClearMock).toHaveBeenCalledTimes(2);
    expect(selectEmployeeMock).toHaveBeenCalledWith(payload);
    expect(component.find('TextField').props().value).toEqual(
      'Manuela Vorgesetzter'
    );
  });
});
