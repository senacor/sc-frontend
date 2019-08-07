import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/Grid';
import { injectIntl } from 'react-intl';

import TargetRole from './TargetRole';
import PrOverallFulfillment from './PrOverallFulfillment';
import PrTextField from './PrTextField';

const styles = {
  containerListItem: {
    display: 'flex',
    clear: 'right'
  },
  rightLegend: {
    marginRight: '6%',
    float: 'right',
    textAlign: 'blockscope'
  }
};

const PrOverallAssessment = props => {
  const {
    prById,
    readOnly,
    isActionPerformer,
    nonActionPerformer,
    text,
    action,
    intl
  } = props;

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <PrOverallFulfillment
          prById={prById}
          category="FULFILLMENT_OF_REQUIREMENT"
          readOnly={readOnly}
          isActionPerformer={isActionPerformer}
          nonActionPerformer={nonActionPerformer}
          openEditing={props.openEditing}
        />
      </Grid>
      <Grid item xs={12}>
        <TargetRole
          prById={prById}
          readOnly={readOnly}
          isActionPerformer={isActionPerformer}
          nonActionPerformer={nonActionPerformer}
          openEditing={props.openEditing}
        />
      </Grid>
      <Grid item xs={12}>
        <PrTextField
          label={intl.formatMessage({
            id: 'proverallcomment.overall'
          })}
          helperText={intl.formatMessage({
            id: 'proverallcomment.requirements'
          })}
          text={text}
          isReadOnly={false}
          isError={false}
          action={action}
        />
      </Grid>
    </Grid>
  );
};

export const StyledComponentOA = withStyles(styles)(PrOverallAssessment);
export default injectIntl(StyledComponentOA);
