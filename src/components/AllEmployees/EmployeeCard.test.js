import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import EmployeeCard from './EmployeeCard';

describe('EmployeeCard', () => {
  it('should render correctly', () => {
    const wrapper = shallowWithIntl(<EmployeeCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
