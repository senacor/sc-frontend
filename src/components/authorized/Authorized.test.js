import React from 'react';
import { Authorized } from './Authorized';
import { mount } from 'enzyme';
import ROLES from '../../helper/roles';

describe('Authorized component', () => {
  it('should display child element if user has according role', () => {
    const cut = mount(
      <Authorized
        forRole={ROLES.PR_CST_LEITER}
        userroles={[ROLES.PR_CST_LEITER, ROLES.PR_MITARBEITER]}
      >
        <div>visible</div>
      </Authorized>
    );

    expect(cut).toMatchSnapshot();
  });

  it('should not display child element if user does not have the group', () => {
    const cut = mount(
      <Authorized
        forRole={'UNKNOWN'}
        userroles={[ROLES.PR_CST_LEITER, ROLES.PR_MITARBEITER]}
      >
        <div>invisible</div>
      </Authorized>
    );

    expect(cut).toMatchSnapshot();
  });

  it('should display child element for undefined prop forRole', () => {
    const cut = mount(
      <Authorized userroles={[ROLES.PR_CST_LEITER, ROLES.PR_MITARBEITER]}>
        <div>visible</div>
      </Authorized>
    );

    expect(cut).toMatchSnapshot();
  });
});
