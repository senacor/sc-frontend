import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import Message from './Message';
import { withStyles } from '@material-ui/core';

const styles = {
  message: {
    position: 'absolute'
  }
};

const MessageComposer = withStyles(styles)(Message);

describe('context of message', () => {
  const mockErrorContext = {
    hasErrors: false,
    messageId: ''
  };
  const wrapper = shallowWithIntl(<MessageComposer />, { mockErrorContext });
  it('should have text message when error occures', () => {
    wrapper.setContext({ hasErrors: true, messageId: 'message.error' });
    expect(wrapper.text()).toBe('<InjectIntl(WithStyles(Message)) />');
  });
});
