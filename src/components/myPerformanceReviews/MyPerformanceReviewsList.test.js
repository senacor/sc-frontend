import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent as MyPerformanceReviewsList } from './MyPerformanceReviewsList';

describe('MyPerformanceReviewsList', () => {
  let shallow = createShallow({ dive: true });
  let prs;
  beforeEach(() => {
    prs = [
      {
        id: 1,
        deadline: '2018-03-01',
        occasion: 'ON_DEMAND',
        supervisor: {
          login: 'test.pr.vorgesetzter',
          firstName: 'Volker',
          lastName: 'Vorgesetzter'
        },
        employee: { login: 'test.pr.mitarbeiter1' }
      },
      {
        id: 2,
        deadline: '2018-02-01',
        occasion: 'ON_DEMAND',
        supervisor: {
          login: 'test.pr.vorgesetzter',
          firstName: 'Volker',
          lastName: 'Vorgesetzter'
        },
        employee: { login: 'test.pr.mitarbeiter1' }
      },
      {
        id: 3,
        deadline: '2018-01-01',
        occasion: 'ON_DEMAND',
        supervisor: {
          login: 'test.pr.mrx',
          firstName: 'Mister',
          lastName: 'Xavier'
        },
        employee: { login: 'test.pr.mitarbeiter1' }
      }
    ];
  });

  it('should match snapshot', () => {
    let cut = shallow(
      <MyPerformanceReviewsList prs={prs} fetchPrs={() => {}} />
    );

    expect(cut).toMatchSnapshot();
  });
});
