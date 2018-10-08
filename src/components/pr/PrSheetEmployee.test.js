import React from 'react';
import { StyledComponent } from './PrSheetEmployee';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ROLES from '../../helper/roles';

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
        employeeContribution={{
          ROLE_AND_PROJECT_ENVIRONMENT: {
            id: 12,
            prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
            text: 'Comment 121'
          }
        }}
        category="ROLE_AND_PROJECT_ENVIRONMENT"
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the PrSheetEmployee, component: INFLUENCE_OF_LEADER_AND_ENVIRONMENT', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        employeeContribution={{
          INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
            id: 11,
            prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
            text: 'Comment 111'
          }
        }}
        category="INFLUENCE_OF_LEADER_AND_ENVIRONMENT"
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the text read-only for the supervisor', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        employeeContribution={{
          ROLE_AND_PROJECT_ENVIRONMENT: {
            id: 12,
            prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
            text: 'Comment 121'
          }
        }}
        category="ROLE_AND_PROJECT_ENVIRONMENT"
        userroles={[ROLES.PR_CST_LEITER]}
      />
    );

    expect(component.find(Typography)).toHaveLength(2);
    expect(component.find(TextField)).toHaveLength(0);
  });

  it('should display the text for the supervisor only if submitted by employee', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        employeeContribution={{
          INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
            id: 11,
            prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
            text: 'Comment 111'
          }
        }}
        userroles={[ROLES.PR_CST_LEITER]}
        prVisible={false}
        category="INFLUENCE_OF_LEADER_AND_ENVIRONMENT"
      />
    );

    expect(
      component
        .find('WithStyles(Typography)')
        .findWhere(x => x.text() === 'hjkkkhgcghjjn')
    ).toHaveLength(0);
  });
});
