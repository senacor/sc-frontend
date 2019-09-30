import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { formatLocaleDateTime, FRONTEND_DATE_FORMAT } from '../../helper/date';
import { withRouter } from 'react-router-dom';
import { linkToPr } from '../../calls/pr';

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
    height: 270,
    margin: theme.spacing.unit,
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
    fontSize: '1rem'
  },
  lastname: {
    fontSize: '1.2rem'
  },
  subtitle: {
    color: theme.palette.secondary.darkGrey
  },
  content: {
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.secondary.brightGrey}`,
    cursor: 'pointer'
  },
  prIcon: {
    fontSize: '4rem',
    width: '100%'
  },
  occasion: {
    backgroundColor: theme.palette.secondary.brightGrey,
    textAlign: 'center',
    height: 50,
    margin: 'auto 0',
    padding: '5px 0'
  }
});

const ProcessingPrsCard = ({
  intl,
  classes,
  history,
  pr: { prId, employeeFirstName, employeeLastName, prOccasion, startDate }
}) => {
  // Replacing "_" with " " and setting only first letter as capital
  const modifyString = string => {
    const replacedStr =
      string.charAt(0).toUpperCase() +
      string
        .slice(1)
        .toLowerCase()
        .replace(/_/g, ' ');
    return replacedStr;
  };

  const startDateContainer = (
    <Fragment>
      <Typography variant="body2" className={classes.subtitle}>
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
        <div>{startDateContainer}</div>
      </CardContent>
      {/* Occasion container */}
      <div className={classes.occasion}>
        <Typography variant="body2" className={classes.subtitle}>
          {intl.formatMessage({
            id: 'pr.occasion'
          })}
        </Typography>
        <Typography variant="caption">{modifyString(prOccasion)}</Typography>
      </div>
    </Card>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ProcessingPrsCard)));
