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
// Icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import {
  formatLocaleDateTime,
  FRONTEND_DATE_FORMAT
} from '../../../helper/date';

const styles = theme => ({
  card: {
    width: 170,
    height: 255,
    margin: theme.spacing.unit,
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  smaller: {
    fontSize: '0.9rem'
  },
  header: {
    backgroundColor: theme.palette.secondary.brightGrey,
    height: 45,
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
    height: 30,
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
  sc: { scId, createdDate, periodName }
}) => {
  const periodHeader = (
    <Fragment>
      <Typography variant="body1" className={classes.smaller}>
        {intl.formatMessage({ id: 'sc.period' })}
      </Typography>
      <Typography variant="body1" className={classes.smaller}>
        {periodName}
      </Typography>
    </Fragment>
  );

  return (
    <Fragment>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title={periodHeader} />
        <CardContent
          className={classes.content}
          onClick={() => linkToSc(scId, history)}
        >
          <AssessmentIcon className={classes.prIcon} />
          <Fragment>
            <Typography variant="body1" className={classes.smaller}>
              {intl.formatMessage({ id: 'sc.startdate' })}
            </Typography>
            <Typography variant="body1" className={classes.smaller}>
              {formatLocaleDateTime(createdDate, FRONTEND_DATE_FORMAT)}
            </Typography>
          </Fragment>
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
