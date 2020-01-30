import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
// Icons
import List from '@material-ui/core/List';
import DateItem from './DateItem';
import AddIcon from '@material-ui/icons/Add';
import ConfirmDialog from '../../utils/ConfirmDialog';
import { saveRules } from '../../../calls/rules';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  ...theme.styledComponents,
  btnAdd: {
    backgroundColor: theme.palette.primary[400],
    color: theme.palette.secondary.white,
    margin: 1 * theme.spacing.unit
  },
  rightSide: {
    display: 'block',
    textAlign: 'right'
  },
  leftSide: {
    display: 'flex'
  },
  actionBtnContainer: {
    display: 'flex'
  },
  actionBtn: {
    margin: 1 * theme.spacing.unit
  },
  hidden: {
    display: 'none'
  },
  createRuleContainer: {
    marginTop: 3 * theme.spacing.unit,
    textAlign: 'center'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  addMenu: {
    display: 'flex',
    width: '100%',
    textAlign: 'right'
  },
  container: {
    marginTop: 2 * theme.spacing.unit,
    backgroundColor: theme.palette.primary[50],
    padding: 2 * theme.spacing.unit,
    borderRadius: 1 * theme.spacing.unit
  },
  listItem: {
    background: theme.palette.secondary.brightGrey,
    marginBottom: 1 * theme.spacing.unit,
    borderRadius: 1 * theme.spacing.unit
  },
  ruleTitle: {
    fontSize: '1.3em'
  }
});

const AutomationRule = ({
  classes,
  intl,
  ruleDatesProp,
  ruleId,
  ruleDescriptionId,
  ruleType
}) => {
  const [ruleDates, setRuleDates] = useState([...ruleDatesProp]);
  const [loadedRuleDates, setLoadedRuleDates] = useState([...ruleDatesProp]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(
    () => {
      setRuleDates([...ruleDatesProp]);
      setLoadedRuleDates([...ruleDatesProp]);
    },
    [ruleDatesProp]
  );

  const error = useErrorContext();
  const info = useInfoContext();

  const rulesUpdated = loadedRuleDates.join('-') !== ruleDates.join('-');

  const saveChanges = () => {
    const afterSave = () => {
      setLoadedRuleDates([...ruleDates]);
    };
    saveRules(ruleType, ruleDates, afterSave, error, info);
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
    ruleDates.splice(index, 1);
    setRuleDates([...ruleDates]);
  };

  const modifyDate = (index, value) => {
    ruleDates[index] = value;
    setRuleDates([...ruleDates]);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Typography variant="body1" className={classes.ruleTitle}>
          {intl.formatMessage({ id: ruleId })}
        </Typography>
        <div className={classes.leftSide}>
          <Typography variant="body1">
            {intl.formatMessage({ id: ruleDescriptionId })}
          </Typography>
        </div>
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
              <Grid sm={8} className={classes.leftSide}>
                <Button
                  onClick={revertChanges}
                  color="primary"
                  variant="contained"
                  className={!rulesUpdated ? classes.hidden : classes.actionBtn}
                >
                  {intl.formatMessage({
                    id: 'autorules.revert'
                  })}
                </Button>
                <Button
                  disabled={!rulesUpdated}
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
              <Grid sm={4}>
                <Button className={classes.btnAdd} onClick={addNewDate}>
                  <AddIcon className={classes.leftIcon} />
                  {intl.formatMessage({
                    id: 'autorules.add'
                  })}
                </Button>
              </Grid>
            </div>
          </ListItem>
        </List>
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
      </div>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(AutomationRule));
