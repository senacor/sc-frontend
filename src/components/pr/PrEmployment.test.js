import React from 'react';
import PrEmployment from './PrEmployment';
import { createShallow } from 'material-ui/test-utils';

describe('PrEmployment Component', () => {
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
      },
      staffings: [
        {
          costCenterId: 34,
          date: '2018-03-16'
        },
        {
          costCenterId: 34,
          date: '2018-11-16'
        },
        {
          costCenterId: 34,
          date: '2018-03-15'
        },
        {
          costCenterId: 8,
          date: '2018-03-13'
        },
        {
          costCenterId: 34,
          date: '2018-11-14'
        },
        {
          costCenterId: 34,
          date: '2018-03-14'
        },
        {
          costCenterId: 8,
          date: '2018-03-12'
        },
        {
          costCenterId: 34,
          date: '2018-11-13'
        },
        {
          costCenterId: 8,
          date: '2018-03-10'
        },
        {
          costCenterId: 34,
          date: '2018-11-12'
        },
        {
          costCenterId: 34,
          date: '2018-03-11'
        },
        {
          costCenterId: 8,
          date: '2018-03-09'
        },
        {
          costCenterId: 34,
          date: '2018-11-11'
        },
        {
          costCenterId: 8,
          date: '2018-11-09'
        },
        {
          costCenterId: 8,
          date: '2018-03-08'
        },
        {
          costCenterId: 34,
          date: '2018-11-10'
        },
        {
          costCenterId: 8,
          date: '2018-11-08'
        },
        {
          costCenterId: 8,
          date: '2018-03-07'
        },
        {
          costCenterId: 8,
          date: '2018-11-07'
        },
        {
          costCenterId: 8,
          date: '2018-11-06'
        },
        {
          costCenterId: 8,
          date: '2018-11-05'
        },
        {
          costCenterId: 8,
          date: '2018-03-05'
        },
        {
          costCenterId: 8,
          date: '2018-11-04'
        },
        {
          costCenterId: 34,
          date: '2018-03-06'
        },
        {
          costCenterId: 8,
          date: '2018-03-03'
        },
        {
          costCenterId: 8,
          date: '2018-03-02'
        },
        {
          costCenterId: 8,
          date: '2018-11-02'
        },
        {
          costCenterId: 34,
          date: '2018-03-04'
        },
        {
          costCenterId: 8,
          date: '2018-03-01'
        },
        {
          costCenterId: 34,
          date: '2018-11-03'
        },
        {
          costCenterId: 8,
          date: '2018-11-01'
        },
        {
          costCenterId: 8,
          date: '2018-10-30'
        },
        {
          costCenterId: 8,
          date: '2018-10-29'
        },
        {
          costCenterId: 34,
          date: '2018-10-31'
        },
        {
          costCenterId: 8,
          date: '2018-10-28'
        },
        {
          costCenterId: 8,
          date: '2018-02-28'
        },
        {
          costCenterId: 8,
          date: '2018-02-26'
        },
        {
          costCenterId: 34,
          date: '2018-02-27'
        },
        {
          costCenterId: 34,
          date: '2018-10-27'
        },
        {
          costCenterId: 8,
          date: '2018-02-25'
        },
        {
          costCenterId: 8,
          date: '2018-10-25'
        },
        {
          costCenterId: 8,
          date: '2018-02-24'
        },
        {
          costCenterId: 34,
          date: '2018-10-26'
        },
        {
          costCenterId: 8,
          date: '2018-10-24'
        },
        {
          costCenterId: 8,
          date: '2018-02-23'
        },
        {
          costCenterId: 8,
          date: '2018-02-22'
        },
        {
          costCenterId: 34,
          date: '2018-10-23'
        },
        {
          costCenterId: 34,
          date: '2018-10-22'
        },
        {
          costCenterId: 8,
          date: '2018-10-20'
        },
        {
          costCenterId: 34,
          date: '2018-02-21'
        },
        {
          costCenterId: 34,
          date: '2018-10-21'
        },
        {
          costCenterId: 8,
          date: '2018-02-19'
        },
        {
          costCenterId: 8,
          date: '2018-10-19'
        },
        {
          costCenterId: 8,
          date: '2018-10-18'
        },
        {
          costCenterId: 34,
          date: '2018-02-20'
        },
        {
          costCenterId: 34,
          date: '2018-02-18'
        },
        {
          costCenterId: 8,
          date: '2018-10-15'
        },
        {
          costCenterId: 8,
          date: '2018-02-15'
        },
        {
          costCenterId: 34,
          date: '2018-02-17'
        },
        {
          costCenterId: 34,
          date: '2018-10-17'
        },
        {
          costCenterId: 8,
          date: '2018-12-14'
        },
        {
          costCenterId: 34,
          date: '2018-12-16'
        },
        {
          costCenterId: 34,
          date: '2018-04-16'
        },
        {
          costCenterId: 34,
          date: '2018-12-15'
        },
        {
          costCenterId: 8,
          date: '2018-12-13'
        },
        {
          costCenterId: 34,
          date: '2018-04-14'
        },
        {
          costCenterId: 8,
          date: '2018-12-12'
        },
        {
          costCenterId: 34,
          date: '2018-04-13'
        },
        {
          costCenterId: 8,
          date: '2018-04-10'
        },
        {
          costCenterId: 34,
          date: '2018-04-12'
        },
        {
          costCenterId: 8,
          date: '2018-12-10'
        },
        {
          costCenterId: 34,
          date: '2018-04-11'
        },
        {
          costCenterId: 8,
          date: '2018-12-09'
        },
        {
          costCenterId: 34,
          date: '2018-12-11'
        },
        {
          costCenterId: 8,
          date: '2018-04-09'
        },
        {
          costCenterId: 8,
          date: '2018-04-08'
        },
        {
          costCenterId: 34,
          date: '2018-12-08'
        },
        {
          costCenterId: 8,
          date: '2018-04-06'
        },
        {
          costCenterId: 34,
          date: '2018-12-07'
        },
        {
          costCenterId: 34,
          date: '2018-04-07'
        },
        {
          costCenterId: 8,
          date: '2018-04-04'
        },
        {
          costCenterId: 8,
          date: '2018-12-04'
        },
        {
          costCenterId: 34,
          date: '2018-12-06'
        },
        {
          costCenterId: 8,
          date: '2018-04-03'
        },
        {
          costCenterId: 34,
          date: '2018-04-05'
        },
        {
          costCenterId: 34,
          date: '2018-12-05'
        },
        {
          costCenterId: 8,
          date: '2018-12-02'
        },
        {
          costCenterId: 8,
          date: '2018-04-02'
        },
        {
          costCenterId: 8,
          date: '2018-12-01'
        },
        {
          costCenterId: 34,
          date: '2018-12-03'
        },
        {
          costCenterId: 34,
          date: '2018-04-01'
        },
        {
          costCenterId: 8,
          date: '2018-03-31'
        },
        {
          costCenterId: 8,
          date: '2018-11-30'
        },
        {
          costCenterId: 8,
          date: '2018-03-28'
        },
        {
          costCenterId: 34,
          date: '2018-03-30'
        },
        {
          costCenterId: 34,
          date: '2018-03-29'
        },
        {
          costCenterId: 34,
          date: '2018-11-29'
        },
        {
          costCenterId: 34,
          date: '2018-11-28'
        },
        {
          costCenterId: 8,
          date: '2018-03-26'
        },
        {
          costCenterId: 34,
          date: '2018-03-27'
        },
        {
          costCenterId: 8,
          date: '2018-11-25'
        },
        {
          costCenterId: 34,
          date: '2018-11-27'
        },
        {
          costCenterId: 34,
          date: '2018-11-26'
        },
        {
          costCenterId: 34,
          date: '2018-03-25'
        },
        {
          costCenterId: 8,
          date: '2018-03-23'
        },
        {
          costCenterId: 8,
          date: '2018-11-23'
        },
        {
          costCenterId: 34,
          date: '2018-03-24'
        },
        {
          costCenterId: 34,
          date: '2018-11-24'
        },
        {
          costCenterId: 8,
          date: '2018-03-21'
        },
        {
          costCenterId: 34,
          date: '2018-03-22'
        },
        {
          costCenterId: 8,
          date: '2018-03-20'
        },
        {
          costCenterId: 34,
          date: '2018-11-22'
        },
        {
          costCenterId: 34,
          date: '2018-11-21'
        },
        {
          costCenterId: 8,
          date: '2018-03-18'
        },
        {
          costCenterId: 34,
          date: '2018-11-20'
        },
        {
          costCenterId: 34,
          date: '2018-11-19'
        },
        {
          costCenterId: 34,
          date: '2018-03-19'
        },
        {
          costCenterId: 34,
          date: '2018-11-18'
        },
        {
          costCenterId: 34,
          date: '2018-03-17'
        },
        {
          costCenterId: 34,
          date: '2018-11-17'
        },
        {
          costCenterId: 8,
          date: '2018-11-15'
        },
        {
          costCenterId: 34,
          date: '2018-05-16'
        },
        {
          costCenterId: 8,
          date: '2018-05-14'
        },
        {
          costCenterId: 8,
          date: '2018-05-13'
        },
        {
          costCenterId: 34,
          date: '2018-05-15'
        },
        {
          costCenterId: 8,
          date: '2018-05-12'
        },
        {
          costCenterId: 8,
          date: '2018-05-10'
        },
        {
          costCenterId: 34,
          date: '2018-05-11'
        },
        {
          costCenterId: 8,
          date: '2018-05-09'
        },
        {
          costCenterId: 8,
          date: '2018-05-07'
        },
        {
          costCenterId: 34,
          date: '2018-05-08'
        },
        {
          costCenterId: 8,
          date: '2018-05-06'
        },
        {
          costCenterId: 8,
          date: '2018-05-05'
        },
        {
          costCenterId: 8,
          date: '2018-05-04'
        },
        {
          costCenterId: 8,
          date: '2018-05-02'
        },
        {
          costCenterId: 34,
          date: '2018-05-03'
        },
        {
          costCenterId: 8,
          date: '2018-05-01'
        },
        {
          costCenterId: 8,
          date: '2018-12-30'
        },
        {
          costCenterId: 8,
          date: '2018-04-30'
        },
        {
          costCenterId: 8,
          date: '2018-12-29'
        },
        {
          costCenterId: 34,
          date: '2018-12-31'
        },
        {
          costCenterId: 8,
          date: '2018-04-28'
        },
        {
          costCenterId: 8,
          date: '2018-12-27'
        },
        {
          costCenterId: 34,
          date: '2018-04-29'
        },
        {
          costCenterId: 8,
          date: '2018-12-26'
        },
        {
          costCenterId: 34,
          date: '2018-12-28'
        },
        {
          costCenterId: 8,
          date: '2018-04-25'
        },
        {
          costCenterId: 8,
          date: '2018-12-25'
        },
        {
          costCenterId: 34,
          date: '2018-04-27'
        },
        {
          costCenterId: 34,
          date: '2018-04-26'
        },
        {
          costCenterId: 8,
          date: '2018-12-24'
        },
        {
          costCenterId: 8,
          date: '2018-12-23'
        },
        {
          costCenterId: 8,
          date: '2018-04-23'
        },
        {
          costCenterId: 34,
          date: '2018-04-24'
        },
        {
          costCenterId: 8,
          date: '2018-04-21'
        },
        {
          costCenterId: 34,
          date: '2018-12-22'
        },
        {
          costCenterId: 8,
          date: '2018-04-20'
        },
        {
          costCenterId: 34,
          date: '2018-04-22'
        },
        {
          costCenterId: 8,
          date: '2018-12-20'
        },
        {
          costCenterId: 34,
          date: '2018-12-21'
        },
        {
          costCenterId: 34,
          date: '2018-04-19'
        },
        {
          costCenterId: 34,
          date: '2018-12-19'
        },
        {
          costCenterId: 8,
          date: '2018-04-17'
        },
        {
          costCenterId: 34,
          date: '2018-04-18'
        },
        {
          costCenterId: 34,
          date: '2018-12-18'
        },
        {
          costCenterId: 34,
          date: '2018-12-17'
        },
        {
          costCenterId: 8,
          date: '2018-04-15'
        },
        {
          costCenterId: 34,
          date: '2018-06-16'
        },
        {
          costCenterId: 8,
          date: '2018-06-13'
        },
        {
          costCenterId: 34,
          date: '2018-06-14'
        },
        {
          costCenterId: 8,
          date: '2018-06-11'
        },
        {
          costCenterId: 34,
          date: '2018-06-12'
        },
        {
          costCenterId: 8,
          date: '2018-06-09'
        },
        {
          costCenterId: 34,
          date: '2018-06-10'
        },
        {
          costCenterId: 8,
          date: '2018-06-08'
        },
        {
          costCenterId: 34,
          date: '2018-06-07'
        },
        {
          costCenterId: 8,
          date: '2018-06-05'
        },
        {
          costCenterId: 8,
          date: '2018-06-04'
        },
        {
          costCenterId: 34,
          date: '2018-06-06'
        },
        {
          costCenterId: 8,
          date: '2018-06-02'
        },
        {
          costCenterId: 34,
          date: '2018-06-03'
        },
        {
          costCenterId: 34,
          date: '2018-06-01'
        },
        {
          costCenterId: 8,
          date: '2018-05-31'
        },
        {
          costCenterId: 8,
          date: '2018-05-30'
        },
        {
          costCenterId: 8,
          date: '2018-05-29'
        },
        {
          costCenterId: 8,
          date: '2018-05-28'
        },
        {
          costCenterId: 34,
          date: '2018-05-27'
        },
        {
          costCenterId: 34,
          date: '2018-05-26'
        },
        {
          costCenterId: 34,
          date: '2018-05-25'
        },
        {
          costCenterId: 8,
          date: '2018-05-23'
        },
        {
          costCenterId: 34,
          date: '2018-05-24'
        },
        {
          costCenterId: 8,
          date: '2018-05-21'
        },
        {
          costCenterId: 34,
          date: '2018-05-22'
        },
        {
          costCenterId: 34,
          date: '2018-05-20'
        },
        {
          costCenterId: 8,
          date: '2018-05-18'
        },
        {
          costCenterId: 34,
          date: '2018-05-19'
        },
        {
          costCenterId: 34,
          date: '2018-05-17'
        },
        {
          costCenterId: 34,
          date: '2018-07-16'
        },
        {
          costCenterId: 8,
          date: '2018-07-12'
        },
        {
          costCenterId: 34,
          date: '2018-07-14'
        },
        {
          costCenterId: 34,
          date: '2018-07-13'
        },
        {
          costCenterId: 8,
          date: '2018-07-09'
        },
        {
          costCenterId: 34,
          date: '2018-07-11'
        },
        {
          costCenterId: 8,
          date: '2018-07-08'
        },
        {
          costCenterId: 34,
          date: '2018-07-10'
        },
        {
          costCenterId: 8,
          date: '2018-07-07'
        },
        {
          costCenterId: 8,
          date: '2018-07-06'
        },
        {
          costCenterId: 8,
          date: '2018-07-05'
        },
        {
          costCenterId: 8,
          date: '2018-07-03'
        },
        {
          costCenterId: 34,
          date: '2018-07-04'
        },
        {
          costCenterId: 8,
          date: '2018-07-02'
        },
        {
          costCenterId: 34,
          date: '2018-07-01'
        },
        {
          costCenterId: 8,
          date: '2018-06-30'
        },
        {
          costCenterId: 34,
          date: '2018-06-29'
        },
        {
          costCenterId: 34,
          date: '2018-06-28'
        },
        {
          costCenterId: 34,
          date: '2018-06-27'
        },
        {
          costCenterId: 8,
          date: '2018-06-24'
        },
        {
          costCenterId: 34,
          date: '2018-06-26'
        },
        {
          costCenterId: 34,
          date: '2018-06-25'
        },
        {
          costCenterId: 8,
          date: '2018-06-22'
        },
        {
          costCenterId: 8,
          date: '2018-06-21'
        },
        {
          costCenterId: 34,
          date: '2018-06-23'
        },
        {
          costCenterId: 8,
          date: '2018-06-20'
        },
        {
          costCenterId: 8,
          date: '2018-06-18'
        },
        {
          costCenterId: 34,
          date: '2018-06-19'
        },
        {
          costCenterId: 8,
          date: '2018-06-15'
        },
        {
          costCenterId: 34,
          date: '2018-06-17'
        },
        {
          costCenterId: 34,
          date: '2018-08-16'
        },
        {
          costCenterId: 34,
          date: '2018-08-15'
        },
        {
          costCenterId: 34,
          date: '2018-08-14'
        },
        {
          costCenterId: 34,
          date: '2018-08-13'
        },
        {
          costCenterId: 8,
          date: '2018-08-11'
        },
        {
          costCenterId: 34,
          date: '2018-08-12'
        },
        {
          costCenterId: 34,
          date: '2018-08-10'
        },
        {
          costCenterId: 8,
          date: '2018-08-08'
        },
        {
          costCenterId: 34,
          date: '2018-08-09'
        },
        {
          costCenterId: 8,
          date: '2018-08-07'
        },
        {
          costCenterId: 8,
          date: '2018-08-06'
        },
        {
          costCenterId: 8,
          date: '2018-08-05'
        },
        {
          costCenterId: 8,
          date: '2018-08-03'
        },
        {
          costCenterId: 34,
          date: '2018-08-04'
        },
        {
          costCenterId: 8,
          date: '2018-08-02'
        },
        {
          costCenterId: 34,
          date: '2018-08-01'
        },
        {
          costCenterId: 8,
          date: '2018-07-30'
        },
        {
          costCenterId: 34,
          date: '2018-07-31'
        },
        {
          costCenterId: 8,
          date: '2018-07-28'
        },
        {
          costCenterId: 34,
          date: '2018-07-29'
        },
        {
          costCenterId: 34,
          date: '2018-07-27'
        },
        {
          costCenterId: 8,
          date: '2018-07-24'
        },
        {
          costCenterId: 34,
          date: '2018-07-26'
        },
        {
          costCenterId: 8,
          date: '2018-07-23'
        },
        {
          costCenterId: 34,
          date: '2018-07-25'
        },
        {
          costCenterId: 8,
          date: '2018-07-20'
        },
        {
          costCenterId: 34,
          date: '2018-07-22'
        },
        {
          costCenterId: 34,
          date: '2018-07-21'
        },
        {
          costCenterId: 34,
          date: '2018-07-19'
        },
        {
          costCenterId: 34,
          date: '2018-07-18'
        },
        {
          costCenterId: 8,
          date: '2018-07-15'
        },
        {
          costCenterId: 34,
          date: '2018-07-17'
        },
        {
          costCenterId: 34,
          date: '2018-01-16'
        },
        {
          costCenterId: 34,
          date: '2018-09-16'
        },
        {
          costCenterId: 8,
          date: '2018-01-14'
        },
        {
          costCenterId: 8,
          date: '2018-09-13'
        },
        {
          costCenterId: 34,
          date: '2018-09-15'
        },
        {
          costCenterId: 34,
          date: '2018-09-14'
        },
        {
          costCenterId: 8,
          date: '2018-01-11'
        },
        {
          costCenterId: 34,
          date: '2018-01-13'
        },
        {
          costCenterId: 8,
          date: '2018-01-10'
        },
        {
          costCenterId: 34,
          date: '2018-01-12'
        },
        {
          costCenterId: 8,
          date: '2018-09-10'
        },
        {
          costCenterId: 34,
          date: '2018-09-12'
        },
        {
          costCenterId: 8,
          date: '2018-01-09'
        },
        {
          costCenterId: 8,
          date: '2018-09-09'
        },
        {
          costCenterId: 34,
          date: '2018-09-11'
        },
        {
          costCenterId: 8,
          date: '2018-01-08'
        },
        {
          costCenterId: 8,
          date: '2018-09-08'
        },
        {
          costCenterId: 8,
          date: '2018-09-07'
        },
        {
          costCenterId: 8,
          date: '2018-01-07'
        },
        {
          costCenterId: 8,
          date: '2018-09-06'
        },
        {
          costCenterId: 8,
          date: '2018-01-05'
        },
        {
          costCenterId: 8,
          date: '2018-01-04'
        },
        {
          costCenterId: 34,
          date: '2018-01-06'
        },
        {
          costCenterId: 34,
          date: '2018-09-05'
        },
        {
          costCenterId: 8,
          date: '2018-09-03'
        },
        {
          costCenterId: 8,
          date: '2018-01-03'
        },
        {
          costCenterId: 34,
          date: '2018-09-04'
        },
        {
          costCenterId: 8,
          date: '2018-01-02'
        },
        {
          costCenterId: 8,
          date: '2018-09-01'
        },
        {
          costCenterId: 8,
          date: '2018-01-01'
        },
        {
          costCenterId: 34,
          date: '2018-09-02'
        },
        {
          costCenterId: 34,
          date: '2018-08-31'
        },
        {
          costCenterId: 8,
          date: '2018-08-28'
        },
        {
          costCenterId: 34,
          date: '2018-08-30'
        },
        {
          costCenterId: 34,
          date: '2018-08-29'
        },
        {
          costCenterId: 34,
          date: '2018-08-27'
        },
        {
          costCenterId: 8,
          date: '2018-08-25'
        },
        {
          costCenterId: 34,
          date: '2018-08-26'
        },
        {
          costCenterId: 8,
          date: '2018-08-24'
        },
        {
          costCenterId: 8,
          date: '2018-08-22'
        },
        {
          costCenterId: 34,
          date: '2018-08-23'
        },
        {
          costCenterId: 34,
          date: '2018-08-21'
        },
        {
          costCenterId: 34,
          date: '2018-08-20'
        },
        {
          costCenterId: 34,
          date: '2018-08-19'
        },
        {
          costCenterId: 8,
          date: '2018-08-17'
        },
        {
          costCenterId: 34,
          date: '2018-08-18'
        },
        {
          costCenterId: 34,
          date: '2018-02-16'
        },
        {
          costCenterId: 8,
          date: '2018-10-14'
        },
        {
          costCenterId: 34,
          date: '2018-10-16'
        },
        {
          costCenterId: 8,
          date: '2018-10-13'
        },
        {
          costCenterId: 34,
          date: '2018-02-14'
        },
        {
          costCenterId: 8,
          date: '2018-02-11'
        },
        {
          costCenterId: 34,
          date: '2018-02-13'
        },
        {
          costCenterId: 34,
          date: '2018-10-12'
        },
        {
          costCenterId: 34,
          date: '2018-02-12'
        },
        {
          costCenterId: 34,
          date: '2018-10-11'
        },
        {
          costCenterId: 34,
          date: '2018-10-10'
        },
        {
          costCenterId: 34,
          date: '2018-02-10'
        },
        {
          costCenterId: 8,
          date: '2018-02-07'
        },
        {
          costCenterId: 34,
          date: '2018-02-09'
        },
        {
          costCenterId: 34,
          date: '2018-10-09'
        },
        {
          costCenterId: 34,
          date: '2018-10-08'
        },
        {
          costCenterId: 34,
          date: '2018-02-08'
        },
        {
          costCenterId: 34,
          date: '2018-10-07'
        },
        {
          costCenterId: 34,
          date: '2018-10-06'
        },
        {
          costCenterId: 34,
          date: '2018-02-06'
        },
        {
          costCenterId: 8,
          date: '2018-10-04'
        },
        {
          costCenterId: 8,
          date: '2018-02-04'
        },
        {
          costCenterId: 34,
          date: '2018-10-05'
        },
        {
          costCenterId: 8,
          date: '2018-02-03'
        },
        {
          costCenterId: 34,
          date: '2018-02-05'
        },
        {
          costCenterId: 8,
          date: '2018-02-01'
        },
        {
          costCenterId: 34,
          date: '2018-10-03'
        },
        {
          costCenterId: 34,
          date: '2018-10-02'
        },
        {
          costCenterId: 34,
          date: '2018-02-02'
        },
        {
          costCenterId: 34,
          date: '2018-10-01'
        },
        {
          costCenterId: 8,
          date: '2018-09-30'
        },
        {
          costCenterId: 34,
          date: '2018-01-31'
        },
        {
          costCenterId: 8,
          date: '2018-09-29'
        },
        {
          costCenterId: 34,
          date: '2018-01-30'
        },
        {
          costCenterId: 8,
          date: '2018-01-28'
        },
        {
          costCenterId: 8,
          date: '2018-01-27'
        },
        {
          costCenterId: 34,
          date: '2018-01-29'
        },
        {
          costCenterId: 8,
          date: '2018-09-27'
        },
        {
          costCenterId: 34,
          date: '2018-09-28'
        },
        {
          costCenterId: 8,
          date: '2018-01-26'
        },
        {
          costCenterId: 8,
          date: '2018-09-26'
        },
        {
          costCenterId: 8,
          date: '2018-01-25'
        },
        {
          costCenterId: 8,
          date: '2018-09-25'
        },
        {
          costCenterId: 8,
          date: '2018-01-24'
        },
        {
          costCenterId: 8,
          date: '2018-09-24'
        },
        {
          costCenterId: 8,
          date: '2018-01-23'
        },
        {
          costCenterId: 8,
          date: '2018-09-23'
        },
        {
          costCenterId: 8,
          date: '2018-09-22'
        },
        {
          costCenterId: 8,
          date: '2018-01-22'
        },
        {
          costCenterId: 8,
          date: '2018-09-20'
        },
        {
          costCenterId: 8,
          date: '2018-01-20'
        },
        {
          costCenterId: 34,
          date: '2018-09-21'
        },
        {
          costCenterId: 8,
          date: '2018-01-19'
        },
        {
          costCenterId: 34,
          date: '2018-01-21'
        },
        {
          costCenterId: 8,
          date: '2018-01-18'
        },
        {
          costCenterId: 8,
          date: '2018-09-18'
        },
        {
          costCenterId: 8,
          date: '2018-01-17'
        },
        {
          costCenterId: 8,
          date: '2018-09-17'
        },
        {
          costCenterId: 34,
          date: '2018-09-19'
        },
        {
          costCenterId: 8,
          date: '2018-01-15'
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

  it('displays the PrEmployment', () => {
    const component = shallow(<PrEmployment prById={prById} />);

    expect(component).toMatchSnapshot();
  });
});
