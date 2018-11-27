import React from 'react';
import { shallow } from 'enzyme';
import withLoadingAction from './LoadingWithAction';

describe('withLoadingAction Function', () => {
  it('should call the loadingFunction', () => {
    const fn = jest.fn();

    const Wrapped = withLoadingAction(fn)()(() => <div />);

    expect(fn).toHaveBeenCalledTimes(0);
    const component = shallow(<Wrapped />);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });
});

it('sets the display name correctly', () => {
  const TestComponent = () => <div />;
  TestComponent.displayName = 'TestComponent';
  const Wrapped = withLoadingAction()()(TestComponent);

  expect(Wrapped.displayName).toEqual('WithLoadingAction(TestComponent)');
});
