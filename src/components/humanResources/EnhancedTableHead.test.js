import React from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import { createShallow } from '@material-ui/core/test-utils';
import HR_ELEMENTS from './hrElements';
import { Link } from 'react-router-dom';
import ExcelLikeSearchMenue from './ExcelLikeSearchMenue';
import EmployeeFilter from './EmployeeFilter';
import { getDisplayName } from './OverviewPerformanceReviews';

const rows = [
  {
    id: HR_ELEMENTS.EMPLOYEE,
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
      <ExcelLikeSearchMenue
        content={<EmployeeFilter filterGroup={'hr'} filterBy={'employee'} />}
      />
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
        orderBy={HR_ELEMENTS.EMPLOYEE}
        rows={rows}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should have a clickable TableSortLabel', () => {
    const mockCallBack = jest.fn();

    const component = shallow(
      <EnhancedTableHead
        order={'asc'}
        orderBy={HR_ELEMENTS.EMPLOYEE}
        onRequestSort={mockCallBack}
        rows={rows}
      />
    );
    component
      .find('WithStyles(TableSortLabel).' + HR_ELEMENTS.EMPLOYEE)
      .simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
