import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ROLES from '../../../helper/roles';
import ROUTES from '../../../helper/routes';
import { BackToTableButton } from './BackToTableButton';

describe('BackToTableButton Component', () => {
  const pr = {
    employee: {
      id: 501,
      login: 'mmitarbeiterin',
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    supervisor: {
      id: 54,
      login: 'mbock',
      firstName: 'Manuela',
      lastName: 'Bock'
    },
    reviewer: {
      id: 503,
      login: 'mmitarbeiter',
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    deadline: '2018-12-06',
    meeting: { start: '2018-12-04' },
    competence: 'DEVELOPMENT',
    occasion: 'ON_DEMAND',
    statuses: []
  };

  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const component = shallow(
      <BackToTableButton pr={pr} username={'mmitarbeiterin'} userroles={['']} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should go back to table "prs" if clicked on close and user is supervisor of pr', () => {
    const component = shallow(
      <BackToTableButton pr={pr} username={'mbock'} userroles={['']} />
    );

    expect(component.find('PrStatusActionButton').props().to).toEqual('/prs');
  });

  it('should go back to table "prs" if clicked on close and user is reviewer of pr', () => {
    const component = shallow(
      <BackToTableButton pr={pr} username={'mmitarbeiter'} userroles={['']} />
    );

    expect(component.find('PrStatusActionButton').props().to).toEqual('/prs');
  });

  it('should go back to table "myPrs" if clicked on close and user is employee', () => {
    const component = shallow(
      <BackToTableButton pr={pr} username={'mmitarbeiterin'} userroles={['']} />
    );

    expect(component.find('PrStatusActionButton').props().to).toEqual(
      ROUTES.OWN_PR_TABLE
    );
  });
  it('should go back to table "/hr/prs" if clicked on close and userrole is hr', () => {
    const component = shallow(
      <BackToTableButton
        pr={pr}
        username={'ppersonal'}
        userroles={[ROLES.PR_HR]}
      />
    );

    expect(component.find('PrStatusActionButton').props().to).toEqual(
      ROUTES.HR_PR_TABLE
    );
  });
});
