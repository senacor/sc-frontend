import React from 'react';
import { StyledComponent as PrDetailInformation } from './PrDetailInformation';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';

describe('PrDetailInformation Component', () => {
  const pr = {
    employee: {
      id: 501,
      login: 'mmitarbeiterin',
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    supervisor: {
      id: 54,
      login: 'mbock',
      firstName: 'Manuela',
      lastName: 'Bock'
    },
    reviewer: {
      id: 503,
      login: 'mmitarbeiter',
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    deadline: '2018-12-06',
    meetingDay: '2018-12-04',
    competence: 'DEVELOPMENT',
    occasion: 'ON_DEMAND',
    statuses: [prStatusEnum.FINALIZED_REVIEWER]
  };

  let meeting = {};

  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    const component = shallow(
      <PrDetailInformation
        pr={pr}
        username={'mmitarbeiterin'}
        meeting={meeting}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
