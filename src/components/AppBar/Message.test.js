import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';

import Message from './Message';

describe('Message', () => {
  const wrapper = shallowWithIntl(<Message />);

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('context of message', () => {
  const mockErrorContext = {
    hasErrors: false,
    messageId: ''
  };
  const wrapper = shallowWithIntl(<Message />, { mockErrorContext });
  it('should have text message when error occures', () => {
    wrapper.setContext({ hasErrors: true, messageId: 'message.error' });
    expect(wrapper.text()).toBe('<WithStyles(Message) />');
  });
});
