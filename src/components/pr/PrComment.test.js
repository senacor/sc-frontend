import React from 'react';
import { StyledComponent } from './PrComment';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrComment Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    prRatingSet: [
      {
        id: 2,
        prRatingDescription: 'CUSTOMER_RETENTION',
        prRatingCategory: 'IMPACT_ON_CUSTOMER',
        rating: 1,
        comment: 'aaa'
      },
      {
        id: 8,
        prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
        prRatingCategory: 'OVERALL_ASSESSMENT',
        rating: 2,
        comment: 'bbb'
      },
      {
        id: 9,
        prRatingDescription: 'TARGET_ROLE',
        prRatingCategory: 'OVERALL_ASSESSMENT',
        rating: 3,
        comment: 'jjj'
      },
      {
        id: 3,
        prRatingDescription: 'WORKING_MANNER',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 3,
        comment: 'ccc'
      },
      {
        id: 1,
        prRatingDescription: 'WORK_RESULTS',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 4,
        comment: 'ddd'
      },
      {
        id: 4,
        prRatingDescription: 'LEADERSHIP',
        prRatingCategory: 'IMPACT_ON_TEAM',
        rating: 5,
        comment: 'eee'
      },
      {
        id: 9,
        prRatingDescription: 'TEAMWORK',
        prRatingCategory: 'IMPACT_ON_TEAM',
        rating: 1,
        comment: 'fff'
      },
      {
        id: 5,
        prRatingDescription: 'PROBLEM_ANALYSIS',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 2,
        comment: 'ggg'
      },
      {
        id: 6,
        prRatingDescription: 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT',
        prRatingCategory: 'IMPACT_ON_COMPANY',
        rating: 3,
        comment: 'hhh'
      },
      {
        id: 7,
        prRatingDescription: 'CUSTOMER_INTERACTION',
        prRatingCategory: 'IMPACT_ON_CUSTOMER',
        rating: 4,
        comment: 'iii'
      }
    ],
    taskSet: [
      {
        id: 1,
        title: 'PR MMustermann: Bewerter bestimmen'
      },
      {
        id: 2,
        title: 'PR MMustermann: Terminierung'
      }
    ],
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1'
      }
    }
  };

  it('should display ProblemAnalysis', () => {
    const component = shallow(
      <StyledComponent prById={prById} category="PROBLEM_ANALYSIS" />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display Teamwork', () => {
    const component = shallow(
      <StyledComponent prById={prById} category="TEAMWORK" />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display Customer interaction', () => {
    const component = shallow(
      <StyledComponent prById={prById} category="CUSTOMER_INTERACTION" />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display the ContributionToCompanyDevelopment', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        category="CONTRIBUTION_TO_COMPANY_DEVELOPMENT"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
