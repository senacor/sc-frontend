import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Paper, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, CircularProgress, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { loadPayrollReports } from '../../../calls/payrollReports';
import { useErrorContext } from '../../../helper/contextHooks';
import GetAppIcon from '@material-ui/icons/GetApp';
import { downloadPayrollReport } from '../../../helper/downloadExcel';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT, FILE_DATE_FORMAT } from '../../../helper/date';

const styles = theme => ({
    reportsPaper: {
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
});

const PayrollReportsPanel = ({ classes, intl }) => {
    const [reportsData, setReportsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortDirection, setSortDirection] = useState('desc');

    let error = useErrorContext();

    useEffect(() => {
        loadPayrollReports(setReportsData, setIsLoading, error);
    }, []);

    const handleSort = () => {
        sortDirection === 'asc' ? setSortDirection('desc') : setSortDirection('asc');
    };

    const handleOnDownloadClick = (report) => {
        let filename = formatLocaleDateTime(report.date, FILE_DATE_FORMAT) + "_SCBewerungexport.xlsx";
        downloadPayrollReport(report.id, filename, error);
    };

    reportsData.sort((first, second) => {
        if (sortDirection === 'asc') {
            return (first.id - second.id);
        } else {
            return (second.id - first.id);
        }
    });

    return (
        <Paper className={classes.reportsPaper}>
            <div className={classes.title}>
                <Typography variant="h5">
                    {intl.formatMessage({ id: 'sidebar.payrollreport' })}
                </Typography>
            </div>

            {isLoading ?
                <CircularProgress /> :
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={true}
                                    direction={sortDirection}
                                    onClick={handleSort}
                                >
                                    {intl.formatMessage({ id: 'payrollreport.date' })}
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                {intl.formatMessage({ id: 'payrollreport.download' })}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportsData
                            .map(entry => {
                                return (
                                    <TableRow key={entry.id}>
                                        <TableCell> {formatLocaleDateTime(entry.date, FRONTEND_DATE_FORMAT)} </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleOnDownloadClick(entry)}                                            >
                                                <GetAppIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            }
        </Paper>
    );
};

export default injectIntl(withStyles(styles)(PayrollReportsPanel));
