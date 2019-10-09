import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import Message from './Message';

describe('Message', () => {
  it('should render correctly', () => {
    const wrapper = shallowWithIntl(<Message />);
    expect(wrapper).toMatchSnapshot();
  });
});
