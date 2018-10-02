/*
 *
 * DEPRECATED
 *
 */
import React from 'react';
import { getFinishedMilestones, StyledComponent } from './PrState';
import { prStatusEnum } from '../../helper/prStatus';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrState Component', () => {
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
    prFinalizationStatus: {
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    },
    supervisor: 'ttran',
    occasion: 'ON_DEMAND',
    status: 'PREPARATION',
    deadline: '2015-05-11',
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1'
      }
    }
  };

  let dummyStatusMap = {};

  it('displays the PrState', () => {
    const component = shallow(
      <StyledComponent prById={prById} prStatusesDone={dummyStatusMap} />
    );

    expect(component).toMatchSnapshot();
  });

  it('sets step 2 as active for a released sheed and fixed date', () => {
    const statusMap = {
      [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: true,
      [prStatusEnum.RELEASED_SHEET_REVIEWER]: true,
      [prStatusEnum.FIXED_DATE]: true,
      [prStatusEnum.FINALIZED_REVIEWER]: false,
      [prStatusEnum.FINALIZED_EMPLOYEE]: false,
      [prStatusEnum.ARCHIVED_HR]: false
    };
    const component = shallow(
      <StyledComponent prById={prById} prStatusesDone={statusMap} />
    );

    expect(component.find('WithStyles(Typography)')).toHaveLength(3);
    expect(component.find('[activeStep=1]')).toHaveLength(1);
  });
});

describe('The getFinishedMilestone function', () => {
  it('correctly transforms the statuses to a boolean map', () => {
    let selector = getFinishedMilestones();
    const prInput = {
      statuses: [prStatusEnum.FINALIZED_REVIEWER, prStatusEnum.FIXED_DATE]
    };
    const expectedMap = {
      [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: false,
      [prStatusEnum.RELEASED_SHEET_REVIEWER]: false,
      [prStatusEnum.FIXED_DATE]: true,
      [prStatusEnum.FINALIZED_REVIEWER]: true,
      [prStatusEnum.FINALIZED_EMPLOYEE]: false,
      [prStatusEnum.ARCHIVED_HR]: false
    };

    expect(selector({ prs: [prInput], prDetailId: 0 })).toEqual(expectedMap);
  });
});
