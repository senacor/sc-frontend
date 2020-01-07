import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
// Material UI
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// Icons
import AutoRules from '@material-ui/icons/RotateRight';
import List from '@material-ui/core/List';
import DateItem from './DateItem';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from '../../utils/ConfirmDialog';
import { getAllRules, saveRules } from '../../../calls/rules';

const styles = theme => ({
  ...theme.styledComponents,
  paper: {
    margin: 3 * theme.spacing.unit,
    paddingBottom: 5 * theme.spacing.unit,
    paddingTop: 5 * theme.spacing.unit
  },
  btnAdd: {
    backgroundColor: theme.palette.primary[400],
    color: theme.palette.secondary.white
  },
  rightSide: {
    display: 'block',
    textAlign: 'right'
  },
  leftSide: {
    display: 'block',
    textAlign: 'left'
  },
  actionBtnContainer: {
    display: 'flex'
  },
  actionBtn: {
    margin: 3 * theme.spacing.unit
  },
  hidden: {
    display: 'none'
  },
  rulesPaper: {
    margin: 3 * theme.spacing.unit,
    padding: theme.spacing.unit,
    textAlign: 'center'
  },
  title: {
    padding: 2 * theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '2rem'
    },
    '& h5': {
      paddingLeft: theme.spacing.unit
    }
  },
  divider: {
    marginBottom: 2 * theme.spacing.unit
  },
  createRuleContainer: {
    marginTop: 3 * theme.spacing.unit,
    textAlign: 'center'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  addMenu: {
    display: 'block',
    width: '100%',
    textAlign: 'right'
  },
  listItem: {
    background: theme.palette.secondary.brightGrey,
    marginTop: theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit
  }
});

const AutomationRulesContainer = ({ classes, intl }) => {
  const [ruleDates, setRuleDates] = useState([]);
  const [loadedRuleDates, setLoadedRuleDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const error = useErrorContext();
  const info = useInfoContext();

  useEffect(() => {
    getAllRules(setRuleDates, setIsLoading, error);
  }, []);

  const rulesUpdated = loadedRuleDates.join('-') !== ruleDates.join('-');

  const saveChanges = () => {
    const afterSave = () => {
      setLoadedRuleDates([...ruleDates]);
    };
    saveRules(ruleDates, afterSave, error, info);
    setDialogOpen(false);
  };

  const revertChanges = () => {
    setRuleDates([...loadedRuleDates]);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const addNewDate = () => {
    setRuleDates([...ruleDates, '01-01']);
  };

  const deleteDate = index => {
    console.log('DELETE: ', index);
    ruleDates.splice(index, 1);
    setRuleDates([...ruleDates]);
  };

  const modifyDate = (index, value) => {
    ruleDates[index] = value;
    setRuleDates([...ruleDates]);
  };

  return (
    <Fragment>
      <Paper className={classes.rulesPaper}>
        <div className={classes.title}>
          <AutoRules color="primary" />
          <Typography variant="h5">
            {intl.formatMessage({ id: 'sidebar.autorules' })}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.leftSide}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'autorules.dates.title' })}
          </Typography>
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {ruleDates.length > 0 ? (
              ruleDates.map((ruleDate, index) => {
                return (
                  <ListItem key={Math.random()} className={classes.listItem}>
                    <DateItem
                      ruleDate={ruleDate}
                      onDelete={() => {
                        deleteDate(index);
                      }}
                      modifyDate={value => modifyDate(index, value)}
                    />
                  </ListItem>
                );
              })
            ) : (
              <Typography variant="body2">
                {intl.formatMessage({ id: 'autorules.noDatesDefined' })}
              </Typography>
            )}
            <ListItem className={classes.listItem}>
              <div className={classes.addMenu}>
                <Button className={classes.btnAdd} onClick={addNewDate}>
                  <AddIcon className={classes.leftIcon} />
                  {intl.formatMessage({
                    id: 'autorules.add'
                  })}
                </Button>
              </div>
            </ListItem>
          </List>
        )}
        <div className={classes.actionBtnContainer}>
          <Grid item sm={6} className={classes.leftSide}>
            <Button
              onClick={revertChanges}
              color="primary"
              variant="contained"
              className={
                !rulesUpdated || isLoading ? classes.hidden : classes.actionBtn
              }
            >
              {intl.formatMessage({
                id: 'autorules.revert'
              })}
            </Button>
          </Grid>
          <Grid item sm={6} className={classes.rightSide}>
            <Button
              disabled={!rulesUpdated || isLoading}
              onClick={() => setDialogOpen(true)}
              color="primary"
              variant="contained"
              className={classes.actionBtn}
            >
              {intl.formatMessage({
                id: 'autorules.savechanges'
              })}
            </Button>
          </Grid>
        </div>
        <ConfirmDialog
          open={dialogOpen}
          handleClose={handleDialogClose}
          handleConfirm={() => saveChanges()}
          confirmationText={intl.formatMessage({
            id: 'autorules.dialogText'
          })}
          confirmationHeader={intl.formatMessage({
            id: 'autorules.dialogTitle'
          })}
        />
      </Paper>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AutomationRulesContainer));
