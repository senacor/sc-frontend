import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('should match snapshot', () => {
    const eut = shallow(<Login />);

    expect(eut).toMatchSnapshot();
  });
});
