import React from 'react';
import { PerformanceReviewDetail } from './PerformanceReviewDetail';
import { shallow } from 'enzyme';

describe('PerformanceReviewDetail Component', () => {
  const pr = {
    employee: {
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    supervisor: {
      id: 54,
      firstName: 'Manuela',
      lastName: 'Bock'
    },
    reviewer: {
      id: 503,
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    deadline: '2018-12-06',
    appointment: '2018-12-04',
    competence: 'DEVELOPMENT',
    occasion: 'ON_DEMAND'
  };

  it('should match snapshot', () => {
    const component = shallow(<PerformanceReviewDetail prById={pr} />);
    expect(component).toMatchSnapshot();
  });
});
