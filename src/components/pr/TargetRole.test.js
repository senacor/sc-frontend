import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { StyledComponent as TargetRole } from './TargetRole';

const countTargetRoles = 7;
const prTargetRoleSet = [
  {
    id: 22,
    prTargetRoleName: 'PLATTFORMGESTALTER',
    rating: 2
  },
  {
    id: 27,
    prTargetRoleName: 'TRANSFORMATION_MANAGER',
    rating: 2
  },
  {
    id: 23,
    prTargetRoleName: 'ARCHITECT',
    rating: 2
  },
  {
    id: 26,
    prTargetRoleName: 'IT_LIEFERSTEUERER',
    rating: 2
  },
  {
    id: 24,
    prTargetRoleName: 'LEAD_DEVELOPER',
    rating: 2
  },
  {
    id: 25,
    prTargetRoleName: 'IT_SOLUTION_LEADER',
    rating: 2
  },
  {
    id: 28,
    prTargetRoleName: 'TECHNICAL_EXPERT',
    rating: 2
  }
];

describe('TargetRole Component', () => {
  let shallow = createShallow({ dive: true });
  it('should match snapshot', () => {
    let wrapper = shallow(
      <TargetRole
        prById={{}}
        prActive={{ prTargetRoleSet }}
        isDisabled={false}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should have expected number of target roles', () => {
    let wrapper = shallow(
      <TargetRole
        prById={{}}
        prActive={{ prTargetRoleSet }}
        isDisabled={false}
      />
    );

    expect(wrapper.find(ListItemText)).toHaveLength(countTargetRoles);
  });

  it('should show the target roles in the designated order', () => {
    let wrapper = shallow(
      <TargetRole
        prById={{}}
        prActive={{ prTargetRoleSet }}
        isDisabled={false}
      />
    );

    let actualRoles = wrapper
      .find(ListItemText)
      .map(role => role.get(0).props.secondary);
    expect(actualRoles).toEqual([
      'Plattformgestalter',
      'IT Solution Leader',
      'Transformation Manager',
      'IT Liefersteuerer',
      'Architekt',
      'Technischer Experte',
      'Lead Developer'
    ]);
  });
});
