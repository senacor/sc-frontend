import React from 'react';
import { StyledComponent } from './Login';
import { createShallow } from '@material-ui/core/test-utils';

describe('Login Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const token = {
      token: true
    };

    const eut = shallow(
      <StyledComponent token={token} location={{ state: '/previous' }} />
    );

    expect(eut).toMatchSnapshot();
  });
});
