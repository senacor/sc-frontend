import React, { Fragment, useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { ErrorContext, LanguageContext } from '../App';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { withRouter } from 'react-router-dom';
import { DownloadFile } from '../fileStorage/DownloadFile';
// Calls
import {
  getAllPrsByEmployee,
  getAllPrsOfInactiveEmployee
} from '../../calls/employees';
// Material UI
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// Icons
import GetAppIcon from '@material-ui/icons/GetApp';
import CloseIcon from '@material-ui/icons/Close';
import { printPdf } from '../../helper/pdfExport';

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
  archived: {
    backgroundColor: theme.palette.secondary.grey
  },
  noPrFound: {
    color: theme.palette.secondary.mediumGrey
  },
  legend: {
    display: 'inline-flex'
  },
  legendArchivedDiv: {
    width: 50,
    height: 20,
    backgroundColor: theme.palette.secondary.grey,
    border: `1px solid ${theme.palette.secondary.mediumGrey}`
  },
  legendNonArchivedDiv: {
    width: 50,
    height: 20,
    backgroundColor: theme.palette.secondary.white,
    border: `1px solid ${theme.palette.secondary.mediumGrey}`
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
  history,
  formerEmployee
}) => {
  const [prs, setPrs] = useState([]);
  const [archivedPrs, setArchivedPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [printLoading, setPrintLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);
  const { value: language } = useContext(LanguageContext.context);
  const prsTogether = [...prs, ...archivedPrs];

  useEffect(() => {
    if (dialogOpen) {
      if (formerEmployee) {
        getAllPrsOfInactiveEmployee(
          employeeId,
          setPrs,
          setArchivedPrs,
          setIsLoading,
          errorContext
        );
      } else {
        getAllPrsByEmployee(
          employeeId,
          setPrs,
          setArchivedPrs,
          setIsLoading,
          errorContext
        );
      }
    }
  }, []);

  const linkToPrSheet = (id, archived) => {
    if (!archived) {
      if (formerEmployee) {
        history.push(`/prDetailInactive/${id}`);
      } else {
        history.push(`/prDetail/${id}`);
      }
    }
    return null;
  };

  // List of all PRs of current employee
  const listOfAllPrs = prsTogether.map((pr, index) => {
    let id = pr.id ? pr.id : pr.prId;
    return (
      <TableRow
        key={index}
        className={pr.archived ? classes.archived : classes.prRow}
      >
        <TableCell onClick={() => linkToPrSheet(id, pr.archived)}>
          {index + 1}
        </TableCell>
        <TableCell onClick={() => linkToPrSheet(id, pr.archived)}>
          {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
        <TableCell>
          {pr.archived ? (
            // Download excel
            <DownloadFile employeeId={pr.employeeId} fileId={id} />
          ) : !pr.inProgress ? (
            printLoading ? (
              <IconButton>
                <CircularProgress />
              </IconButton>
            ) : (
              <IconButton
                onClick={() =>
                  printPdf(pr, language, result => {
                    setPrintLoading(result);
                  })
                }
              >
                <GetAppIcon />
              </IconButton>
            )
          ) : (
            <Typography
              onClick={() => linkToPrSheet(id, pr.archived)}
              color="secondary"
            >
              {intl.formatMessage({
                id: 'pr.inProgress'
              })}
            </Typography>
          )}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Fragment>
      <Dialog open={dialogOpen} onClose={dialogClose} fullWidth maxWidth="sm">
        <IconButton onClick={dialogClose} className={classes.btnClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle>
          <span>{`${firstName} ${lastName}`}</span>
          {prsTogether.length > 0 && (
            <span className={classes.prsNumber}>
              {`${intl.formatMessage({
                id: 'employeeInfo.prsCount'
              })}: ${prsTogether.length}`}
            </span>
          )}
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          {isLoading ? (
            <CircularProgress />
          ) : prsTogether.length > 0 ? (
            <Fragment>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>
                      {intl.formatMessage({
                        id: 'employeeInfo.startDate'
                      })}
                    </TableCell>
                    <TableCell>
                      {intl.formatMessage({
                        id: 'archivedfiles.download'
                      })}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{listOfAllPrs}</TableBody>
              </Table>
              {/* Legend */}
              <List className={classes.legend}>
                <ListItem>
                  <ListItemText
                    secondary={intl.formatMessage({
                      id: 'legend.prArchived'
                    })}
                    secondaryTypographyProps={{
                      variant: 'body2'
                    }}
                  />
                  <ListItemIcon>
                    <div className={classes.legendArchivedDiv} />
                  </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemText
                    secondary={intl.formatMessage({
                      id: 'legend.prNonArchived'
                    })}
                    secondaryTypographyProps={{
                      variant: 'body2'
                    }}
                  />
                  <ListItemIcon>
                    <div className={classes.legendNonArchivedDiv} />
                  </ListItemIcon>
                </ListItem>
              </List>
            </Fragment>
          ) : (
            <Typography variant="body2" className={classes.noPrFound}>
              {`${firstName} ${lastName} ${intl.formatMessage({
                id: 'employeeInfo.noPrsFound'
              })}`}
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(EmployeesPRsDialog)));
