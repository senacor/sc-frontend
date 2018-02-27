import React from 'react';
import { TaskList } from './TaskList';
import { shallow } from 'enzyme';

it('displays the list of tasks', () => {
  const tasks = [
    {
      id: 1,
      title: 'Test title',
      description: 'Test Description',
      username: 'ttran',
      _links: {
        self: {
          href: '/api/v1/tasks/1'
        }
      }
    },
    {
      id: 2,
      title: 'Test title 2',
      description: 'Test Description 2',
      username: 'ttran',
      deadline: '2017-12-31',
      _links: {
        self: {
          href: '/api/v1/tasks/2'
        }
      }
    }
  ];

  const component = shallow(<TaskList tasks={tasks} />);

  expect(component).toMatchSnapshot();
});
