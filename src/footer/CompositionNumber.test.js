import React from 'react';
import CompositionNumber from './CompositionNumber';
import renderer from 'react-test-renderer';

it('displays the composition number', async () => {
  global.fetch = jest.fn();
  const fetchRes = Promise.resolve({
    json: () => Promise.resolve(1)
  });
  fetch.mockReturnValueOnce(fetchRes);

  const component = renderer.create(<CompositionNumber />);
  const res = await fetchRes;
  await res.json();
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('displays failure if the resource is not found', async () => {
  global.fetch = jest.fn();
  const fetchRes = Promise.resolve({
    status: 404
  });
  fetch.mockReturnValueOnce(fetchRes);

  const component = renderer.create(<CompositionNumber />);
  await fetchRes;
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
