import React from 'react';
import { StyledComponent } from './MyPRList';
import { createShallow } from '@material-ui/core/test-utils';
import MyPRListItem from './MyPRListItem';

describe('MyPRList Component', () => {
  let shallow = createShallow({ dive: true });

  const prs = [
    {
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
      occasion: 'YEARLY',
      status: 'PREPARATION',
      deadline: '2015-05-11',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1'
        }
      }
    },
    {
      id: 2,
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
      supervisor: 'test',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2222-05-11',
      _links: {
        self: {
          href: 'http://localhost:8010/api/v1/prs/1'
        }
      }
    }
  ];

  it('displays the MyPRList', () => {
    const component = shallow(<StyledComponent prs={prs} />);

    expect(component).toMatchSnapshot();
  });

  it('filters PRs according to a reviewer', () => {
    const wrapper = shallow(<StyledComponent prs={prs} />);
    expect(wrapper.find('[reviewer="ttran"]')).toHaveLength(2);

    wrapper.setState({ filters: { reviewer: 'S1', occasion: 'ALL' } });

    expect(wrapper.find('[reviewer="ttran"]')).toHaveLength(0);
  });

  it('should filter by occasion', () => {
    const wrapper = shallow(
      <StyledComponent
        prs={prs}
        filters={{ reviewer: 'ALL', occasion: 'ALL' }}
      />
    );
    const text_ondemand = wrapper.instance().translateOccasion('ON_DEMAND');
    const text_yearly = wrapper.instance().translateOccasion('YEARLY');
    expect(wrapper.find('[occasion="' + text_ondemand + '"]')).toHaveLength(2);
    expect(wrapper.find('[occasion="' + text_yearly + '"]')).toHaveLength(2);

    wrapper.setState({ filters: { reviewer: 'ALL', occasion: 'ON_DEMAND' } });

    expect(wrapper.find('[occasion="' + text_ondemand + '"]')).toHaveLength(2);
    expect(wrapper.find('[occasion="' + text_yearly + '"]')).toHaveLength(0);
  });

  it('should filter by reviewer and occasion at the same time', () => {
    const wrapper = shallow(
      <StyledComponent
        prs={prs}
        filters={{ reviewer: 'ALL', occasion: 'ALL' }}
      />
    );
    const text_ondemand = wrapper.instance().translateOccasion('ON_DEMAND');
    const text_yearly = wrapper.instance().translateOccasion('YEARLY');
    expect(wrapper.find('[reviewer="ttran"]')).toHaveLength(2);
    expect(wrapper.find('[reviewer="test"]')).toHaveLength(2);
    expect(wrapper.find('[occasion="' + text_ondemand + '"]')).toHaveLength(2);
    expect(wrapper.find('[occasion="' + text_yearly + '"]')).toHaveLength(2);

    wrapper.setState({ filters: { reviewer: 'ttran', occasion: 'ON_DEMAND' } });

    expect(wrapper.find('[reviewer="ttran"]')).toHaveLength(0);
  });

  it('sorts the MyPRList in given order', () => {
    const wrapper = shallow(<StyledComponent prs={prs} />);
    expect(wrapper.find('[deadline]').get(0).props.deadline).toEqual(
      '2015-05-11'
    );
    expect(wrapper.find('[deadline]').get(1).props.deadline).toEqual(
      '2222-05-11'
    );
    wrapper.setState({ sortDateInAscOrder: false });
    expect(wrapper.find('[deadline]').get(0).props.deadline).toEqual(
      '2222-05-11'
    );
    expect(wrapper.find('[deadline]').get(1).props.deadline).toEqual(
      '2015-05-11'
    );
  });
});
