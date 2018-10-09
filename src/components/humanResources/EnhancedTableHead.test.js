import React from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import { createShallow } from '@material-ui/core/test-utils';
import HR_ELEMENTS from './hrElements';

describe('EnhancedTableHead component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const mockCallBack = jest.fn();
    let component = shallow(
      <EnhancedTableHead
        onRequestSort={mockCallBack}
        order={'asc'}
        orderBy={HR_ELEMENTS.EMPLOYEE}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should have a clickable TableSortLabel', () => {
    const mockCallBack = jest.fn();

    const component = shallow(
      <EnhancedTableHead
        order={'asc'}
        orderBy={HR_ELEMENTS.EMPLOYEE}
        onRequestSort={mockCallBack}
      />
    );
    component
      .find('WithStyles(TableSortLabel).' + HR_ELEMENTS.EMPLOYEE)
      .simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
