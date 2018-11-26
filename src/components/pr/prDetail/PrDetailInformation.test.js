import React from 'react';
import { StyledComponent as PrDetailInformation } from './PrDetailInformation';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';

describe('PrDetailInformation Component', () => {
  const pr = {
    employee: {
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    supervisor: {
      id: 54,
      firstName: 'Manuela',
      lastName: 'Bock'
    },
    reviewer: {
      id: 503,
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    deadline: '2018-12-06',
    meeting: { start: '2018-12-04' },
    competence: 'DEVELOPMENT',
    occasion: 'ON_DEMAND',
    statuses: [prStatusEnum.FIXED_DATE]
  };

  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const component = shallow(<PrDetailInformation pr={pr} />);
    expect(component).toMatchSnapshot();
  });
});
