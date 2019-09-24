import React, { useState, useContext, useEffect, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { ErrorContext } from '../../App';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';
import { withRouter } from 'react-router-dom';
import { DownloadFile } from '../../fileStorage/DownloadFile';

// Calls
import { getAllPrsByEmployee } from '../../../actions/calls/employees';

// Material UI
import Button from '@material-ui/core/Button';
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
    backgroundColor: theme.palette.secondary.brighterGrey
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
    backgroundColor: theme.palette.secondary.brighterGrey,
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
  history
}) => {
  const [prs, setPrs] = useState([]);
  const [archivedPrs, setArchivedPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorContext = useContext(ErrorContext.context);
  const prsTogether = [...prs, ...archivedPrs];

  useEffect(() => {
    if (dialogOpen) {
      getAllPrsByEmployee(
        employeeId,
        setPrs,
        setArchivedPrs,
        setIsLoading,
        errorContext
      );
    }
  }, []);

  const linkToPrSheet = (id, archived) => {
    if (!archived) {
      history.push(`/prDetail/${id}`);
    }
    return null;
  };

  const downloadPdf = id => {
    const iframe = document.frames
      ? document.frames[id]
      : document.getElementById(id);
    const iframeWindow = iframe.contentWindow || iframe;

    iframe.focus();
    iframeWindow.print();

    return false;
  };

  // List of all PRs of current employee
  const listOfAllPrs = prsTogether.map((pr, index) => {
    return (
      <TableRow
        key={index}
        className={pr.archived ? classes.archived : classes.prRow}
      >
        <TableCell onClick={() => linkToPrSheet(pr.prId, pr.archived)}>
          {index + 1}
        </TableCell>
        <TableCell onClick={() => linkToPrSheet(pr.prId, pr.archived)}>
          {formatLocaleDateTime(pr.startDate, FRONTEND_DATE_FORMAT)}
        </TableCell>
        <TableCell>
          <iframe
            id="pr"
            src={`prDetailWithoutAppbar/${pr.prId}`}
            style={{ display: 'none' }}
            title="Pr"
          />
          <Button onClick={() => downloadPdf('pr')}>
            <DownloadIcon />
          </Button>
          {pr.archived ? (
            // Download excel
            !pr.inProgress ? (
              <DownloadFile employeeId={pr.employeeId} fileId={pr.prId} />
            ) : null
          ) : (
            // Download pdf
            <IconButton>
              <GetAppIcon />
            </IconButton>
          )}
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
        ) : prs.length > 0 ? (
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
                  secondaryTypographyProps={{ variant: 'body2' }}
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
                  secondaryTypographyProps={{ variant: 'body2' }}
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
  );
};

export default withRouter(injectIntl(withStyles(styles)(EmployeesPRsDialog)));
