import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import ConfirmDialog from './ConfirmDialog';
import { withStyles } from '@material-ui/core';

const styles = theme => ({});

const ConfirmDialogComposer = withStyles(styles)(ConfirmDialog);

let wrapper;

beforeEach(() => {
  const mockProps = {
    open: false,
    handleClose: jest.fn(),
    handleConfirm: jest.fn(),
    confirmationText: 'Are you sure?',
    confirmationHeader: 'Title confirmation'
  };
  wrapper = shallowWithIntl(<ConfirmDialogComposer {...mockProps} />);
});

describe('props of ConfirmDialog', () => {
  it('should have props defined', () => {
    expect(wrapper.props()).toBeDefined();
  });
  it('should have props open initially set to false', () => {
    expect(wrapper.props().open).toEqual(false);
  });
  it('should have handleClose defined', () => {
    expect(wrapper.props().handleClose).toBeDefined();
  });
  it('should have handleConfirm defined', () => {
    expect(wrapper.props().handleConfirm).toBeDefined();
  });
  it('should have confirmationText defined', () => {
    expect(wrapper.props().confirmationText).toBeTruthy();
  });
  it('should have confirmationTitle defined', () => {
    expect(wrapper.props().confirmationHeader).toBeTruthy();
  });
});
