import React from 'react';
import { StyledComponent } from './PrAdvancementStrategies';
import { createShallow } from '@material-ui/core/test-utils';
import ROLES from '../../helper/roles';

describe('PrAdvancementStrategies Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    advancementStrategies: {
      1: 'should have opportunity window'
    }
  };

  it('displays the PrAdvancementStrategies', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        userroles={[ROLES.PR_CST_LEITER]}
        disabledText={false}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the text writeable for the reviewer', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        userroles={[ROLES.PR_CST_LEITER]}
        disabledText={false}
      />
    );

    expect(component.find('PrTextField')).toHaveLength(1);

    expect(component).toMatchSnapshot();
  });
});
