import React from 'react';
import { OverviewPerformanceReviews } from './OverviewPerformanceReviews';
import { createShallow } from '@material-ui/core/test-utils';

describe('OverviewPerformanceReviews', () => {
  let shallow = createShallow({ dive: false });

  let filterPossibilities = {
    competences: ['DEVELOPMENT', 'CONSULTING'],
    levels: ['1', '2'],
    occasions: ['ON_DEMAND', 'YEARLY', 'END_PROBATION'],
    overallAssessments: ['1', '2', '3', '4', '5'],
    projectCsts: ['ACD_BOOT', 'DEV_CAMP']
  };

  it('should match snapshot', () => {
    let component = shallow(
      <OverviewPerformanceReviews filterPossibilities={filterPossibilities} />
    );

    expect(component).toMatchSnapshot();
  });
});
