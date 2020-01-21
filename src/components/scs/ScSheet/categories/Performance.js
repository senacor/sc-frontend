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
import TextInputDialog from '../../../utils/TextInputDialog';

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
    projectFields,
    handleChangePerformance,
    addSubcategory,
    removeSubcategory,
    hasWeightPercentage,
    performanceWeightPercentage,
    handleChangeWeightPercentage,
    isReviewer,
    fieldsDisabled
  }) => {
    const [addDialogOpened, setAddDialogOpened] = useState(false);
    const [typeOpenedAddDialog, setTypeOpenedAddDialog] = useState(undefined);

    const [removeDialogOpened, setRemoveDialogOpened] = useState(false);
    const [fieldOpenedRemoveDialog, setFieldOpenedRemoveDialog] = useState(undefined);

    const [newGoalName, setNewGoalName] = useState(undefined);

    const handleRemoveDialogOpen = (type, index) => {
      setRemoveDialogOpened(true);
      setFieldOpenedRemoveDialog({ type, index });
    };

    const handleRemoveDialogClose = () => {
      setRemoveDialogOpened(false);
    };

    const handleAddDialogOpen = (type) => {
      setNewGoalName('');
      setAddDialogOpened(true);
      setTypeOpenedAddDialog({ type });
    };

    const handleAddDialogClose = () => {
      setAddDialogOpened(false);
    };

    const handleChangeGoalName = (event) => {
      setNewGoalName(event.target.value);
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
          removeSubcategory={handleRemoveDialogOpen}
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
          <IconButton
            className={fieldsDisabled && classes.hidden}
            onClick={e => handleAddDialogOpen(CATEGORY.DAILY_BUSINESS)}
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
          description={intl.formatMessage({
            id: 'scsheet.textarea.description'
          })}
          achievement={intl.formatMessage({
            id: 'scsheet.textarea.achievement'
          })}
          removeSubcategory={handleRemoveDialogOpen}
        />
        <Tooltip
          title={intl.formatMessage({
            id: 'scsheet.tooltip.addField.project'
          })}
        >
          <IconButton
            onClick={e => handleAddDialogOpen(CATEGORY.PROJECT)}
            className={fieldsDisabled && classes.hidden}
          >
            <AddIcon className={classes.addProjectButton} />
          </IconButton>
        </Tooltip>
        <Divider />
        <ConfirmDialog
          open={removeDialogOpened}
          handleClose={handleRemoveDialogClose}
          handleConfirm={() => {
            removeSubcategory(fieldOpenedRemoveDialog.type, fieldOpenedRemoveDialog.index);
            setRemoveDialogOpened(false);
          }}
          confirmationText={intl.formatMessage({
            id: 'scsheet.fieldDelete.confirm'
          })}
          confirmationHeader={intl.formatMessage({
            id: 'scsheet.fieldDelete.title'
          })}
        />
        <TextInputDialog
          open={addDialogOpened}
          handleClose={handleAddDialogClose}
          handleSubmit={() => {
            addSubcategory(typeOpenedAddDialog.type, newGoalName);
            setAddDialogOpened(false);
          }}
          handleInputChange={handleChangeGoalName}
          submitDisabled={!newGoalName}
          dialogHeader={intl.formatMessage({
            id: 'scsheet.addGoal.header'
          })}
          inputLabel={intl.formatMessage({
            id:
            typeOpenedAddDialog && typeOpenedAddDialog.type === CATEGORY.DAILY_BUSINESS
                ? 'scsheet.textheader.title.dailyBusiness'
                : 'scsheet.textheader.title.project'
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
