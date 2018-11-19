import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import ShowReviewer from './ShowReviewer';

describe('ShowReviewer Component', () => {
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

  it('should show ", Beurteiler: prDelegate(Reviewer)" if user is supervisor', () => {
    const component = shallow(
      <ShowReviewer pr={pr} prefix={', Beurteiler: '} username={'mbock'} />
    );
    expect(
      component
        .find('WithStyles(Typography)')
        .children()
        .text()
    ).toEqual(', Beurteiler: ');

    expect(component.find('Connect(WithStyles(PrDelegate))')).toHaveLength(1);
    expect(
      component.find('Connect(WithStyles(PrDelegate))').props().isDelegated
    ).toEqual(true);
  });

  it('should show ", Beurteiler: reviewer" if user is employee ', () => {
    const component = shallow(
      <ShowReviewer
        pr={pr}
        prefix={', Beurteiler: '}
        username={'mmitarbeiterin'}
      />
    );
    expect(
      component
        .find('WithStyles(Typography)')
        .children()
        .text()
    ).toEqual(', Beurteiler: Martin Mitarbeiter');

    expect(component.find('Connect(WithStyles(PrDelegate))')).toHaveLength(0);
  });

  it('should show nothing if user is employee and supervisor===reviewer', () => {
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
        id: 54,
        login: 'mbock',
        firstName: 'Manuela',
        lastName: 'Bock'
      },
      deadline: '2018-12-06',
      meeting: { start: '2018-12-04' },
      competence: 'DEVELOPMENT',
      occasion: 'ON_DEMAND',
      statuses: []
    };

    const component = shallow(
      <ShowReviewer
        pr={pr}
        prefix={', Beurteiler: '}
        username={'mmitarbeiterin'}
      />
    );
    expect(component.find('WithStyles(Typography)').children()).toHaveLength(0);

    expect(component.find('Connect(WithStyles(PrDelegate))')).toHaveLength(0);
  });
});
