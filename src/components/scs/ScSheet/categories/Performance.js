import React, { Fragment, memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import ScRow from '../ScRow';
// Material UI
import { IconButton, Tooltip, Typography, Divider } from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const Performance = memo(
  ({
    classes,
    intl,
    dailyBusinessFields,
    projectFields,
    handleChangePerformance,
    addSubcategory,
    removeSubcategory
  }) => {
    return (
      <Fragment>
        <Typography variant="h5" className={classes.categoryTitle}>
          {intl.formatMessage({ id: 'scsheet.category.performance' })}
        </Typography>
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.dailyBusiness' })}
        </Typography>
        <ScRow
          fields={dailyBusinessFields}
          type={'dailyBusiness'}
          action={handleChangePerformance}
          removeSubcategory={removeSubcategory}
        />
        <Tooltip
          title={intl.formatMessage({
            id: 'scsheet.tooltip.addField.dailyBusiness'
          })}
        >
          <IconButton onClick={e => addSubcategory('dailyBusiness')}>
            <AddIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Divider />
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.project' })}
        </Typography>
        <ScRow
          fields={projectFields}
          type={'project'}
          action={handleChangePerformance}
          removeSubcategory={removeSubcategory}
        />
        <Tooltip
          title={intl.formatMessage({
            id: 'scsheet.tooltip.addField.project'
          })}
        >
          <IconButton onClick={e => addSubcategory('project')}>
            <AddIcon className={classes.addProjectButton} />
          </IconButton>
        </Tooltip>
        <Divider />
      </Fragment>
    );
  },
  (prevProps, nextProps) =>
    prevProps.dailyBusinessFields === nextProps.dailyBusinessFields &&
    prevProps.projectFields === nextProps.projectFields
);

export default injectIntl(withStyles(styles)(Performance));
