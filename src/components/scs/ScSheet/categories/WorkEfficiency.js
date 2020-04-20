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
    handleChangeWeight
  }) => {
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
          description={
            <ul>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workEffectivity1'
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workEffectivity2'
                })}
              </li>
              <li>
                {intl.formatMessage({
                  id: 'scsheet.textarea.description.workEffectivity3'
                })}
              </li>
            </ul>
          }
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
