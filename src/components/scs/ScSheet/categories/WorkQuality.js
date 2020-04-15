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
    isReviewer,
    isScEvaluated,
    handleChangeWeight
  }) => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workQuality' })}
        </Typography>
        <ScRow
          isReviewer={isReviewer}
          isScEvaluated={isScEvaluated}
          fieldsDisabled={fieldsDisabled}
          type={CATEGORY.WORK_QUALITY}
          row={workQualityFields}
          action={handleChangeWorkQuality}
          title={intl.formatMessage({ id: 'scsheet.subcategory.workQuality' })}
          description={
            <ul>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workQuality1'
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workQuality2'
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workQuality3'
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workQuality4'
                })}
              </li>
            </ul>
          }
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
          handleChangeWeight={value =>
            handleChangeWeight(value, CATEGORY.WORK_QUALITY)
          }
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.workQualityFields === nextProps.workQualityFields
);

export default injectIntl(withStyles(styles)(WorkQuality));
