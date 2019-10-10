import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import InfoWidget from './InfoWidget';

describe('InfoWidget', () => {
  let wrapper;
  it('should render correctly', () => {
    wrapper = shallowWithIntl(<InfoWidget />);
    expect(wrapper).toMatchSnapshot();
  });
});
