import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
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

const ScsCard = ({ classes, intl, scs: { createdDate, inProgress } }) => {
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
        <CardContent className={classes.content}>
          <AssessmentIcon className={classes.prIcon} />
        </CardContent>
        <CardActions className={classes.actions}>
          <Typography className={classes.inProgress} color="secondary">
            {intl.formatMessage({ id: 'pr.inProgress' })}
          </Typography>
        </CardActions>
      </Card>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ScsCard)));
