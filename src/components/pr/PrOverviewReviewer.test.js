import React from 'react';
import { StyledComponent as PROverviewReviewer } from './PrOverviewReviewer';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrOverviewReviewer Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let component = shallow(<PROverviewReviewer />);

    expect(component).toMatchSnapshot();
  });
});
