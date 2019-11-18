import React, { Fragment, memo } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import ScRow from '../ScRow';
// Material UI
import {
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Grid
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/es/TextField/TextField';

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
    removeSubcategory,
    hasWeightPercentage,
    performanceWeightPercentage,
    handleChangeWeightPercentage
  }) => {
    return (
      <Fragment>
        <Grid container>
          {hasWeightPercentage ? (
            <Fragment>
              <Grid item xs={11}>
                <Typography variant="h5" className={classes.categoryTitle}>
                  {intl.formatMessage({ id: 'scsheet.category.performance' })}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  inputProps={{ style: { height: 10 } }}
                  type="number"
                  value={performanceWeightPercentage}
                  onChange={event =>
                    handleChangeWeightPercentage(
                      'performance',
                      event.target.value
                    )
                  }
                  margin="normal"
                  variant="outlined"
                  label={'%'}
                />
              </Grid>
            </Fragment>
          ) : (
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.categoryTitle}>
                {intl.formatMessage({ id: 'scsheet.category.performance' })}
              </Typography>
            </Grid>
          )}
        </Grid>
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.dailyBusiness' })}
        </Typography>
        <ScRow
          fields={dailyBusinessFields}
          type={'dailyBusiness'}
          action={handleChangePerformance}
          removeSubcategory={removeSubcategory}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
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
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
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
    prevProps.projectFields === nextProps.projectFields &&
    prevProps.performanceWeightPercentage ===
      nextProps.performanceWeightPercentage
);

export default injectIntl(withStyles(styles)(Performance));
