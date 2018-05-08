import React from 'react';
import PrSalary from './PrSalary';
import { createShallow } from 'material-ui/test-utils';

describe('PrSalary Component', () => {
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
      costCenters: [
        {
          name: 'WRJ',
          supervisorId: 1,
          costCenterId: 10
        },
        {
          name: 'KLC',
          supervisorId: 1,
          costCenterId: 50
        },
        {
          name: 'NPU',
          supervisorId: 1,
          costCenterId: 30
        },
        {
          name: 'CYP',
          supervisorId: 1,
          costCenterId: 40
        },
        {
          name: 'BOH',
          supervisorId: 1,
          costCenterId: 20
        }
      ],
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
            }
          ]
        }
      },
      staffings: [
        {
          costCenterId: 34,
          date: '2018-03-16'
        },
        {
          costCenterId: 8,
          date: '2018-04-04'
        }
      ],
      scorecards: []
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

  it('tests the addAllValues function', () => {
    const output = [
      { validFrom: '2004-05-10', reason: 'Ende der Probezeit' },
      { validFrom: '2004-05-10', ote: 45000, fte: 1 },
      { validFrom: '2005-05-10', ote: 50000, fte: 1 },
      {
        validFrom: '2004-05-10',
        validTo: '2005-03-31',
        reason: 'Unbezahlter Urlaub'
      },
      {
        validFrom: '2004-05-10',
        validTo: '2004-10-11',
        reason: 'Mutterschutz'
      },
      { validFrom: '2004-05-10', validTo: '2004-08-28', reason: 'Elternzeit' },
      {
        validFrom: '2004-05-10',
        validTo: '2004-06-07',
        reason: 'Forschungsurlaub'
      }
    ];
    const component = shallow(<PrSalary prById={prById} />);
    expect(component.instance().addAllValues(prById)).toEqual(output);
  });

  it('displays the PrSalary', () => {
    const component = shallow(<PrSalary prById={prById} />);
    expect(component).toMatchSnapshot();
  });
});
