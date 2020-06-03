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
    handleChangeWeight,
    isManager
  }) => {
    const description = (
      <Fragment>
        {isManager ? (
          <ul>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality1.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality2.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality3.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality4.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality5.manager'
              })}
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality1.casual'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality2.casual'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality3.casual'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workQuality4.casual'
              })}
            </li>
          </ul>
        )}
      </Fragment>
    );

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
          description={description}
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
