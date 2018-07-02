import React from 'react';
import { StyledComponent } from './PrSheet';
import { createShallow } from '@material-ui/core/test-utils';

describe('PrSheet Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    employee: {
      id: 1,
      login: 'lschäfer',
      firstName: 'Lionel',
      lastName: 'Schäfer',
      title: 'DR',
      email: 'lionel.schäfer@senacor.com',
      entryDate: '2004-05-10',
      salaries: [],
      employment: {}
    },
    supervisor: 'ttran',
    occasion: 'ON_DEMAND',
    status: 'PREPARATION',
    deadline: '2015-05-11',
    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1'
      }
    }
  };

  it('displays the PrSheet', () => {
    const fetchVisibilityMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        fetchPrVisibilityById={fetchVisibilityMock}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
