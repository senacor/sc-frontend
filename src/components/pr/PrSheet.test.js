import React from 'react';
import { StyledComponent } from './PrSheet';
import { default as PrOverallAssessment } from './PrOverallAssessment';
import { createShallow } from '@material-ui/core/test-utils';
import ROLES from '../../helper/roles';

describe('PrSheet Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    employee: {
      id: 1,
      login: 'lschäfer',
      firstName: 'Lionel',
      lastName: 'Schäfer',
      title: 'DR',
      email: 'lionel.schäfer@senacor.com',
      entryDate: '2004-05-10',
      salaries: [],
      employment: {}
    },
    supervisor: 'ttran',
    occasion: 'ON_DEMAND',
    status: 'PREPARATION',
    deadline: '2015-05-11',
    statuses: [
      'FILLED_SHEET_EMPLOYEE',
      'FILLED_SHEET_REVIEWER',
      'ALL_DATES_ACCEPTED'
    ],
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1'
      }
    },
    prRatingSet: [
      {
        id: 29,
        prRatingDescription: 'FULFILLMENT_OF_REQUIREMENT',
        prRatingCategory: 'OVERALL_ASSESSMENT',
        rating: 3,
        comment: 'Everything is awesome!!!',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/29'
          }
        }
      },
      {
        id: 22,
        prRatingDescription: 'WORK_RESULTS',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 4,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/22'
          }
        }
      },
      {
        id: 24,
        prRatingDescription: 'CUSTOMER_INTERACTION',
        prRatingCategory: 'IMPACT_ON_CUSTOMER',
        rating: 5,
        comment: 'Employee uses Attract. It is super effective!',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/24'
          }
        }
      },
      {
        id: 30,
        prRatingDescription: 'TARGET_ROLE',
        prRatingCategory: 'OVERALL_ASSESSMENT',
        rating: 2,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/30'
          }
        }
      },
      {
        id: 26,
        prRatingDescription: 'LEADERSHIP',
        prRatingCategory: 'IMPACT_ON_TEAM',
        rating: 3,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/26'
          }
        }
      },
      {
        id: 27,
        prRatingDescription: 'TEAMWORK',
        prRatingCategory: 'IMPACT_ON_TEAM',
        rating: 3,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/27'
          }
        }
      },
      {
        id: 21,
        prRatingDescription: 'PROBLEM_ANALYSIS',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 4,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/21'
          }
        }
      },
      {
        id: 23,
        prRatingDescription: 'WORKING_MANNER',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 2,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/23'
          }
        }
      },
      {
        id: 25,
        prRatingDescription: 'CUSTOMER_RETENTION',
        prRatingCategory: 'IMPACT_ON_CUSTOMER',
        rating: 5,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/25'
          }
        }
      },
      {
        id: 28,
        prRatingDescription: 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT',
        prRatingCategory: 'IMPACT_ON_COMPANY',
        rating: 3,
        comment: null,
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/ratings/28'
          }
        }
      }
    ],
    prReflectionSet: [
      {
        id: 5,
        prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
        text:
          'We went on a hike together and my leader showed me the mountains',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/reflections/5'
          }
        }
      },
      {
        id: 6,
        prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
        text: 'I am a hiker now',
        _links: {
          self: {
            href: 'http://localhost:8010/api/v1/prs/3/reflections/6'
          }
        }
      }
    ],
    prVisibilityEntry: {
      visibilityToEmployee: 'INVISIBLE',
      visibilityToReviewer: 'VISIBLE'
    },
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    }
  };

  it('should display the PrSheet', () => {
    const fetchVisibilityMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        fetchPrVisibilityById={fetchVisibilityMock}
        userroles={[ROLES.PR_MITARBEITER]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("should not show the supervisor's comment or ratings", () => {
    const fetchVisibilityMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        fetchPrVisibilityById={fetchVisibilityMock}
        userroles={[ROLES.PR_MITARBEITER]}
      />
    );
    expect(
      component.contains(
        <PrOverallAssessment
          prById={prById}
          prVisible={false}
          prFinalized={false}
        />
      )
    ).toBe(true);
    expect(
      component.find('Connect(WithStyles(PrComment))[prVisible=false]')
    ).toHaveLength(8);
  });

  it("should show the employees's contributions", () => {
    const fetchVisibilityMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        fetchPrVisibilityById={fetchVisibilityMock}
        userroles={[ROLES.PR_MITARBEITER]}
      />
    );

    expect(
      component.find('Connect(WithStyles(PrSheetEmployee))[prVisible=true]')
    ).toHaveLength(2);
  });

  it("should display the supervisor's comment or ratings as readonly", () => {
    let statuses = {
      statuses: [
        'FILLED_SHEET_EMPLOYEE',
        'FILLED_SHEET_REVIEWER',
        'ALL_DATES_ACCEPTED',
        'MODIFICATIONS_ACCEPTED_REVIEWER'
      ]
    };

    let finalization = {
      prFinalizationStatus: {
        finalizationStatusOfEmployee: 'NOT_FINALIZED',
        finalizationStatusOfReviewer: 'FINALIZED'
      }
    };
    let prByIdWhichReviewerFinalized = Object.assign(
      prById,
      statuses,
      finalization
    );
    const fetchVisibilityMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prByIdWhichReviewerFinalized}
        fetchPrVisibilityById={fetchVisibilityMock}
        userroles={[ROLES.PR_CST_LEITER]}
      />
    );

    expect(
      component.contains(
        <PrOverallAssessment
          prById={prById}
          prVisible={true}
          prFinalized={true}
        />
      )
    ).toBe(true);

    expect(
      component.find('Connect(WithStyles(PrComment))[prFinalized=true]')
    ).toHaveLength(8);
  });
});
