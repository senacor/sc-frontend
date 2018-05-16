import React from 'react';
import { StyledComponent } from './TaskList';
import { createShallow } from '@material-ui/core/test-utils';

describe('TaskList Component', () => {
  let shallow = createShallow({ dive: true });
  const tasks = [
    {
      id: 1,
      title: 'Test title',
      description: 'Test Description',
      username: 'ttran',
      status: 'DONE',
      type: 'PR',
      linkToDetails: '2',
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
      status: 'IN_PROGRESS',
      deadline: '2017-12-31',
      type: 'PR',
      linkToDetails: '2',
      _links: {
        self: {
          href: '/api/v1/tasks/2'
        }
      }
    }
  ];
  it('should display the list of tasks', () => {
    const component = shallow(<StyledComponent tasks={tasks} />);

    expect(component).toMatchSnapshot();
  });

  it('should contain only one task', () => {
    const element = shallow(<StyledComponent tasks={tasks} />);

    expect(element.find('WithStyles(Card)')).toHaveLength(1);
  });
});
