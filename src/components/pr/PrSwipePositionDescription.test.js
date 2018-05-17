import React from 'react';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrSwipePositionDescription Component', () => {
  let shallow = createShallow({ dive: true });

  it('displays the Description of the employee for the category= "PROBLEM ANALYSIS', () => {
    const component = shallow(
      <PrSwipePositionDescription category="PROBLEM_ANALYSIS" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "WORKING MANNER ', () => {
    const component = shallow(
      <PrSwipePositionDescription category="WORKING_MANNER" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "WORK RESULTS', () => {
    const component = shallow(
      <PrSwipePositionDescription category="WORK_RESULTS" />
    );

    expect(component).toMatchSnapshot();
  });
});
