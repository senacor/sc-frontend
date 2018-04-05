import React from 'react';
import { StyledComponent } from './Pr';
import { createShallow } from 'material-ui/test-utils';

describe('Pr Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    title: 'Test title',
    description: 'Test Description',
    username: 'ttran',
    status: 'DONE',
    _links: {
      self: {
        href: '/api/v1/tasks/1'
      }
    }
  };

  it('displays the pr', () => {
    const component = shallow(<StyledComponent prById={prById} />);

    expect(component).toMatchSnapshot();
  });
});
