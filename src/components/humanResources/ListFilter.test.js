import React from 'react';
import { ListFilter } from './ListFilter';
import { shallow } from 'enzyme';
import FILTER_GROUPS from './filterGroups';
import HR_ELEMENTS from './hrElements';

describe('EmployeeFilter Component', () => {
  it('should match snapshot', () => {
    const mockAddFilter = jest.fn();
    const mockDeleteFilter = jest.fn();

    let component = shallow(
      <ListFilter
        content={{
          ja: 'yes',
          nein: 'no',
          vielleicht: 'maybe'
        }}
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.PR_OCCASION}
        filter={{
          searchString: '',
          values: ''
        }}
        addFilter={mockAddFilter}
        deleteFilter={mockDeleteFilter}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should init Checkboxes by store', () => {
    const mockAddFilter = jest.fn();
    const mockDeleteFilter = jest.fn();

    let component = shallow(
      <ListFilter
        content={{
          ja: 'yes',
          nein: 'no',
          vielleicht: 'maybe'
        }}
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.PR_OCCASION}
        filter={{
          searchString: `${HR_ELEMENTS.PR_OCCASION}=yes&${
            HR_ELEMENTS.PR_OCCASION
          }=no`,
          values: ['ja', 'nein']
        }}
        addFilter={mockAddFilter}
        deleteFilter={mockDeleteFilter}
      />
    );

    expect(
      component.find('WithStyles(Checkbox) [id="ja"]').props().checked
    ).toEqual(true);
    expect(
      component.find('WithStyles(Checkbox) [id="nein"]').props().checked
    ).toEqual(true);
    expect(
      component.find('WithStyles(Checkbox) [id="vielleicht"]').props().checked
    ).toEqual(false);
    expect(
      component.find('WithStyles(Checkbox) [id="selectAll"]').props().checked
    ).toEqual(false);
  });

  it('should update the Filter if one checkbox is clicked', () => {
    const mockAddFilter = jest.fn();
    const mockDeleteFilter = jest.fn();

    let component = shallow(
      <ListFilter
        content={{
          ja: 'yes',
          nein: 'no',
          vielleicht: 'maybe'
        }}
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.PR_OCCASION}
        filter={{
          searchString: '',
          values: ''
        }}
        addFilter={mockAddFilter}
        deleteFilter={mockDeleteFilter}
      />
    );

    component.find('WithStyles(Checkbox) [id="vielleicht"]').simulate('change');

    let payload = {
      filterGroup: FILTER_GROUPS.HR,
      filterBy: HR_ELEMENTS.PR_OCCASION,
      filter: {
        searchString: `${HR_ELEMENTS.PR_OCCASION}=yes&${
          HR_ELEMENTS.PR_OCCASION
        }=no`,
        values: ['ja', 'nein']
      }
    };

    expect(mockAddFilter).toHaveBeenCalledTimes(1);
    expect(mockAddFilter).toHaveBeenCalledWith(payload);

    expect(
      component.find('WithStyles(Checkbox) [id="vielleicht"]').props().checked
    ).toEqual(false);

    expect(
      component.find('WithStyles(Checkbox) [id="selectAll"]').props().checked
    ).toEqual(false);
  });

  it('should set all Checkboxes if the last is unchecked clicked', () => {
    const mockAddFilter = jest.fn();
    const mockDeleteFilter = jest.fn();

    let component = shallow(
      <ListFilter
        content={{
          ja: 'yes',
          nein: 'no',
          vielleicht: 'maybe'
        }}
        filterGroup={FILTER_GROUPS.HR}
        filterBy={HR_ELEMENTS.PR_OCCASION}
        filter={{
          searchString: '',
          values: ''
        }}
        addFilter={mockAddFilter}
        deleteFilter={mockDeleteFilter}
      />
    );

    component.find('WithStyles(Checkbox) [id="ja"]').simulate('change');
    component.find('WithStyles(Checkbox) [id="vielleicht"]').simulate('change');

    expect(
      component.find('WithStyles(Checkbox) [id="ja"]').props().checked
    ).toEqual(false);
    expect(
      component.find('WithStyles(Checkbox) [id="vielleicht"]').props().checked
    ).toEqual(false);

    component.find('WithStyles(Checkbox) [id="nein"]').simulate('change');

    expect(
      component.find('WithStyles(Checkbox) [id="selectAll"]').props().checked
    ).toEqual(true);
    expect(
      component.find('WithStyles(Checkbox) [id="ja"]').props().checked
    ).toEqual(true);

    expect(
      component.find('WithStyles(Checkbox) [id="vielleicht"]').props().checked
    ).toEqual(true);
    expect(
      component.find('WithStyles(Checkbox) [id="nein"]').props().checked
    ).toEqual(true);
  });
});
