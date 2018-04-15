import React from 'react';
import { StyledComponent } from './PRList';
import { createShallow } from 'material-ui/test-utils';

describe('PRList Component', () => {
  let shallow = createShallow({ dive: true });

  const prs = [
    {
      id: 1,
      employee: 'Employee1',
      occasion: 'ON_DEMAND',
      supervisor: 'fukara',
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
      _links: {
        self: {
          href: '/api/v1/prs/2'
        }
      }
    }
  ];

  const delegatedSupervisors = [];
  it('displays the list of prs', () => {
    const component = shallow(
      <StyledComponent prs={prs} delegatedSupervisors={delegatedSupervisors} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should contain one prs', () => {
    const element = shallow(
      <StyledComponent prs={prs} delegatedSupervisors={delegatedSupervisors} />
    );

    expect(element.find('Card')).toHaveLength(1);
  });
});
