import React from 'react';
import { PrOverviewReviewer } from './PrOverviewReviewer';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrOverviewReviewer Component', () => {
  let shallow = createShallow({ dive: true });

  let filterPossibilities = {
    competences: ['DEVELOPMENT', 'CONSULTING'],
    levels: ['1', '2'],
    occasions: ['ON_DEMAND', 'YEARLY', 'END_PROBATION'],
    overallAssessments: ['1', '2', '3', '4', '5'],
    projectCsts: ['ACD_BOOT', 'DEV_CAMP']
  };

  it('should match snapshot', () => {
    let component = shallow(
      <PrOverviewReviewer filterPossibilities={filterPossibilities} />
    );

    expect(component).toMatchSnapshot();
  });
});
