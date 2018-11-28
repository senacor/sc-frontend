import React from 'react';
import { StyledComponent as PrTabs } from './PrTabs';
import { createShallow } from '@material-ui/core/test-utils';
import { prTabEnum } from '../../../helper/prTabEnum';

describe('PerformanceReviewDetail Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const component = shallow(<PrTabs tabValue={prTabEnum.SCHEDULE_VIEW} />);
    expect(component).toMatchSnapshot();
  });
});
