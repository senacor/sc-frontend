import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import RequestPerformanceReview from './RequestPerformanceReview';

let wrapper = shallowWithIntl(<RequestPerformanceReview />);

describe('RequestPerformanceReview', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
