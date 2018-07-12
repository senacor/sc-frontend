import React from 'react';
import { StyledComponent } from './PrComment';
import { createShallow } from '@material-ui/core/test-utils';
import ROLES from '../../helper/roles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

describe('PrComment Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1
  };

  it('should display ProblemAnalysis', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        prRating={{
          id: 5,
          prRatingDescription: 'PROBLEM_ANALYSIS',
          prRatingCategory: 'PERFORMANCE_IN_PROJECT',
          rating: 2,
          comment: 'ggg'
        }}
        category="PROBLEM_ANALYSIS"
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display Teamwork', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        prRating={{
          id: 9,
          prRatingDescription: 'TEAMWORK',
          prRatingCategory: 'IMPACT_ON_TEAM',
          rating: 1,
          comment: 'fff'
        }}
        category="TEAMWORK"
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display Customer interaction', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        prRating={{
          id: 7,
          prRatingDescription: 'CUSTOMER_INTERACTION',
          prRatingCategory: 'IMPACT_ON_CUSTOMER',
          rating: 4,
          comment: 'iii'
        }}
        category="CUSTOMER_INTERACTION"
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display the ContributionToCompanyDevelopment', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        prRating={{
          id: 6,
          prRatingDescription: 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT',
          prRatingCategory: 'IMPACT_ON_COMPANY',
          rating: 3,
          comment: 'hhh'
        }}
        category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
      />
    );

    expect(component).toMatchSnapshot();
  });

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

  it('should not display any ratings or comments if the supervisor did not submit yet', () => {
    const wrapper = shallow(
      <StyledComponent
        prById={prById}
        prRating={{
          id: 9,
          prRatingDescription: 'TEAMWORK',
          prRatingCategory: 'IMPACT_ON_TEAM',
          rating: 1,
          comment: 'fff'
        }}
        category="TEAMWORK"
        userroles={[ROLES.PR_MITARBEITER]}
        prVisible={false}
      />
    );
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(0);
    expect(wrapper.find(Select)).toHaveLength(0);

    expect(
      wrapper.find(Typography).findWhere(element => element.text() === '1')
    ).toHaveLength(0);
    expect(
      wrapper.find(Typography).findWhere(element => element.text() === '1')
    ).toHaveLength(0);
  });
});
