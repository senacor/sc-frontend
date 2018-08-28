import React from 'react';
import { shallow } from 'enzyme';
import { StyledComponent as TimeTable } from './TimeTable';
import { styles } from './AppointmentUtilities.js';

describe('createHourLabels', () => {
  it('should create 23 hourLabels if the time window is from 8:00 to 19:00 and the minuteGranularity is 30.', () => {
    expect(TimeTable.createHourLabels(styles())).toHaveLength(23);
  });
});

describe('createDividers', () => {
  it('should create 23 dividers if the time window is from 8:00 to 19:00 and the minuteGranularity is 30.', () => {
    expect(TimeTable.createDividers(styles())).toHaveLength(23);
  });
});

describe('TimeTable', () => {
  it('should match snapshot.', () => {
    let component = shallow(<TimeTable />);

    expect(component).toMatchSnapshot();
  });
});
