import React from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import { createShallow } from '@material-ui/core/test-utils';
import HR_ELEMENTS from './hrElements';
import { Link } from 'react-router-dom';
import PopperSearchMenu from './PopperSearchMenu';
import EmployeeFilter from './EmployeeFilter';
import { getDisplayName } from './OverviewPerformanceReviews';
import FILTER_GROUPS from './filterGroups';

const rows = [
  {
    key: HR_ELEMENTS.EMPLOYEE,
    numeric: false,
    disablePadding: false,
    label: 'Mitarbeiter',
    mapper: variable => getDisplayName(variable),
    show: entry => {
      return (
        <Link to={`/prDetail/${entry.prId}`}>
          {getDisplayName(entry[HR_ELEMENTS.EMPLOYEE])}
        </Link>
      );
    },
    filter: (
      <PopperSearchMenu>
        <EmployeeFilter
          filterGroup={FILTER_GROUPS.HR}
          filterBy={HR_ELEMENTS.EMPLOYEE}
        />
      </PopperSearchMenu>
    )
  }
];

describe('EnhancedTableHead component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const mockCallBack = jest.fn();
    let component = shallow(
      <EnhancedTableHead
        onRequestSort={mockCallBack}
        order={'asc'}
        orderBy={0}
        columnDefinition={rows}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should have a clickable TableSortLabel', () => {
    const mockCallBack = jest.fn();

    const component = shallow(
      <EnhancedTableHead
        order={'asc'}
        orderBy={0}
        onRequestSort={mockCallBack}
        columnDefinition={rows}
      />
    );

    component.find('WithStyles(TableSortLabel)').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
