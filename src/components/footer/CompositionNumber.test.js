import React from 'react';
import CompositionNumber from './CompositionNumber';
import { shallow } from 'enzyme';

it('displays the composition number', async () => {
  global.fetch = jest.fn();
  const fetchRes = Promise.resolve({
    json: () => Promise.resolve(1)
  });
  fetch.mockReturnValueOnce(fetchRes);

  const component = shallow(<CompositionNumber />);

  // we need to wait, that the response is processed in the component
  const res = await fetchRes;
  await res.json();
  component.update();
  expect(component).toMatchSnapshot();
});

it('displays failure if the resource is not found', async () => {
  global.fetch = jest.fn();
  const fetchRes = Promise.resolve({
    status: 404
  });
  fetch.mockReturnValueOnce(fetchRes);

  const component = shallow(<CompositionNumber />);

  // we need to wait, that the response is processed in the component
  await fetchRes;
  component.update();
  expect(component).toMatchSnapshot();
});
