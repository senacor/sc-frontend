import React from 'react';
import MyPRListFilterDialog from './MyPRListFilterDialog';
import { createShallow } from '@material-ui/core/test-utils';

describe('MyPRListFilterDialog Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const component = shallow(<MyPRListFilterDialog />);
    expect(component).toMatchSnapshot();
  });
});
