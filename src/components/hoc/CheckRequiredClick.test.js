import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { CheckRequiredClick } from './CheckRequiredClick';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';

describe('CheckRequiredClick Component', () => {
  let shallow = createShallow({ dive: false });

  it('should match Snapshot', () => {
    let component = shallow(
      <CheckRequiredClick
        onClick={jest.fn()}
        check={jest.fn()}
        message={'Fehlermeldung.'}
      >
        <PrStatusActionButton label={'Freigabe'} />
      </CheckRequiredClick>
    );

    expect(component).toMatchSnapshot();
  });
});
