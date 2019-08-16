import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles/index';
import Grid from '@material-ui/core/Grid/Grid';

import TargetRole from './TargetRole';
import PrOverallFulfillment from './PrOverallFulfillment';
import PrTextField from './PrTextField';

const styles = () => ({
  paddingBottom: {
    paddingBottom: 24
  }
});

const PrOverallAssessment = props => {
  const {
    classes,
    text,
    rating,
    targetRoles,
    isReadOnly,
    isError,
    hidden,
    actionText,
    actionRating,
    actionTargetRoles,
    intl
  } = props;

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <div className={classes.paddingBottom}>
          <PrOverallFulfillment
            category="FULFILLMENT_OF_REQUIREMENT"
            isReadOnly={isReadOnly}
            hidden={hidden}
            rating={rating}
            action={actionRating}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={classes.paddingBottom}>
          <TargetRole
            targetRoles={targetRoles}
            isReadOnly={isReadOnly}
            isError={isError}
            action={actionTargetRoles}
          />
        </div>
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
          isReadOnly={isReadOnly('RATINGS_REVIEWER')}
          isError={isError}
          action={actionText}
        />
      </Grid>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(PrOverallAssessment));
