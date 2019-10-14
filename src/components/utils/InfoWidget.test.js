import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import InfoWidget from './InfoWidget';
import { withStyles } from '@material-ui/core';

const styles = theme => ({});

const InfoWidgetComposer = withStyles(styles)(InfoWidget);

let wrapper;

beforeEach(() => {
  const mockProps = {
    linkTo: '/redirect/to/component',
    onClick: jest.fn(),
    icon: 'some icon',
    label: 'testing label',
    value: 0
  };
  wrapper = shallowWithIntl(<InfoWidgetComposer {...mockProps} />);
});

describe('props of InfoWidget', () => {
  it('should have props defined', () => {
    expect(wrapper.props()).toBeDefined();
  });
  it('should have onClick defined', () => {
    expect(wrapper.props().onClick).toBeDefined();
  });
  it('should have label defined', () => {
    expect(wrapper.props().label).toBeTruthy();
  });
  it('should have value defined', () => {
    expect(wrapper.props().value).toBeGreaterThanOrEqual(0);
  });
});
