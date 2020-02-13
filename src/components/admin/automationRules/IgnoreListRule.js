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
import ConfirmDialog from '../../utils/ConfirmDialog';
import { saveRules } from '../../../calls/rules';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EmployeeFilter from '../EmployeeFilter';

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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    background: theme.palette.secondary.brightGrey,
    marginBottom: 1 * theme.spacing.unit,
    borderRadius: 1 * theme.spacing.unit
  },
  ruleTitle: {
    fontSize: '1.3em'
  },
  employeeCard: {
    display: 'flex',
    margin: 1 * theme.spacing.unit
  },
  employeeTitle: {
    color: theme.palette.secondary.darkGrey,
    display: 'flex',
    padding: 2.5 * theme.spacing.unit,
    paddingRight: 0
  },
  cardContent: {
    padding: 0
  },
  iconBtn: {
    padding: theme.spacing.unit
  }
});

const IgnoreListRule = ({
  classes,
  intl,
  ignorelistProp,
  ruleId,
  ruleDescriptionId,
  employees,
  ruleType
}) => {
  const [ignorelist, setIgnorelist] = useState([...ignorelistProp]);
  const [loadedIgnorelist, setLoadedIgnorelist] = useState([...ignorelistProp]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(
    () => {
      setIgnorelist([...ignorelistProp]);
      setLoadedIgnorelist([...ignorelistProp]);
    },
    [ignorelistProp]
  );

  const error = useErrorContext();
  const info = useInfoContext();

  const rulesUpdated = loadedIgnorelist.join('-') !== ignorelist.join('-');

  const saveChanges = () => {
    const afterSave = () => {
      setLoadedIgnorelist([...ignorelist]);
    };
    saveRules(ruleType, ignorelist, afterSave, error, info);
    setDialogOpen(false);
  };

  const revertChanges = () => {
    setIgnorelist([...loadedIgnorelist]);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const removeFromIgnorelist = index => {
    ignorelist.splice(index, 1);
    setIgnorelist([...ignorelist]);
  };

  const addEmployee = employee => {
    setIgnorelist([...ignorelist, employee.id]);
  };

  const employeeData = employees.filter(
    employee => !ignorelist.find(a => a === employee.id)
  );

  const showName = employeeId => {
    const employee = employees.find(employee => employee.id === employeeId);
    if (!employee) {
      return;
    }
    return employee.firstName + ' ' + employee.lastName;
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <Typography variant="body1" className={classes.ruleTitle}>
          {intl.formatMessage({ id: 'autorules.sc.ignorelist' })}
        </Typography>
        <div className={classes.leftSide}>
          <Typography variant="body1">
            {intl.formatMessage({ id: 'autorules.sc.ignorelist.dates.title' })}
          </Typography>
        </div>
        <List>
          {ignorelist.length > 0 && employees.length > 0 ? (
            <ListItem key={Math.random()} className={classes.listItem}>
              {ignorelist.map((employeeId, index) => {
                return (
                  <Card className={classes.employeeCard}>
                    <CardContent className={classes.cardContent}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className={classes.employeeTitle}
                      >
                        {showName(employeeId)}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        className={classes.iconBtn}
                        onClick={() => removeFromIgnorelist(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                );
              })}
            </ListItem>
          ) : (
            <Typography variant="body2">
              {intl.formatMessage({ id: 'autorules.noNamesDefined' })}
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
                <EmployeeFilter
                  customComponent={true}
                  data={employeeData}
                  setSelectedEmployee={addEmployee}
                />
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

export default injectIntl(withStyles(styles)(IgnoreListRule));
