import React, { Fragment, memo } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Typography } from '@material-ui/core';
import ScRow from '../ScRow';

const styles = theme => ({
  ...theme.styledComponents
});

const WorkEfficiency = memo(
  ({ classes, intl, workEfficiencyFields, handleChangeWorkEfficiency }) => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.workEffectivity' })}
        </Typography>
        <ScRow
          type={'workEfficiency'}
          row={workEfficiencyFields}
          action={handleChangeWorkEfficiency}
          title={intl.formatMessage({
            id: 'scsheet.subcategory.workEffectivity'
          })}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description.workEffectivity'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
        />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.workEfficiencyFields === nextProps.workEfficiencyFields
);

export default injectIntl(withStyles(styles)(WorkEfficiency));