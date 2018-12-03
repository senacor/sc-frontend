import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent as TargetRole } from './TargetRole';
import StepSlider from './StepSlider';
import Typography from '@material-ui/core/Typography';

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
const countTargetRoles = prTargetRoleSet.length;

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

    expect(wrapper.find(Typography)).toHaveLength(countTargetRoles);
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
      .find(Typography)
      .map(role => role.get(0).props.children);
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

  it('should call subcomponents to be read-onlys', () => {
    let wrapper = shallow(
      <TargetRole
        prById={{}}
        prActive={{ prTargetRoleSet }}
        isDisabled={false}
        prFinalized={true}
      />
    );

    const components = wrapper
      .find(StepSlider)
      .findWhere(n => n.find('[isDisabled]').props().isDisabled === true);
    expect(components).toHaveLength(7);
  });
});