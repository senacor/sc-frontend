import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { StyledComponent } from './Sidebar';

describe('Sidebar', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const element = shallow(
      <StyledComponent
        userinfo={{ givenName: 'Maria', surname: 'Mueller' }}
        userroles={['PR_MITARBEITER']}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
      />
    );

    expect(element).toMatchSnapshot();
  });

  it('should contain composition number', () => {
    const element = shallow(
      <StyledComponent
        userinfo={{ givenName: 'Maria', surname: 'Mueller' }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={['PR_MITARBEITER']}
      />
    );

    expect(element.find('WithStyles(CompositionNumber)')).toHaveLength(1);
  });
});
