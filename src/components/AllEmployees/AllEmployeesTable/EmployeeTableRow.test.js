import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import EmployeeTableRow from './EmployeeTableRow';

let wrapper;
const mockSelection = false;
const mockEmployee = {
  id: 1,
  firstName: 'Peter',
  lastName: 'Knox',
  competenceCenter: 'DEVELOPMENT',
  currentPosition: 'Senior Developer',
  currentCst: 'Postbank',
  officeLocation: 'Košice',
  dateOfNextPr: [1, 2, 2020],
  userPhoto: undefined,
  supervisorName: 'Peter Supervisor',
  hasOpenedPr: false
};

describe('EmployeeTableRow', () => {
  wrapper = shallowWithIntl(
    <EmployeeTableRow selection={mockSelection} employee={mockEmployee} />
  );
  wrapper.setState({ dialogOpen: false });
  it('tests selection prop to be false', () => {
    expect(wrapper.props().selection).toEqual(false);
  });
  it('tests employee prop to be included', () => {
    expect(wrapper.props().employee).toEqual(mockEmployee);
  });
  it('checks for employee name', () => {
    expect(wrapper.props().employee.firstName).toBeTruthy();
    expect(wrapper.props().employee.lastName).toBeTruthy();
  });
});
