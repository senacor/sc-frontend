import React from 'react';
import PrSwipePositionDescription from './PrSwipePositionDescription';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrSwipePositionDescription Component', () => {
  let shallow = createShallow({ dive: true });

  it('displays the Description of the employee for the category= "PROBLEM_ANALYSIS"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="PROBLEM_ANALYSIS" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "WORKING_MANNER"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="WORKING_MANNER" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "WORK_RESULTS"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="WORK_RESULTS" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "TEAMWORK"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="TEAMWORK" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "LEADERSHIP"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="LEADERSHIP" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "CUSTOMER_INTERACTION"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="CUSTOMER_INTERACTION" />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the Description of the employee for the category= "CUSTOMER_RETENTION"', () => {
    const component = shallow(
      <PrSwipePositionDescription category="CUSTOMER_RETENTION" />
    );

    expect(component).toMatchSnapshot();
  });
});
