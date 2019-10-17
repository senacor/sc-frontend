import React, { Fragment, useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// Material UI
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { modifyString } from '../../../helper/string';
import { declinePr, linkToPr, undecline } from '../../../calls/pr';
import { ErrorContext, InfoContext } from '../../App';
import ConfirmDialog from '../../utils/ConfirmDialog';

const styles = theme => ({
  tableRow: {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.brightGrey
    }
  },
  actionDelete: { textAlign: 'center', color: theme.palette.secondary.darkRed },
  employeeNameCell: { maxWidth: 100 }
});

const PrsDeclinedTable = ({
  isHr,
  refreshDashboard,
  classes,
  intl,
  prs,
  history
}) => {
  const errorContext = useContext(ErrorContext.context);
  const infoContext = useContext(InfoContext.context);
  const [declineDialogOpen, setDeclineDialogOpen] = useState({
    open: false,
    prId: 0
  });

  const declineNo = () => {
    //RESET DECLINING PROCESS
    undecline(
      declineDialogOpen.prId,
      () => {
        infoContext.setValue({
          hasInfos: true,
          messageId: 'prsheet.decline.canceled'
        });
        window.scrollTo(0, 0);
        refreshDashboard();
        setDeclineDialogOpen({ open: false, prId: 0 });
      },
      errorContext
    );
  };

  const declineYes = () => {
    //DECLINE AND REMOVE PR COMPLETELY
    const targetStatus = isHr ? 'DECLINED_HR' : 'DECLINED_SUPERVISOR';
    declinePr(
      declineDialogOpen.prId,
      targetStatus,
      () => {
        infoContext.setValue({
          hasInfos: true,
          messageId: 'prsheet.decline.done'
        });
        refreshDashboard();
        setDeclineDialogOpen({ open: false, prId: 0 });
      },
      errorContext
    );
  };

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {intl.formatMessage({ id: 'meetingcreator.employee' })}
            </TableCell>
            <TableCell>
              {intl.formatMessage({ id: 'employeeInfo.startDate' })}
            </TableCell>
            <TableCell>{intl.formatMessage({ id: 'pr.occasion' })}</TableCell>
            <TableCell>
              {intl.formatMessage({ id: 'decline.completely' })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prs.map(pr => {
            const employeeName = `${pr.employeeFirstName} ${
              pr.employeeLastName
            }`;
            return (
              <TableRow key={pr.prId} className={classes.tableRow}>
                <TableCell
                  className={classes.employeeNameCell}
                  onClick={() => linkToPr(pr.prId, null, history)}
                >
                  {employeeName}
                </TableCell>
                <TableCell onClick={() => linkToPr(pr.prId, null, history)}>
                  {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
                </TableCell>
                <TableCell onClick={() => linkToPr(pr.prId, null, history)}>
                  {modifyString(pr.prOccasion)}
                </TableCell>
                <TableCell
                  className={classes.actionDelete}
                  onClick={() =>
                    setDeclineDialogOpen({ open: true, prId: pr.prId })
                  }
                >
                  <DeleteIcon className={classes.leftIcon} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ConfirmDialog
        onBackdropClick={() => setDeclineDialogOpen({ open: false, prId: 0 })}
        open={declineDialogOpen.open}
        handleClose={declineNo}
        handleConfirm={declineYes}
        confirmationText={intl.formatMessage({
          id: 'prsheet.decline.dialog'
        })}
        confirmationHeader={intl.formatMessage({
          id: 'decline.confirmDialogTitle'
        })}
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrsDeclinedTable)));
