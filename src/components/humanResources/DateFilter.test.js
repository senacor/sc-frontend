import React from 'react';
import { DateFilter } from './DateFilter';
import { createShallow } from '@material-ui/core/test-utils';
import FILTER_GROUPS from './filterGroups';
import HR_ELEMENTS from './hrElements';

describe('DateFilter Component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    const mockCallBack = jest.fn();

    let component = shallow(
      <DateFilter
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.EMPLOYEE}
        filter={{
          searchString: 'deadlineFrom=2018-01-01&deadlineTo=2018-12-31',
          values: { From: '2018-01-01', To: '2018-12-31' }
        }}
        addFilter={mockCallBack}
        deleteFilter={mockCallBack}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should able to change Date from and change Filter', () => {
    const deleteFilter = jest.fn();
    const addFilter = jest.fn();

    let component = shallow(
      <DateFilter
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.DEADLINE}
        filter={{
          searchString: 'deadlineFrom=2018-01-01&deadlineTo=2018-12-31',
          values: { From: '2018-01-01', To: '2018-12-31' }
        }}
        addFilter={addFilter}
        deleteFilter={deleteFilter}
      />
    );
    let event = { target: { value: '2018-01-13' } };
    component.find('#startDate').simulate('change', event, 'From');

    let payload = {
      filterGroup: FILTER_GROUPS.HR,
      filterBy: HR_ELEMENTS.DEADLINE,
      filter: {
        searchString: `${HR_ELEMENTS.DEADLINE}From=2018-01-13&${
          HR_ELEMENTS.DEADLINE
        }To=2018-12-31`,
        values: { From: '2018-01-13', To: '2018-12-31' }
      }
    };

    expect(addFilter).toHaveBeenCalledTimes(1);
    expect(addFilter).toHaveBeenCalledWith(payload);
    expect(component.find('#startDate').props().defaultValue).toEqual(
      '2018-01-13'
    );
    expect(component.find('#endDate').props().defaultValue).toEqual(
      '2018-12-31'
    );
  });

  it('should able to change Date to and change Filter', () => {
    const deleteFilter = jest.fn();
    const addFilter = jest.fn();

    let component = shallow(
      <DateFilter
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.DEADLINE}
        filter={{
          searchString: 'deadlineFrom=2018-01-01&deadlineTo=2018-12-31',
          values: { From: '2018-01-01', To: '2018-12-31' }
        }}
        addFilter={addFilter}
        deleteFilter={deleteFilter}
      />
    );
    let event = { target: { value: '2018-05-30' } };
    component.find('#endDate').simulate('change', event, 'to');

    let payload = {
      filterGroup: FILTER_GROUPS.HR,
      filterBy: HR_ELEMENTS.DEADLINE,
      filter: {
        searchString: `${HR_ELEMENTS.DEADLINE}From=2018-01-01&${
          HR_ELEMENTS.DEADLINE
        }To=2018-05-30`,
        values: { From: '2018-01-01', To: '2018-05-30' }
      }
    };

    expect(addFilter).toHaveBeenCalledTimes(1);
    expect(addFilter).toHaveBeenCalledWith(payload);
    expect(component.find('#startDate').props().defaultValue).toEqual(
      '2018-01-01'
    );
    expect(component.find('#endDate').props().defaultValue).toEqual(
      '2018-05-30'
    );
  });
});
