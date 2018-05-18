import React from 'react';
import { StyledComponent } from './PrSheetEmployee';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrSheetEmployee Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    supervisor: 'ttran',
    occasion: 'ON_DEMAND',
    status: 'PREPARATION',
    deadline: '2018-03-14',

    prReflectionSet: [
      {
        id: 1,
        prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
        text: null
      },
      {
        id: 2,
        prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
        text: 'hjkkkhgcghjjn'
      }
    ],

    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1'
      }
    }
  };

  it('displays the PrSheetEmployee, component: ROLE_AND_PROJECT_ENVIRONMENT ', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        category="ROLE_AND_PROJECT_ENVIRONMENT"
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the PrSheetEmployee, component: INFLUENCE_OF_LEADER_AND_ENVIRONMENT', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        category="INFLUENCE_OF_LEADER_AND_ENVIRONMENT"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
