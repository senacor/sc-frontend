import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import PrSheet from './PrSheet';

let wrapper = shallowWithIntl(<PrSheet />);

describe('PrSheet', () => {
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
