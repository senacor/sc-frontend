import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import SortingFilter from './SortingFilter';

const mockMenuData = ['input1', 'input2', 'input3'];
const mockStateValue = 'searching employee';
const mockOnChange = jest.fn();

describe('SortingFilter', () => {
  const wrapper = shallowWithIntl(
    <SortingFilter
      menuData={mockMenuData}
      stateValue={mockStateValue}
      handleChange={mockOnChange}
    />
  );
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('checks for props values', () => {
    expect(wrapper.props().menuData).toHaveLength(3);
    expect(wrapper.props().stateValue).toBe('searching employee');
  });
  it('should have handleChange prop defined', () => {
    expect(wrapper.props().handleChange).toBeDefined();
  });
});
