import React, { Fragment, useContext, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { withRouter } from 'react-router-dom';
import { DownloadFile } from '../fileStorage/DownloadFile';
import { linkToPr } from '../../calls/pr';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
// Icons
import PrIcon from '@material-ui/icons/PermContactCalendar';
import PrArchivedIcon from '@material-ui/icons/Archive';
import GetAppIcon from '@material-ui/icons/GetApp';
import { printPdf } from '../../helper/pdfExport';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LanguageContext } from '../App';

const styles = theme => ({
  card: {
    width: 170,
    height: 210,
    margin: theme.spacing.unit,
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  header: {
    backgroundColor: theme.palette.secondary.brightGrey,
    height: 40,
    textAlign: 'center',
    padding: theme.spacing.unit,
    cursor: 'auto'
  },
  date: {
    color: theme.palette.secondary.darkGrey
  },
  archivedContent: {
    backgroundColor: theme.palette.secondary.grey,
    textAlign: 'center',
    cursor: 'auto'
  },
  content: {
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.secondary.brightGrey}`,
    borderBottom: `1px solid ${theme.palette.secondary.brightGrey}`
  },
  prIcon: {
    fontSize: '4rem',
    width: '100%'
  },
  inProgress: {
    cursor: 'pointer'
  },
  actions: {
    cursor: 'auto',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const PrCard = ({
  intl,
  classes,
  history,
  pr,
  pr: { prId, archived, inProgress, employeeId, startDate },
  active
}) => {
  const { value: language } = useContext(LanguageContext.context);
  const [printLoading, setPrintLoading] = useState(false);

  const renderActions = () => {
    if (archived) {
      // Download Excel
      return <DownloadFile employeeId={employeeId} fileId={prId} />;
    }
    // Download pdf
    if (inProgress) {
      return (
        <Typography
          className={classes.inProgress}
          color="secondary"
          onClick={() => linkToPr(prId, archived, history)}
        >
          {intl.formatMessage({ id: 'pr.inProgress' })}
        </Typography>
      );
    }
    return printLoading ? (
      <IconButton>
        <CircularProgress />
      </IconButton>
    ) : (
      <IconButton
        onClick={() =>
          printPdf(pr, language, active, result => {
            setPrintLoading(result);
          })
        }
      >
        {' '}
        <GetAppIcon />
      </IconButton>
    );
  };

  const startDateHeader = (
    <Fragment>
      <Typography variant="body2" className={classes.date}>
        {intl.formatMessage({
          id: 'employeeInfo.startDate'
        })}
      </Typography>
      <Typography variant="body1">
        {formatLocaleDateTime(startDate, FRONTEND_DATE_FORMAT)}
      </Typography>
    </Fragment>
  );

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={startDateHeader} />
        <CardContent
          className={archived ? classes.archivedContent : classes.content}
          onClick={() => linkToPr(prId, archived, history)}
        >
          {archived ? (
            <PrArchivedIcon className={classes.prIcon} />
          ) : (
            <PrIcon className={classes.prIcon} />
          )}
        </CardContent>
        <CardActions className={classes.actions}>{renderActions()}</CardActions>
      </Card>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrCard)));
