import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import ScRow from '../ScRow';

const styles = theme => ({
  ...theme.styledComponents
});

const WorkQuality = memo(
  ({ classes, intl, workQualityFields, handleChangeWorkQuality }) => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workQuality' })}
        </Typography>
        <ScRow
          fields={workQualityFields}
          action={handleChangeWorkQuality}
          title={intl.formatMessage({ id: 'scsheet.subcategory.workQuality' })}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.workQualityFields === nextProps.workQualityFields
);

export default injectIntl(withStyles(styles)(WorkQuality));
