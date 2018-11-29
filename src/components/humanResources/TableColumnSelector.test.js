import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent as TableColumnSelector } from './TableColumSelector';

describe('TableColumnSelector component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let content = [
      { label: 'Mitarbeiter', checked: true, value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', checked: true, value: 'dummy_reviewer' }
    ];

    let component = shallow(
      <TableColumnSelector selectedContent={content} onChange={jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should uncheck "selectAll" if at least one item is unchecked', () => {
    let content = [
      { label: 'Mitarbeiter', checked: true, value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', checked: false, value: 'dummy_reviewer' }
    ];

    let component = shallow(
      <TableColumnSelector selectedContent={content} onChange={jest.fn()} />
    );

    expect(
      component.find('WithStyles(Checkbox)[id="selectAll"]').props().checked
    ).toEqual(false);
  });

  it('should call the onChange Function if a item is clicked', () => {
    let content = [
      { label: 'Mitarbeiter', checked: true, value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', checked: true, value: 'dummy_reviewer' }
    ];

    let onChangeMock = jest.fn();

    let component = shallow(
      <TableColumnSelector selectedContent={content} onChange={onChangeMock} />
    );
    component
      .find('WithStyles(Checkbox)[id="Mitarbeiter"]')
      .parent()
      .simulate('click');

    let payload = [
      { label: 'Mitarbeiter', checked: false, value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', checked: true, value: 'dummy_reviewer' }
    ];

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(payload);
  });
});
