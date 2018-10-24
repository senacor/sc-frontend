import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import PopperSearchMenu from './PopperSearchMenu';
import EmployeeFilter from './EmployeeFilter';
import FILTER_GROUPS from './filterGroups';

describe('PopperSearchMenu component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    let component = shallow(
      <PopperSearchMenu>
        <EmployeeFilter filterGroup={FILTER_GROUPS.HR} filterBy={'employee'} />
      </PopperSearchMenu>
    );
    expect(component).toMatchSnapshot();
  });
});
