import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import ScRow from '../ScRow';
import { CATEGORY } from '../../../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents
});

const WorkQuality = memo(
  ({
    classes,
    intl,
    workQualityFields,
    handleChangeWorkQuality,
    fieldsDisabled,
    isReviewer
  }) => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workQuality' })}
        </Typography>
        <ScRow
          isReviewer={isReviewer}
          fieldsDisabled={fieldsDisabled}
          type={CATEGORY.WORK_QUALITY}
          row={workQualityFields}
          action={handleChangeWorkQuality}
          title={intl.formatMessage({ id: 'scsheet.subcategory.workQuality' })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.workQuality'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.workQualityFields === nextProps.workQualityFields
);

export default injectIntl(withStyles(styles)(WorkQuality));
