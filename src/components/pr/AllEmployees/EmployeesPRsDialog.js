import React, { useState, useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  withStyles,
  CircularProgress,
  Typography,
  Divider
} from '@material-ui/core';
import { ErrorContext } from '../../App';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { withRouter } from 'react-router-dom';

// Calls
import { getAllPrsByEmployee } from '../../../actions/calls/employees';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

// Icons
import DownloadIcon from '@material-ui/icons/CloudDownload';

const styles = theme => ({
  dialogContent: {
    padding: 3 * theme.spacing.unit,
    textAlign: 'center'
  },
  btnClose: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10
  },
  prsNumber: {
    marginLeft: 6 * theme.spacing.unit,
    fontSize: '0.8rem'
  },
  prRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  noPrFound: {
    color: theme.palette.secondary.mediumGrey
  }
});

const EmployeesPRsDialog = ({
  dialogOpen,
  dialogClose,
  employeeId,
  firstName,
  lastName,
  intl,
  classes,
  history
}) => {
  const [prs, setPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    if (dialogOpen) {
      getAllPrsByEmployee(employeeId, setPrs, setIsLoading, errorContext);
    }
  }, []);

  // List of all PRs of current employee
  const listOfPrs = prs.map(pr => {
    return (
      <TableRow
        key={pr.id}
        className={classes.prRow}
        onClick={() => history.push(`/prs/${pr.id}`)}
      >
        <TableCell>{pr.id}</TableCell>
        <TableCell>
          {formatLocaleDateTime(pr.deadline, FRONTEND_DATE_FORMAT)}
        </TableCell>
        <TableCell>
          <DownloadIcon />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Dialog open={dialogOpen} onClose={dialogClose} fullWidth maxWidth="sm">
      <Button onClick={dialogClose} className={classes.btnClose}>
        X
      </Button>
      <DialogTitle>
        <span>{`${firstName} ${lastName}`}</span>
        {prs.length > 0 && (
          <span className={classes.prsNumber}>
            {`${intl.formatMessage({
              id: 'employeeInfo.prsCount'
            })}: ${prs.length}`}
          </span>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent className={classes.dialogContent}>
        {isLoading ? (
          <CircularProgress />
        ) : prs.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: 'employeeInfo.dueDate'
                  })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: 'archivedfiles.download'
                  })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{listOfPrs}</TableBody>
          </Table>
        ) : (
          <Typography variant="body2" className={classes.noPrFound}>
            {`${firstName} ${lastName} ${intl.formatMessage({
              id: 'employeeInfo.noPrsFound'
            })}`}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default withRouter(injectIntl(withStyles(styles)(EmployeesPRsDialog)));
