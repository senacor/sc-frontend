import React from 'react';
import { StyledComponent as PrDelegate } from './PrDelegate';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrDelegate Component', () => {
  let searchResults = [
    {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    {
      id: 503,
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    {
      id: 501,
      firstName: 'Manuela',
      lastName: 'Vorgesetzter'
    },
    {
      id: 500,
      firstName: 'Ulla',
      lastName: 'Schmidt'
    },
    {
      id: 499,
      firstName: 'Markus',
      lastName: 'None'
    }
  ];

  let pr = {
    prId: 42,
    employee: {
      id: 503,
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    supervisor: {
      id: 501,
      firstName: 'Manuela',
      lastName: 'Vorgesetzter'
    },
    reviewer: {
      id: 500,
      firstName: 'Ulla',
      lastName: 'Schmidt'
    }
  };

  it('should match snapshot', () => {
    const mockDelegateReviewer = jest.fn();
    let shallow = createShallow({ dive: true });

    let component = shallow(
      <PrDelegate
        pr={pr}
        startValue={'Nicht übergeben'}
        defaultText={'Nicht übergeben'}
        employeeSearchResults={searchResults}
        delegateReviewer={mockDelegateReviewer}
        employeeSearch={jest.fn()}
        employeeSearchClear={jest.fn()}
        isDelegated={false}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should show the defaultText and no searchList', () => {
    const mockDelegateReviewer = jest.fn();
    let shallow = createShallow({ dive: true });

    let component = shallow(
      <PrDelegate
        pr={pr}
        startValue={'Nicht übergeben'}
        defaultText={'Nicht übergeben'}
        employeeSearchResults={[]}
        delegateReviewer={mockDelegateReviewer}
        employeeSearch={jest.fn()}
        employeeSearchClear={jest.fn()}
      />
    );
    expect(component.find('TextField').props().value).toEqual(
      'Nicht übergeben'
    );
    expect(component.find('WithStyles(Popover)').props().open).toEqual(false);
  });

  it('should show the the defaultText in Results', () => {
    const mockDelegateReviewer = jest.fn();
    let shallow = createShallow({ dive: true });

    let component = shallow(
      <PrDelegate
        pr={pr}
        startValue={'Nicht übergeben'}
        defaultText={'Nicht übergeben'}
        employeeSearchResults={searchResults}
        delegateReviewer={mockDelegateReviewer}
        employeeSearch={jest.fn()}
        employeeSearchClear={jest.fn()}
      />
    ).setState({ showDefault: true });

    expect(
      component.find('WithStyles(ListItemText)[primary="Nicht übergeben"]')
    ).toHaveLength(1);
  });

  it('should reset the Reviewer to Supervisor if default was clicked', () => {
    const mockDelegateReviewer = jest.fn();
    let shallow = createShallow({ dive: true });

    let component = shallow(
      <PrDelegate
        pr={pr}
        startValue={'Nicht übergeben'}
        defaultText={'Nicht übergeben'}
        employeeSearchResults={searchResults}
        delegateReviewer={mockDelegateReviewer}
        employeeSearch={jest.fn()}
        employeeSearchClear={jest.fn()}
      />
    ).setState({ showDefault: true });

    component
      .find('WithStyles(ListItemText)[primary="Nicht übergeben"]')
      .parent()
      .simulate('click');

    expect(mockDelegateReviewer).toHaveBeenCalledTimes(1);
    expect(mockDelegateReviewer).toHaveBeenCalledWith(42, 501);
  });

  it('should send delegateReviewer action', () => {
    const mockDelegateReviewer = jest.fn();

    let shallow = createShallow({ dive: true });

    let component = shallow(
      <PrDelegate
        pr={pr}
        startValue={'Nicht übergeben'}
        defaultText={'Nicht übergeben'}
        employeeSearchResults={searchResults}
        delegateReviewer={mockDelegateReviewer}
        employeeSearch={jest.fn()}
        employeeSearchClear={jest.fn()}
      />
    );

    component.instance().selectedEmployee(searchResults[0])();

    expect(mockDelegateReviewer).toHaveBeenCalledTimes(1);
    expect(mockDelegateReviewer).toHaveBeenCalledWith(42, 502);
  });

  it('should reset to defaultText on end if no employee is selected', () => {
    const mockDelegateReviewer = jest.fn();

    let shallow = createShallow({ dive: true });

    let component = shallow(
      <PrDelegate
        pr={pr}
        startValue={'Michaela Mitarbeiterin'}
        defaultText={'Nicht übergeben'}
        employeeSearchResults={searchResults}
        delegateReviewer={mockDelegateReviewer}
        employeeSearch={jest.fn()}
        employeeSearchClear={jest.fn()}
      />
    ).setState({ employeeSearchValue: 'Test User' });

    component.find('WithStyles(Popover)').simulate('close');

    expect(component.state().employeeSearchValue).toEqual(
      'Michaela Mitarbeiterin'
    );
  });
});
