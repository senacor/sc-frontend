import React from 'react';
import { PrOverviewReviewer } from './PrOverviewReviewer';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrOverviewReviewer Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let component = shallow(<PrOverviewReviewer />);

    expect(component).toMatchSnapshot();
  });
});
