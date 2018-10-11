import React from 'react';
import PrHistory from './PrHistory';
import { shallow } from 'enzyme';

describe('PrHistory Component', () => {
  it('should match snapshot', () => {
    const component = shallow(<PrHistory />);
    expect(component).toMatchSnapshot();
  });
});
