import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { withRouter } from 'react-router-dom';
import { linkToPr } from '../../actions/calls/pr';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';

// Icons
import PrIcon from '@material-ui/icons/PermContactCalendar';

const styles = theme => ({
  card: {
    width: 200,
    height: 265,
    margin: theme.spacing.unit,
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  header: {
    backgroundColor: theme.palette.secondary.brightGrey,
    height: 50,
    textAlign: 'center',
    padding: theme.spacing.unit,
    cursor: 'auto'
  },
  firstname: {
    fontSize: '1.2rem'
  },
  lastname: {
    fontSize: '1.4rem'
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
    borderTop: `1px solid ${theme.palette.secondary.brightGrey}`
  },
  prIcon: {
    fontSize: '4rem',
    width: '100%'
  },
  occasion: {
    backgroundColor: theme.palette.secondary.brightGrey,
    textAlign: 'center',
    padding: '5px 0'
  }
});

const PrCard = ({
  intl,
  classes,
  history,
  pr: { prId, employeeFirstName, employeeLastName, prOccasion, startDate }
}) => {
  const replaceDashInString = string => {
    return string.replace(/_/g, ' ');
  };

  const startDateDiv = (
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

  const employeeName = (
    <Fragment>
      <Typography className={classes.firstname}>{employeeFirstName}</Typography>
      <Typography className={classes.lastname}>{employeeLastName}</Typography>
    </Fragment>
  );

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title={employeeName} />
      <CardContent
        className={classes.content}
        onClick={() => linkToPr(prId, null, history)}
      >
        <PrIcon className={classes.prIcon} />
        <div>{startDateDiv}</div>
      </CardContent>
      {/* Occasion div */}
      <div className={classes.occasion}>
        <Typography variant="body2">{`${intl.formatMessage({
          id: 'pr.occasion'
        })}:`}</Typography>
        <Typography variant="body1">
          {replaceDashInString(prOccasion)}
        </Typography>
      </div>
    </Card>
  );
};

export default withRouter(injectIntl(withStyles(styles)(PrCard)));
