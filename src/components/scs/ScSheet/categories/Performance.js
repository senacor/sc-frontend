import React, { Fragment, memo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
// Material UI
import {
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import ScRows from '../ScRows';
import { CATEGORY } from '../../../../helper/scSheetData';
import ConfirmDialog from '../../../utils/ConfirmDialog';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  hidden: {
    display: 'none'
  }
});

const Performance = memo(
  ({
    classes,
    intl,
    dailyBusinessFields,
    setDailyBusinessFields,
    projectFields,
    setProjectFields,
    handleChangePerformance,
    addSubcategory,
    hasWeightPercentage,
    performanceWeightPercentage,
    handleChangeWeightPercentage,
    isReviewer,
    fieldsDisabled,
    handleChangeWeight
  }) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [fieldOpenedDialog, setFieldOpenedDialog] = useState(undefined);

    const removeSubcategory = (type, index) => {
      if (type === CATEGORY.DAILY_BUSINESS) {
        const values = [...dailyBusinessFields];
        values.splice(index, 1);
        setDailyBusinessFields(values);
      } else {
        const values = [...projectFields];
        values.splice(index, 1);
        setProjectFields(values);
      }
      setDialogOpened(false);
    };

    const handleDialogOpen = (type, index) => {
      setDialogOpened(true);
      setFieldOpenedDialog({ type, index });
    };

    const handleDialogClose = () => {
      setDialogOpened(false);
    };

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
                  disabled={fieldsDisabled}
                  inputProps={{ style: { height: 10 } }}
                  type="number"
                  value={performanceWeightPercentage}
                  onChange={event =>
                    handleChangeWeightPercentage(
                      CATEGORY.PERFORMANCE,
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
        <ScRows
          isReviewer={isReviewer}
          fieldsDisabled={fieldsDisabled}
          fields={dailyBusinessFields}
          fieldsAmount={dailyBusinessFields.length}
          type={CATEGORY.DAILY_BUSINESS}
          action={handleChangePerformance}
          removeSubcategory={removeSubcategory}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
          dialogOpen={handleDialogOpen}
          handleChangeWeight={(value, index) =>
            handleChangeWeight(value, CATEGORY.DAILY_BUSINESS, index)
          }
        />
        <Tooltip
          title={intl.formatMessage({
            id: 'scsheet.tooltip.addField.dailyBusiness'
          })}
        >
          <IconButton
            className={fieldsDisabled && classes.hidden}
            onClick={e => addSubcategory(CATEGORY.DAILY_BUSINESS)}
          >
            <AddIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Divider />
        <Typography variant="h5" className={classes.subCategoryTitle}>
          {intl.formatMessage({ id: 'scsheet.subtitle.project' })}
        </Typography>
        <ScRows
          isReviewer={isReviewer}
          fieldsDisabled={fieldsDisabled}
          fields={projectFields}
          fieldsAmount={projectFields.length}
          type={CATEGORY.PROJECT}
          action={handleChangePerformance}
          removeSubcategory={removeSubcategory}
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
          dialogOpen={handleDialogOpen}
          handleChangeWeight={(value, index) =>
            handleChangeWeight(value, CATEGORY.PROJECT, index)
          }
        />
        <Tooltip
          title={intl.formatMessage({
            id: 'scsheet.tooltip.addField.project'
          })}
        >
          <IconButton
            onClick={e => addSubcategory(CATEGORY.PROJECT)}
            className={fieldsDisabled && classes.hidden}
          >
            <AddIcon className={classes.addProjectButton} />
          </IconButton>
        </Tooltip>
        <Divider />
        <ConfirmDialog
          open={dialogOpened}
          handleClose={handleDialogClose}
          handleConfirm={() =>
            removeSubcategory(fieldOpenedDialog.type, fieldOpenedDialog.index)
          }
          confirmationText={intl.formatMessage({
            id: 'scsheet.fieldDelete.confirm'
          })}
          confirmationHeader={intl.formatMessage({
            id: 'scsheet.fieldDelete.title'
          })}
        />
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
