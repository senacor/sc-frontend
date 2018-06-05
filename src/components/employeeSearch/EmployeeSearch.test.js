import React from 'react';
import { StyledComponent } from './EmployeeSearch';
import { createShallow } from '@material-ui/core/test-utils/index';

describe('EmployeeSearch Component', () => {
  it('displays the list of employees on search', () => {
    let shallow = createShallow({ dive: true });
    const component = shallow(<StyledComponent />);

    expect(component).toMatchSnapshot();
  });
});
