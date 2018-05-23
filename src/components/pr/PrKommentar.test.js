import React from 'react';
import { StyledComponent } from './PrKommentar';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrKommentar Component', () => {
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
      salaries: [
        {
          workingHoursPerWeek: 40,
          ote: 45000,
          fte: 1,
          basicSalary: 40500,
          validFrom: '2004-05-10'
        },
        {
          workingHoursPerWeek: 40,
          ote: 50000,
          fte: 1,
          basicSalary: 40000,
          validFrom: '2005-05-10'
        }
      ],
      employment: {
        endOfProbationPeriod: '2004-05-10',
        jobGradings: [
          {
            positionId: 1,
            salaryLevel: 1,
            validFrom: '2004-05-09',
            competence: 'DEVELOPMENT'
          },
          {
            positionId: 2,
            salaryLevel: 2,
            validFrom: '2005-05-09',
            competence: 'DEVELOPMENT'
          }
        ],
        leaves: {
          unpaidLeave: [
            {
              from: '2004-05-10',
              to: '2005-03-31'
            }
          ],
          maternityLeave: [
            {
              from: '2004-05-10',
              to: '2004-10-11'
            }
          ],
          parentalLeave: [
            {
              from: '2004-05-10',
              to: '2004-08-28'
            }
          ],
          sabbatical: [
            {
              from: '2004-05-10',
              to: '2004-06-07'
            },
            {
              from: '2004-05-10',
              to: '2005-02-10'
            },
            {
              from: '2004-05-10',
              to: '2005-03-26'
            }
          ]
        }
      }
    },
    supervisor: 'ttran',
    occasion: 'ON_DEMAND',
    status: 'PREPARATION',
    deadline: '2018-03-14',
    prRatingSet: [
      {
        id: 2,
        prRatingDescription: 'CUSTOMER_RETENTION',
        prRatingCategory: 'IMPACT_ON_CUSTOMER',
        rating: null,
        comment: null
      },
      {
        id: 8,
        prRatingDescription: 'FREE_TEXT_FIELD',
        prRatingCategory: 'OVERALL_ASSESSMENT',
        rating: null,
        comment: null
      },
      {
        id: 3,
        prRatingDescription: 'WORKING_MANNER',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 1,
        comment: 'nestojjkfgjdkghjrighjfkr'
      },
      {
        id: 1,
        prRatingDescription: 'WORK_RESULTS',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 2,
        comment: 'kköhhjcsss'
      },
      {
        id: 4,
        prRatingDescription: 'LEADERSHIP',
        prRatingCategory: 'IMPACT_ON_TEAM',
        rating: null,
        comment: null
      },
      {
        id: 9,
        prRatingDescription: 'TEAMWORK',
        prRatingCategory: 'IMPACT_ON_TEAM',
        rating: null,
        comment: null
      },
      {
        id: 5,
        prRatingDescription: 'PROBLEM_ANALYSIS',
        prRatingCategory: 'PERFORMANCE_IN_PROJECT',
        rating: 5,
        comment: 'kvvvuierkfjrfhkrehghfj'
      },
      {
        id: 6,
        prRatingDescription: 'CONTRIBUTION_TO_COMPANY_DEVELOPMENT',
        prRatingCategory: 'IMPACT_ON_COMPANY',
        rating: null,
        comment: null
      },
      {
        id: 7,
        prRatingDescription: 'CUSTOMER_INTERACTION',
        prRatingCategory: 'IMPACT_ON_CUSTOMER',
        rating: null,
        comment: null
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

  it('displays the PrKommentar', () => {
    const component = shallow(
      <StyledComponent prById={prById} category="PROBLEM_ANALYSIS" />
    );

    expect(component).toMatchSnapshot();
  });
});
