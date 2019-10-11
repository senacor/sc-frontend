import React from 'react';
import { shallow } from 'enzyme';

import SearchFilter from './SearchFilter';

const mockPlaceholder = 'input';
const mockSearchValue = 'searching employee';
const mockOnChange = jest.fn();

describe('SearchFilter', () => {
  const wrapper = shallow(
    <SearchFilter
      placeholder={mockPlaceholder}
      searchValue={mockSearchValue}
      searchChange={mockOnChange}
    />
  );
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('checks for props values', () => {
    expect(wrapper.props().placeholder).toBe('input');
    expect(wrapper.props().searchValue).toBe('searching employee');
  });
  it('should have searchChange prop defined', () => {
    expect(wrapper.props().searchChange).toBeDefined();
  });
});
