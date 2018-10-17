import React from 'react';
import { StyledComponent } from './PrFinalCommentHr';
import { createShallow } from '@material-ui/core/test-utils';
import ROLES from '../../helper/roles';

describe('PrFinalCommentHr Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    statuses: [
      'ALL_DATES_ACCEPTED',
      'FILLED_SHEET_EMPLOYEE',
      'FILLED_SHEET_REVIEWER',
      'MODIFICATIONS_ACCEPTED_REVIEWER',
      'MODIFICATIONS_ACCEPTED_EMPLOYEE'
    ],
    finalCommentHr: 'I can type now.'
  };

  it('displays the PrFinalCommentHr', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        userroles={[ROLES.PR_HR]}
        disabledText={false}
        open={true}
        readOnly={false}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays an info text before the employee has finalized', () => {
    let newStatuses = [
      'ALL_DATES_ACCEPTED',
      'FILLED_SHEET_EMPLOYEE',
      'FILLED_SHEET_REVIEWER',
      'MODIFICATIONS_ACCEPTED_REVIEWER'
    ];
    let newPr = Object.assign({}, prById, { statuses: newStatuses });
    const component = shallow(
      <StyledComponent
        prById={newPr}
        userroles={[ROLES.PR_HR]}
        disabledText={false}
        open={false}
        readOnly={false}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the text read-only after HR has finalized', () => {
    let newStatuses = [
      'ALL_DATES_ACCEPTED',
      'FILLED_SHEET_EMPLOYEE',
      'FILLED_SHEET_REVIEWER',
      'MODIFICATIONS_ACCEPTED_REVIEWER',
      'MODIFICATIONS_ACCEPTED_EMPLOYEE',
      'PR_COMPLETED'
    ];
    let readOnlyPr = Object.assign({}, prById, { statuses: newStatuses });
    const component = shallow(
      <StyledComponent
        prById={readOnlyPr}
        userroles={[ROLES.PR_HR]}
        disabledText={false}
        open={true}
        readOnly={true}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
