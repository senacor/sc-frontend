import React, { useEffect, useState } from 'react';
import { Tooltip, withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import RuleItemPopup from './RuleItemPopup';
import DeleteIcon from '@material-ui/icons/Delete';
import ConfirmDialog from '../../utils/ConfirmDialog';
import InfoIcon from '@material-ui/icons/Info';
import { injectIntl } from 'react-intl';
import { getAllPeriods, savePeriods } from '../../../calls/rules';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  ...theme.styledComponents,
  flex: {
    display: 'flex'
  },
  rightMenu: {
    width: '100%',
    display: 'block',
    textAlign: 'right'
  },
  btnDelete: {
    backgroundColor: theme.palette.secondary.darkRed,
    color: theme.palette.secondary.white
  },
  btnAdd: {
    backgroundColor: theme.palette.primary[400],
    color: theme.palette.secondary.white,
    margin: 1 * theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  gridContainer: {
    paddingTop: 2 * theme.spacing.unit,
    textAlign: 'center'
  },
  actionBtn: {
    margin: 1 * theme.spacing.unit
  },
  hidden: {
    display: 'none'
  },
  addMenu: {
    display: 'flex',
    width: '100%',
    textAlign: 'right'
  },
  listItem: {
    marginBottom: 1 * theme.spacing.unit,
    borderRadius: 1 * theme.spacing.unit
  },
  ruleTitle: {
    fontSize: '1.3em'
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0
  },
  rightPadding: {
    paddingRight: 6 * theme.spacing.unit
  },
  tableHeader: {
    paddingRight: 0
  },
  halfWidthCentered: {
    width: '50%',
    textAlign: 'center'
  },
  halfWidth: {
    width: '50%'
  },
  iconComment: {
    paddingLeft: theme.spacing.unit
  },
  tooltip: {
    fontSize: 1.5 * theme.spacing.unit
  }
});

const ScPeriodsTable = ({ classes, intl }) => {
  const initRules = [];
  const [rules, setRules] = useState([...initRules]);
  const [loadedRules, setLoadedRules] = useState([...initRules]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const error = useErrorContext();
  const info = useInfoContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const afterLoad = rules => {
      setRules([...rules]);
      setLoadedRules([...rules]);
    };
    getAllPeriods(afterLoad, setIsLoading, error);
  }, []);

  const editRule = (index, field, value) => {
    const newRule = { ...rules[index] };
    newRule[field] = value;
    const newRules = [...rules];
    newRules[index] = newRule;
    console.log('rules', loadedRules, newRules);
    setRules(newRules);
  };

  const revertChanges = () => {
    setRules([...loadedRules]);
  };

  const saveChanges = () => {
    const afterSave = () => {
      setLoadedRules([...rules]);
    };
    savePeriods(rules, afterSave, error, info);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const addNewPeriod = () => {
    const newPeriod = {
      period: 'Zeitraumname',
      from: '1-1',
      to: '30-6',
      scGeneration: '1-1',
      scEnd: '15-7',
      payrollReport: '16-7'
    };
    setRules([...rules, newPeriod]);
  };

  const deletePeriod = index => {
    rules.splice(index, 1);
    setRules([...rules]);
  };

  const rulesUpdated = JSON.stringify(loadedRules) !== JSON.stringify(rules);

  const renderHeader = (titleId, titleHintId) => {
    return (
      <TableCell>
        <div className={classes.flex}>
          <Typography>{intl.formatMessage({ id: titleId })}</Typography>
          <Tooltip
            title={
              <div className={classes.tooltip}>
                {intl.formatMessage({
                  id: titleHintId
                })}
              </div>
            }
          >
            <InfoIcon className={classes.iconComment} color="primary"/>
          </Tooltip>
        </div>
      </TableCell>
    );
  };

  if (isLoading) {
    return <CircularProgress/>;
  }

  return (
    <div>
      <List>
        <Typography variant="body1" className={classes.ruleTitle}>
          {intl.formatMessage({ id: 'autorules.period.rules' })}
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>
                <Typography>
                  {intl.formatMessage({ id: 'autorules.period' })}:
                </Typography>
              </TableCell>
              <TableCell className={classes.noPadding}>
                <div className={classes.flex}>
                  <Typography className={classes.halfWidth}>
                    {intl.formatMessage({ id: 'autorules.from' })}
                  </Typography>
                  <Typography className={classes.halfWidthCentered}>
                    -
                  </Typography>
                </div>
              </TableCell>
              <TableCell className={classes.noPadding}>
                <Typography>
                  {intl.formatMessage({ id: 'autorules.to' })}
                </Typography>
              </TableCell>
              {renderHeader(
                'autorules.sc.generation',
                'autorules.hint.sc.generation'
              )}
              {renderHeader(
                'autorules.process.end',
                'autorules.hint.process.end'
              )}
              {renderHeader(
                'autorules.payroll.report',
                'autorules.hint.payroll.report'
              )}
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {rules.map((ruleItem, i) => {
              return (
                <TableRow key={Math.random()} className={classes.tableRow}>
                  <TableCell className={classes.tableHeader}>
                    <RuleItemPopup
                      textType
                      editRule={value => editRule(i, 'period', value)}
                      defaultValue={ruleItem.period}
                    />
                  </TableCell>
                  <TableCell className={classes.noPadding}>
                    <RuleItemPopup
                      editRule={value => editRule(i, 'from', value)}
                      defaultValue={ruleItem.from}
                    />
                  </TableCell>
                  <TableCell
                    className={`${classes.noPadding} ${classes.rightPadding}`}
                  >
                    <RuleItemPopup
                      editRule={value => editRule(i, 'to', value)}
                      defaultValue={ruleItem.to}
                    />
                  </TableCell>
                  <TableCell>
                    <RuleItemPopup
                      editRule={value => editRule(i, 'scGeneration', value)}
                      defaultValue={ruleItem.scGeneration}
                    />
                  </TableCell>
                  <TableCell>
                    <RuleItemPopup
                      editRule={value => editRule(i, 'scEnd', value)}
                      defaultValue={ruleItem.scEnd}
                    />
                  </TableCell>
                  <TableCell>
                    <RuleItemPopup
                      editRule={value => editRule(i, 'payrollReport', value)}
                      defaultValue={ruleItem.payrollReport}
                    />
                  </TableCell>
                  <TableCell>
                    <Grid className={classes.rightMenu}>
                      <Button
                        variant="contained"
                        className={classes.btnDelete}
                        onClick={() => deletePeriod(i)}
                      >
                        <DeleteIcon/>
                        {intl.formatMessage({
                          id: 'autorules.delete'
                        })}
                      </Button>
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ListItem className={classes.listItem}>
          <div className={classes.addMenu}>
            <Grid sm={8} className={classes.flex}>
              <Button
                onClick={revertChanges}
                color="primary"
                variant="contained"
                className={rulesUpdated ? classes.actionBtn : classes.hidden}
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
              <Button className={classes.btnAdd} onClick={addNewPeriod}>
                <AddIcon className={classes.leftIcon}/>
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
  );
};

export default injectIntl(withStyles(styles)(ScPeriodsTable));
