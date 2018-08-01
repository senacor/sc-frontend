import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent } from './TargetRole';

const targetRoleSet = [
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
    const wrapper = shallow(
      <StyledComponent prActive={{ prTargetRoleSet: targetRoleSet }} />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
