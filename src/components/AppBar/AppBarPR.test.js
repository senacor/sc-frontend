import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import AppBarPR from './AppBarPR';

describe('AppBarPR', () => {
  it('should render correctly', () => {
    const wrapper = shallowWithIntl(<AppBarPR />);
    expect(wrapper).toMatchSnapshot();
  });
});
