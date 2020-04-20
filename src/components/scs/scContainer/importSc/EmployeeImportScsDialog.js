import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
// Material UI
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import { useErrorContext } from '../../../../helper/contextHooks';
import { getEmployeeScs, getEmployeeScsToImport } from '../../../../calls/sc';
import EmployeeScsTable from '../../../AllEmployees/EmployeeScsTable';
import EmployeeFilter from '../../../admin/EmployeeFilter';
import DialogActions from '@material-ui/core/DialogActions';
import { Button } from '@material-ui/core';

const styles = theme => ({
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 14,
    top: 14
  },
  filterBtnContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'left',
    margin: 1.5 * theme.spacing.unit
  },
  dialogContent: {
    paddingTop: 0,
    paddingBottom: 3 * theme.spacing.unit,
    paddingRight: 3 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit,
    textAlign: 'center',
    overflowY: 'auto'
  },
  dialogPaper: {
    height: '80vh'
  }
});

const EmployeeImportScsDialog = ({
  employees,
  dialogOpen,
  setDialogOpen,
  classes,
  intl
}) => {
  const [scs, setScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importFromEmployee, setImportFromEmployee] = useState({});
  const [selectedScToImport, setSelectedScToImport] = useState({});

  const error = useErrorContext();

  useEffect(
    () => {
      if (importFromEmployee && Object.values(importFromEmployee).length > 0) {
        getEmployeeScsToImport(
          importFromEmployee.id,
          setScs,
          setIsLoading,
          error
        );
      }
    },
    [importFromEmployee]
  );

  const dialogClose = () => {
    setDialogOpen && setDialogOpen(false);
  };

  const makeImportFromEmployee = () => {
    //TODO: make call
    dialogClose();
  };

  return (
    <Fragment>
      <Dialog
        open={dialogOpen}
        onClose={dialogClose}
        fullWidth
        maxWidth="lg"
        classes={{ paper: classes.dialogPaper }}
      >
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle disableTypography>
          <Typography variant="h5">
            {intl.formatMessage({
              id: 'scsheet.import.other'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <div className={classes.filterBtnContainer}>
            <EmployeeFilter
              data={employees}
              employeeImport={importFromEmployee}
              setSelectedEmployee={setImportFromEmployee}
            />
          </div>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <EmployeeScsTable
              scs={scs}
              scImport={selectedScToImport}
              selectImportSc={setSelectedScToImport}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => dialogClose()}
          >
            {intl.formatMessage({ id: 'btn.cancel' })}
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={Object.values(selectedScToImport).length < 1}
            onClick={() => makeImportFromEmployee()}
          >
            {intl.formatMessage({ id: 'btn.save' })}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(EmployeeImportScsDialog));
