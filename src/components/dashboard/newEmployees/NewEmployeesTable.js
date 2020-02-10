import React from 'react';
import { injectIntl } from 'react-intl';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    withStyles,
    Typography
} from '@material-ui/core';
import {
    formatLocaleDateTime,
    FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { withRouter } from 'react-router-dom';
import EmployeeFilter from '../../admin/EmployeeFilter';

const styles = theme => ({
    tableRow: {
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
            backgroundColor: theme.palette.secondary.brightGrey
        }
    },
    text: {
        color: theme.palette.secondary.grey,
        padding: theme.spacing.unit / 2,
        textAlign: 'center'
    },
    textInfo: {
        color: theme.palette.primary[400]
    }
});

const NewEmployeesTable = ({
    currentSupervisors,
    newEmployees,
    handleChangeSupervisor,
    handleSave,
    classes,
    intl
}) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        {intl.formatMessage({
                            id: 'newemployeesdialogtable.employeename'
                        })}
                    </TableCell>
                    <TableCell>
                        {intl.formatMessage({
                            id: 'newemployeesdialogtable.position'
                        })}
                    </TableCell>
                    <TableCell>
                        {intl.formatMessage({
                            id: 'newemployeesdialogtable.department'
                        })}
                    </TableCell>
                    <TableCell>
                        {intl.formatMessage({
                            id: 'newemployeesdialogtable.office'
                        })}
                    </TableCell>
                    <TableCell>
                        {intl.formatMessage({
                            id: 'newemployeesdialogtable.supervisor'
                        })}
                    </TableCell>
                    <TableCell>
                        {intl.formatMessage({
                            id: 'newemployeesdialogtable.entrydate'
                        })}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {newEmployees.map((employee, index) => (
                    <TableRow
                        key={index}
                        className={classes.tableRow}
                    >
                        <TableCell>
                            {`${employee.firstName} ${employee.lastName}`}
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.officeLocation}</TableCell>
                        <TableCell>
                            <Typography className={classes.text} component="span">
                                <EmployeeFilter
                                    data={currentSupervisors}
                                    settingSupervisors
                                    index={index}
                                    supervisorName={
                                        employee.supervisorName
                                            ? employee.supervisorName
                                            : intl.formatMessage({
                                                id: 'employeeInfo.noSupervisor'
                                            })
                                    }
                                    setSelectedEmployee={handleChangeSupervisor}
                                />
                            </Typography>
                        </TableCell>
                        <TableCell>
                            {formatLocaleDateTime(employee.entryDate, FRONTEND_DATE_FORMAT)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default withRouter(injectIntl(withStyles(styles)(NewEmployeesTable)));
