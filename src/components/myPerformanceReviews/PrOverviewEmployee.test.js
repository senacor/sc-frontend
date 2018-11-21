import React from 'react';
import { PrOverviewEmployee } from './PrOverviewEmployee';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrOverviewReviewer Component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    let component = shallow(<PrOverviewEmployee />);

    expect(component).toMatchSnapshot();
  });
});
