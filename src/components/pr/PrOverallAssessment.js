import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/Grid';

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
    text,
    rating,
    isReadOnly,
    isError,
    hidden,
    actionText,
    actionRating,
    intl
  } = props;

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <PrOverallFulfillment
          category="FULFILLMENT_OF_REQUIREMENT"
          isReadOnly={isReadOnly}
          hidden={hidden}
          rating={rating}
          action={actionRating}
        />
      </Grid>
      <Grid item xs={12}>
        <TargetRole readOnly={isReadOnly} />
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
          isReadOnly={isReadOnly}
          isError={isError}
          action={actionText}
        />
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(PrOverallAssessment));
