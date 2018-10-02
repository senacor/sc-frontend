import React from 'react';
import { StyledComponent } from './PrFinalCommentEmployee';
import { createShallow } from '@material-ui/core/test-utils';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

describe('PrFinalCommentEmployee Component', () => {
  let shallow = createShallow({ dive: true });

  const prById = {
    id: 1,
    supervisor: 'ttran',
    occasion: 'ON_DEMAND',
    status: 'PREPARATION',
    deadline: '2018-03-14',

    finalCommentEmployee: 'blupp',
    prFinalizationStatus: {
      id: 1,
      finalizationStatusOfEmployee: 'NOT_FINALIZED',
      finalizationStatusOfReviewer: 'NOT_FINALIZED'
    },

    _links: {
      self: {
        href: 'http://localhost:8010/api/v1/prs/1'
      }
    }
  };

  it('displays the PrFinalCommentEmployee', () => {
    const component = shallow(
      <StyledComponent prById={prById} finalCommentEmployee={'text'} />
    );

    expect(component).toMatchSnapshot();
  });

  it('displays the text read-only for the supervisor', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        finalCommentEmployee={'readonly'}
        userroles={['PR_CST_Leiter']}
      />
    );

    expect(component.find(Typography)).toHaveLength(2);
    expect(component.find(TextField)).toHaveLength(0);
  });

  it('should display the text for the supervisor only if submitted by employee', () => {
    const component = shallow(
      <StyledComponent
        prById={prById}
        finalCommentEmployee={'submitted'}
        userroles={['PR_CST_Leiter']}
        prVisible={false}
      />
    );

    expect(
      component
        .find('WithStyles(Typography)')
        .findWhere(x => x.text() === 'blupp')
    ).toHaveLength(0);
  });
});
