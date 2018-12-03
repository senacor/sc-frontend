import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { SimpleErrorDialog } from './SimpleErrorDialog';

describe('SimpleErrorDialog Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match Snapshot', () => {
    let component = shallow(
      <SimpleErrorDialog
        onClose={jest.fn()}
        open={true}
        message={'Fehlermeldung'}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should call onClose if close', () => {
    let closeMock = jest.fn();
    let component = shallow(
      <SimpleErrorDialog
        onClose={closeMock}
        open={true}
        message={'Fehlermeldung'}
      />
    );

    component.find('WithStyles(Button)').simulate('click');
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
