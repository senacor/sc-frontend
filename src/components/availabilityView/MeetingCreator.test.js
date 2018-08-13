import React from 'react';
import { StyledComponent } from './MeetingCreator';
import { createShallow } from '@material-ui/core/test-utils';

describe('MeetingCreator', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let wrapper = shallow(<StyledComponent />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should display the create appointment form when meeting does not exist', () => {
    let shallow = createShallow({ dive: true });
    let wrapper = shallow(<StyledComponent meeting={null} />);

    expect(wrapper.find('#createMeeting')).toHaveLength(1);
  });
});
