import React from 'react';
import { PrOverviewReviewerDelegate } from './PrOverviewReviewerDelegate';
import { shallow } from 'enzyme';

describe('PrOverviewReviewerDelegate Component', () => {
  it('should match snapshot', () => {
    const mockDelegateReviewer = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        employeeId={503}
        delegateReviewer={mockDelegateReviewer}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should open an EmployeeSearch', () => {
    const mockDelegateReviewer = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        employeeId={503}
        delegateReviewer={mockDelegateReviewer}
      />
    );

    expect(component.state().open).toEqual(false);
    component
      .find('WithStyles(Button)[children="DELEGIEREN"]')
      .simulate('click');
    expect(component.state().open).toEqual(true);
  });

  it('should send delegateReviewer action', () => {
    const mockDelegateReviewer = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        employeeId={503}
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

  it('should send an stackedAction if onChange is set', () => {
    const mockDelegateReviewer = jest.fn();
    const mockStackedAction = jest.fn();
    const mockOnChange = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        employeeId={503}
        delegateReviewer={mockDelegateReviewer}
        stackedAction={mockStackedAction}
        onChange={mockOnChange}
      />
    );

    let employee = {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    };

    component.instance().selectEmployee(employee);
    expect(mockStackedAction).toHaveBeenCalledTimes(1);
  });

  it('should write an error if delegateReviewer and employeeId are equal', () => {
    const mockDelegateReviewer = jest.fn();
    const mockStackedAction = jest.fn();
    const mockOnChange = jest.fn();

    let component = shallow(
      <PrOverviewReviewerDelegate
        prId={42}
        employeeId={502}
        delegateReviewer={mockDelegateReviewer}
        stackedAction={mockStackedAction}
        onChange={mockOnChange}
      />
    );

    let employee = {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    };

    expect(component.state().errorMessage).toEqual('');
    component.instance().selectEmployee(employee);
    expect(component.state().errorMessage).toEqual(
      'PR kann nicht an den zu begutachtenden Mitarbeiter übergeben werden.'
    );
  });
});
