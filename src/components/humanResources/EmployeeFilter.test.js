import React from 'react';
import { EmployeeFilter } from './EmployeeFilter';
import { createShallow } from '@material-ui/core/test-utils';
import FILTER_GROUPS from './filterGroups';
import HR_ELEMENTS from './hrElements';

describe('EmployeeFilter Component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    const mockCallBack = jest.fn();

    let component = shallow(
      <EmployeeFilter
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.EMPLOYEE}
        filter={{
          searchString: 'employee=502',
          values: 'Michaela Mitarbeiterin'
        }}
        addFilter={mockCallBack}
        deleteFilter={mockCallBack}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
