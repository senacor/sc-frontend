import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import ScRow from '../ScRow';

const styles = theme => ({
  ...theme.styledComponents
});

const WorkEffectivity = memo(
  ({ classes, intl, workEffectivityFields, handleChangeWorkEffectivity }) => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workEffectivity' })}
        </Typography>
        <ScRow
          fields={workEffectivityFields}
          action={handleChangeWorkEffectivity}
          title={intl.formatMessage({
            id: 'scsheet.subcategory.workEffectivity'
          })}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.workEffectivityFields === nextProps.workEffectivityFields
);

export default injectIntl(withStyles(styles)(WorkEffectivity));
