import React from 'react';
import { mount, shallow } from 'enzyme';
import withLoading from './Loading';

it('displays a loading symbol, when the loading prop is set', () => {
  const Wrapped = withLoading()(() => <div />);

  const component = shallow(<Wrapped isLoading={true} />);

  expect(component).toMatchSnapshot();
});

it('calls the loading function once on mounting', () => {
  const fn = jest.fn();
  const Wrapped = withLoading(fn)(() => <div />);

  expect(fn).toHaveBeenCalledTimes(0);

  mount(<Wrapped />);

  expect(fn).toHaveBeenCalledTimes(1);
});

it('renders the child, when isLoading is false', () => {
  const Wrapped = withLoading()(() => <div />);

  const component = shallow(<Wrapped isLoading={false} otherProp={1} />);

  expect(component).toMatchSnapshot();
});

it('sets the display name correctly', () => {
  const TestComponent = () => <div />;
  TestComponent.displayName = 'TestComponent';
  const Wrapped = withLoading()(TestComponent);

  expect(Wrapped.displayName).toEqual('WithLoading(TestComponent)');
});
