import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';

import TargetRole from './TargetRole';
import PrOverallFulfillment from './PrOverallFulfillment';
import PrTextField from './PrTextField';
import ROLES from '../../helper/roles';

const styles = theme => ({
  paddingBottom: {
    paddingBottom: theme.spacing.unit
  }
});

const PrOverallAssessment = props => {
  const {
    pr,
    userinfo,
    userroles,
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

  const isRequiredForOverallAssessment = () => {
    return (
      !pr.statusSet.includes('MODIFICATIONS_ACCEPTED_REVIEWER') &&
      (userroles.includes(ROLES.SUPERVISOR) || userinfo.numberOfPrsToReview > 0)
    );
  };

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
          label={
            isRequiredForOverallAssessment()
              ? intl.formatMessage({
                  id: 'proverallcomment.overall'
                }) + ' *'
              : intl.formatMessage({
                  id: 'proverallcomment.overall'
                })
          }
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
