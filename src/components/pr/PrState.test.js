import React from 'react';
import PrState from './PrState';
import { createShallow } from 'material-ui/test-utils';

describe('PrState Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    employee: 'Employee1',
    occasion: 'ON_DEMAND',
    supervisor: 'ttran',
    _links: {
      self: {
        href: '/api/v1/prs/1'
      }
    }
  };

  it('displays the prStatus', () => {
    const component = shallow(<PrState prById={prById} />);

    expect(component).toMatchSnapshot();
  });
});
