import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { SimpleErrorDialog } from './SimpleErrorDialog';

describe('SimpleErrorDialog Component', () => {
  let shallow = createShallow({ dive: true });
  let textClass = {};

  it('should match Snapshot', () => {
    let component = shallow(
      <SimpleErrorDialog
        onClose={jest.fn()}
        open={true}
        message={'Fehlermeldung'}
        classes={textClass}
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
        classes={textClass}
      />
    );

    expect(component.find('WithStyles(PrStatusActionButton)')).toHaveLength(1);
  });
});
