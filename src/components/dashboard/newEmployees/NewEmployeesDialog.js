import React, { useState, Fragment, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, withStyles, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import InfoWidget from '../../utils/InfoWidget';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useErrorContext, useInfoContext } from '../../../helper/contextHooks';
import ROUTES from '../../../helper/routes';
import { withRouter } from 'react-router-dom';
import { getAllEmployees, getEmployeesWithoutSupervisor, assignSupervisorsToEmployees } from '../../../calls/employees';
import NewEmployeesTable from './NewEmployeesTable';

const styles = theme => ({
    dialogContent: {
        padding: 3 * theme.spacing.unit,
        textAlign: 'center'
    },
    dialogPaper: {
        height: '80vh'
    },
    btnContainer: {
        padding: theme.spacing.unit * 2,
        position: 'absolute',
        display: 'flex',
        bottom: 5,
        right: 5
    },
    button: {
        margin: theme.spacing.unit,
    },
    btnClose: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 10,
        right: 10
    },
});

const NewEmployeesDialog = ({
    employeesWithoutSupervisorCount,
    fisPatchNeeded,
    classes,
    intl,
    history
}) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [employeesWithoutSupervisor, setEmployeesWithoutSupervisor] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sendToBackend, setSendToBackend] = useState([]);

    const error = useErrorContext();
    const info = useInfoContext();

    useEffect(() => {
        if (window.location.pathname === ROUTES.NEW_EMPLOYEES) {
            setDialogOpened(true);
        }
        getAllEmployees(setEmployees, setIsLoading, error);
        getEmployeesWithoutSupervisor(setEmployeesWithoutSupervisor, setIsLoading, error);
    }, []);

    const dialogOpen = () => {
        history.push(ROUTES.NEW_EMPLOYEES);
        setDialogOpened(true);
    };

    const dialogClose = () => {
        history.push(ROUTES.DASHBOARD);
        setDialogOpened(false);
    };

    const handleOnFisNoteClicked = event => {
        event.stopPropagation();
        event.preventDefault();
        history.push(ROUTES.DATABASE_PATCHES);
    };

    const supervisors = employees.filter(employee => employee.hasSupervisorRole);

    const isAssigned = (employeeId, supervisorId) => {
        return sendToBackend.some(entry => entry.employeeId === employeeId && entry.supervisorId === supervisorId);
    }

    const handleChangeSupervisor = (supervisor, employeeIndex) => {
        const empls = [...employeesWithoutSupervisor];
        let employee = empls[employeeIndex];

        employee.supervisorName = supervisor.firstName + " " + supervisor.lastName;
        setEmployeesWithoutSupervisor(empls);

        if (!isAssigned(employee.id, supervisor.id)) {
            sendToBackend.push({ employeeId: employee.id, supervisorId: supervisor.id });
            setSendToBackend(sendToBackend);
        }
    };

    const handleSave = () => {
        if (sendToBackend.length > 0) {
            assignSupervisorsToEmployees(sendToBackend, setIsLoading, info, error)
                .then(() => window.location.reload());
        }
        dialogClose();
    }

    return (
        <Fragment>
            <InfoWidget
                label={intl.formatMessage({
                    id: 'dashboard.newemployees'
                })}
                onClick={dialogOpen}
                value={employeesWithoutSupervisorCount}
                note={fisPatchNeeded ? intl.formatMessage({ id: 'newemployeesdialog.pleasePatchData' }) : ""}
                onNoteClicked={fisPatchNeeded ? handleOnFisNoteClicked : () => { }}
                linkTo={ROUTES.NEW_EMPLOYEES}
                icon={'emoji_people'}
            />
            <Dialog
                open={dialogOpened}
                classes={{ paper: classes.dialogPaper }}
                fullWidth
                maxWidth="lg"
            >
                <IconButton onClick={dialogClose} className={classes.btnClose}>
                    <CloseIcon />
                </IconButton>
                <DialogTitle>
                    <Typography variant="h5">
                        {intl.formatMessage({
                            id: 'dashboard.newemployees'
                        })}
                    </Typography>
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                            <NewEmployeesTable
                                currentSupervisors={supervisors}
                                newEmployees={employeesWithoutSupervisor}
                                handleChangeSupervisor={handleChangeSupervisor}
                            />
                        )}

                    <div className={classes.btnContainer}>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={() => dialogClose()}
                        >
                            {intl.formatMessage({ id: 'newemployeesdialog.cancel' })}
                        </Button>

                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            onClick={() => handleSave()}
                        >
                            {intl.formatMessage({ id: 'newemployeesdialog.save' })}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default withRouter(
    injectIntl(withStyles(styles)(NewEmployeesDialog))
);
