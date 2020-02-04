import React, { Fragment, memo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
// Material UI
import {
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';
import ScRows from '../ScRows';
import { CATEGORY } from '../../../../helper/scSheetData';
import ConfirmDialog from '../../../utils/ConfirmDialog';
import TextInputDialog from '../../../utils/TextInputDialog';
import PercentageDialog from '../PercentageDialog';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  },
  hidden: {
    display: 'none'
  },
  whiteFont: {
    color: '#FFFFFF'
  },
  changeButton: {
    color: '#FFFFFF',
    backgroundColor: theme.palette.secondary.purple
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
});

const Performance = memo(
  ({
    scId,
    classes,
    intl,
    dailyBusinessFields,
    projectFields,
    handleChangePerformance,
    addSubcategory,
    removeSubcategory,
    hasWeightPercentage,
    prCategoriesWeightPercentage,
    isReviewer,
    fieldsDisabled,
    handleChangeWeight
  }) => {
    const [addDialogOpened, setAddDialogOpened] = useState(false);
    const [typeOpenedAddDialog, setTypeOpenedAddDialog] = useState(undefined);
    const [removeDialogOpened, setRemoveDialogOpened] = useState(false);
    const [fieldOpenedRemoveDialog, setFieldOpenedRemoveDialog] = useState(
      undefined
    );
    const [newGoalName, setNewGoalName] = useState(undefined);
    const [percentageDialogOpened, setPercentageDialogOpened] = useState(false);

    const handleRemoveDialogOpen = (type, index) => {
      setRemoveDialogOpened(true);
      setFieldOpenedRemoveDialog({ type, index });
    };

    const handleRemoveDialogClose = () => {
      setRemoveDialogOpened(false);
    };

    const handleAddDialogOpen = type => {
      setNewGoalName('');
      setAddDialogOpened(true);
      setTypeOpenedAddDialog({ type });
    };

    const handleAddDialogClose = () => {
      setAddDialogOpened(false);
    };

    const handleChangeGoalName = event => {
      setNewGoalName(event.target.value);
    };

    const handlePercentageDialogOpen = () => {
      setPercentageDialogOpened(true);
    };

    const handlePercentageDialogClose = () => {
      setPercentageDialogOpened(false);
    };

    return (
      <Fragment>
        <Grid
          container
          className={`${classes.categoryTitle} ${classes.container}`}
        >
          {hasWeightPercentage ? (
            <Fragment>
              <Grid item xs={10}>
                <Typography variant="h5" className={classes.whiteFont}>
                  {intl.formatMessage({ id: 'scsheet.category.performance' })}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography className={classes.whiteFont}>
                  {`${100 - prCategoriesWeightPercentage}%`}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Button
                  className={classes.changeButton}
                  onClick={handlePercentageDialogOpen}
                >
                  {intl.formatMessage({ id: 'percentagedialog.change' })}
                </Button>
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
            removeSubcategory(
              fieldOpenedRemoveDialog.type,
              fieldOpenedRemoveDialog.index
            );
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
              typeOpenedAddDialog &&
              typeOpenedAddDialog.type === CATEGORY.DAILY_BUSINESS
                ? 'scsheet.textheader.title.dailyBusiness'
                : 'scsheet.textheader.title.project'
          })}
        />
        <PercentageDialog
          open={percentageDialogOpened}
          scId={scId}
          prCategoriesWeightPercentage={prCategoriesWeightPercentage}
          handleClose={handlePercentageDialogClose}
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
