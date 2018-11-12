import React from 'react';
import { StyledComponent } from './PRList';
import { createShallow } from '@material-ui/core/test-utils';

describe('PRList Component', () => {
  let shallow = createShallow({ dive: true });

  const prs = [
    {
      id: 1,
      employee: 'Employee1',
      occasion: 'ON_DEMAND',
      supervisor: 'fukara',
      reviewer: '',
      _links: {
        self: {
          href: '/api/v1/prs/1'
        }
      }
    },
    {
      id: 2,
      employee: 'Employee2',
      occasion: 'ON_DEMAND',
      supervisor: 'ttran',
      reviewer: '',
      _links: {
        self: {
          href: '/api/v1/prs/2'
        }
      }
    }
  ];

  it('displays the list of prs', () => {
    const component = shallow(<StyledComponent prs={prs} />);

    expect(component).toMatchSnapshot();
  });
});
