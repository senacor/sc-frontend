import React from 'react';
import { PrOverviewReviewerDelegate } from './PrOverviewReviewerDelegate';
import { shallow } from 'enzyme';

describe('PrOverviewReviewerDelegate Component', () => {
  it('should match snapshot', () => {
    const mockDelegateReviewer = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        delegateReviewer={mockDelegateReviewer}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should send delegateReviewer action', () => {
    const mockDelegateReviewer = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        delegateReviewer={mockDelegateReviewer}
      />
    );

    let employee = {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    };
    component.instance().selectEmployee(employee);
    expect(mockDelegateReviewer).toHaveBeenCalledTimes(1);
    expect(mockDelegateReviewer).toHaveBeenCalledWith(42, 502);
  });
});
