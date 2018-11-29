import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import TableColumnSelectorMenu from './TableColumnSelectorMenu';

describe('TableColumnSelectorMenu component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    let content = [
      { label: 'Mitarbeiter', value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', value: 'dummy_reviewer' }
    ];

    let component = shallow(
      <TableColumnSelectorMenu onChange={jest.fn()} content={content} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should handleChanges', () => {
    let content = [
      { label: 'Mitarbeiter', value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', value: 'dummy_reviewer' }
    ];

    let payload = [
      { label: 'Mitarbeiter', checked: true, value: 'dummy_mitarbeiter' },
      { label: 'Reviewer', checked: false, value: 'dummy_reviewer' }
    ];
    let onChangeMock = jest.fn();

    let component = shallow(
      <TableColumnSelectorMenu onChange={onChangeMock} content={content} />
    );

    component.instance().handleChange(payload);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(['dummy_mitarbeiter']);
  });
});
