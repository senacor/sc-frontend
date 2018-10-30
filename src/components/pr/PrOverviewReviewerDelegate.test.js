import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { StyledComponent as PrOverviewReviewerDelegate } from './PrOverviewReviewerDelegate';
import EmployeeSearchDialog from '../employeeSearch/EmployeeSearchDialog';

describe('PrOverviewReviewerDelegate Component', () => {
  let shallow = createShallow({ dive: true });
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

  it('should open an EmployeeSearchDialog', () => {
    const mockDelegateReviewer = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        delegateReviewer={mockDelegateReviewer}
      />
    );

    expect(component.find(EmployeeSearchDialog).props().open).toEqual(false);
    component.find('WithStyles(Button)').simulate('click');
    expect(component.find(EmployeeSearchDialog).props().open).toEqual(true);
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
