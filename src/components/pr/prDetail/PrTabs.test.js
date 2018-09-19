import React from 'react';
import PrTabs from './PrTabs';
import { createShallow } from '@material-ui/core/test-utils';

describe('PerformanceReviewDetail Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const component = shallow(<PrTabs />);
    expect(component).toMatchSnapshot();
  });
});
