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

  let shallow = createShallow({ dive: true });

  it('should display the search field', () => {
    let shallow = createShallow({ dive: true });
    let prSearchMock = jest.fn();

    const component = shallow(
      <EmployeeSearch prSearch={prSearchMock} prSearchResults={searchResults} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should send an search for employees onChange', () => {
    let prSearchMock = jest.fn();
    jest.useFakeTimers();

    const component = shallow(
      <EmployeeSearch prSearch={prSearchMock} prSearchResults={searchResults} />
    );

    let event = {
      target: { value: 'Ma' }
    };
    let payload = 'Ma';

    expect(component.find('TextField')).toHaveLength(1);
    component.find('TextField').simulate('change', event);
    jest.runAllTimers();

    expect(prSearchMock).toHaveBeenCalledTimes(1);
    expect(prSearchMock).toHaveBeenCalledWith(payload);
  });

  it('should show the employeeList', () => {
    let prSearchMock = jest.fn();

    const component = shallow(
      <EmployeeSearch
        prSearch={prSearchMock}
        prSearchResults={searchResults}
        employeeSearchValue={'M'}
      />
    );

    expect(component.find('WithStyles(ListItemText)')).toHaveLength(3);
  });

  it('should be able to select an employee from the List', () => {
    let prSearchMock = jest.fn();
    let selectEmployeeMock = jest.fn();

    const component = shallow(
      <EmployeeSearch
        prSearch={prSearchMock}
        prSearchResults={searchResults}
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
    expect(selectEmployeeMock).toHaveBeenCalledWith(payload);
    expect(component.find('TextField').props().value).toEqual(
      'Manuela Vorgesetzter'
    );
  });
});
