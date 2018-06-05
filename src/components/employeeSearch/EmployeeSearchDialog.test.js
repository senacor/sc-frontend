import React from 'react';
import EmployeeSearchDialog from './EmployeeSearchDialog';
import { createShallow } from '@material-ui/core/test-utils/index';

describe('EmployeeSearchDialog Component', () => {
  it('should match snapshot', () => {
    let shallow = createShallow({ dive: true });
    const component = shallow(<EmployeeSearchDialog />);

    expect(component).toMatchSnapshot();
  });
});
