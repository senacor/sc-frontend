import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { StyledComponent } from './Sidebar';

describe('Sidebar', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let getReviewerInfoMock = jest.fn();
    const element = shallow(
      <StyledComponent
        userinfo={{ givenName: 'Maria', surname: 'Mueller' }}
        userroles={['PR_MITARBEITER']}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        getReviewerInfo={getReviewerInfoMock}
      />
    );

    expect(element).toMatchSnapshot();
  });

  it('should contain composition number', () => {
    let getReviewerInfoMock = jest.fn();
    const element = shallow(
      <StyledComponent
        userinfo={{ givenName: 'Maria', surname: 'Mueller' }}
        getUserInfo={() => {}}
        getUserRoles={() => {}}
        userroles={['PR_MITARBEITER']}
        getReviewerInfo={getReviewerInfoMock}
      />
    );

    expect(element.find('WithStyles(CompositionNumber)')).toHaveLength(1);
  });
});
