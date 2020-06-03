import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import ScRow from '../ScRow';
import { CATEGORY } from '../../../../helper/scSheetData';

const styles = theme => ({
  ...theme.styledComponents
});

const WorkEfficiency = memo(
  ({
    classes,
    intl,
    workEfficiencyFields,
    handleChangeWorkEfficiency,
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
                id: 'scsheet.textarea.description.workEffectivity1.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workEffectivity2.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workEffectivity3.manager'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workEffectivity4.manager'
              })}
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workEffectivity1.casual'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workEffectivity2.casual'
              })}
            </li>
            <li>
              {intl.formatMessage({
                id: 'scsheet.textarea.description.workEffectivity3.casual'
              })}
            </li>
          </ul>
        )}
      </Fragment>
    );

    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workEffectivity' })}
        </Typography>
        <ScRow
          isReviewer={isReviewer}
          isScEvaluated={isScEvaluated}
          fieldsDisabled={fieldsDisabled}
          type={CATEGORY.WORK_EFFICIENCY}
          row={workEfficiencyFields}
          action={handleChangeWorkEfficiency}
          title={intl.formatMessage({
            id: 'scsheet.subcategory.workEffectivity'
          })}
          description={description}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
          handleChangeWeight={value =>
            handleChangeWeight(value, CATEGORY.WORK_EFFICIENCY)
          }
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.workEfficiencyFields === nextProps.workEfficiencyFields
);

export default injectIntl(withStyles(styles)(WorkEfficiency));
