import React from 'react';
import { StyledComponent } from './PrFinalCommentEmployee';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ROLES from '../../helper/roles';

describe('PrFinalCommentEmployee Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    prFinalizationStatus: {
      id: 1,
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'FINALIZED'
    }
  };

  it('displays the PrFinalCommentEmployee', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        userroles={[ROLES.PR_MITARBEITER]}
        disabledText={false}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the text writeable for the employee', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        userroles={[ROLES.PR_MITARBEITER]}
        disabledText={false}
      />
    );

    expect(component.find(Typography)).toHaveLength(2);
    expect(component.find(TextField)).toHaveLength(0);

    expect(component).toMatchSnapshot();
  });

  it('displays the text read-only for the reviewer', () => {
    let changeFinalization = {
      prFinalizationStatus: {
        id: 1,
        finalizationStatusOfEmployee: 'FINALIZED',
        finalizationStatusOfReviewer: 'FINALIZED'
      }
    };
    let readOnlyText = { finalCommentEmployee: 'readonly' };
    let readOnlyPr = Object.assign(
      {},
      prById,
      changeFinalization,
      readOnlyText
    );
    const component = shallow(
      <StyledComponent
        prById={readOnlyPr}
        userroles={[ROLES.PR_CST_LEITER]}
        disabledText={false}
      />
    );

    expect(component.find(Typography)).toHaveLength(2);
    expect(component.find(TextField)).toHaveLength(0);

    expect(
      component
        .find('WithStyles(Typography)')
        .findWhere(x => x.text() === 'readonly')
    ).toHaveLength(0);
  });
});
