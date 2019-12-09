import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { linkToSc } from '../../../calls/sc';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

// Icons
import AssessmentIcon from '@material-ui/icons/Assessment';

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
  content: {
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.secondary.brightGrey}`,
    borderBottom: `1px solid ${theme.palette.secondary.brightGrey}`
  },
  cardFooter: {
    height: 40,
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
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

const ScCard = ({
  classes,
  intl,
  history,
  status,
  sc: { scId, createdDate }
}) => {
  const startDateHeader = (
    <Fragment>
      <Typography variant="body2" className={classes.date}>
        {intl.formatMessage({
          id: 'employeeInfo.startDate'
        })}
      </Typography>
      <Typography variant="body1">
        {formatLocaleDateTime(createdDate, FRONTEND_DATE_FORMAT)}
      </Typography>
    </Fragment>
  );

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={startDateHeader} />
        <CardContent
          className={classes.content}
          onClick={() => linkToSc(scId, history)}
        >
          <AssessmentIcon className={classes.prIcon} />
        </CardContent>
        <div className={classes.cardFooter}>
          <Typography className={classes.inProgress} color="secondary">
            {intl.formatMessage({ id: `${status}` })}
          </Typography>
        </div>
      </Card>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScCard)));
