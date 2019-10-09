import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import Content from './Content';

const mockChildren = 'child';

describe('Content', () => {
  const wrapper = shallowWithIntl(<Content children={mockChildren} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('checks if Content has children', () => {
    expect(wrapper.props().children).toBeTruthy();
  });
});
