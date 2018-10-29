import React from 'react';
import { StyledComponent as PROverviewReviewer } from './PROverviewReviewer';
import { createShallow } from '@material-ui/core/test-utils';

describe('PROverviewReviewer Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let component = shallow(<PROverviewReviewer />);

    expect(component).toMatchSnapshot();
  });
});
