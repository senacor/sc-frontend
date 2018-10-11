import React from 'react';
import { PrDetailInformation } from './PrDetailInformation';
import { shallow } from 'enzyme';

describe('PrDetailInformation Component', () => {
  it('should match snapshot', () => {
    const component = shallow(<PrDetailInformation />);
    expect(component).toMatchSnapshot();
  });
});
