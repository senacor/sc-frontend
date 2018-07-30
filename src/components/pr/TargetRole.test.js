import React from 'react';
import { shallow } from 'enzyme';
import { TargetRole } from './TargetRole';
import { StyledComponent } from './PrComment';
import TextField from '@material-ui/core/TextField/index';
import ROLES from '../../helper/roles';
import Typography from '@material-ui/core/Typography/index';
import Select from '@material-ui/core/Select/index';


const countTargetRoles = 7;
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

  it('should match snapshot', () => {
    let wrapper = shallow(<TargetRole prById={{}} />);

    expect(wrapper.find(ListItemText)).toHaveLength(countTargetRoles);
    expect(wrapper.find(ListItemText)).toHaveLength(countTargetRoles);
    //expect(cut).toMatchSnapshot();
  });


    /*
  it('should display no input components when viewer is employee', () => {
    const wrapper = shallow(
      <StyledComponent
        prById={prById}
        category="TEAMWORK"
        prRating={{
          id: 9,
          prRatingDescription: 'TEAMWORK',
          prRatingCategory: 'IMPACT_ON_TEAM',
          rating: 1,
          comment: 'fff'
        }}
        userroles={[ROLES.PR_MITARBEITER]}
      />
    );
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(0);
    expect(wrapper.find(Select)).toHaveLength(0);
  });
  */
});
