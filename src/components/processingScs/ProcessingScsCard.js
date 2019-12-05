import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { linkToSc } from '../../calls/sc';
import { modifyString } from '../../helper/string';
// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// Icons
import ScIcon from '@material-ui/icons/InsertChart';

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
  progressNoReviewers: {
    color: theme.palette.secondary.darkRed
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
  scIcon: {
    fontSize: '4rem',
    width: '100%'
  },
  occasion: {
    backgroundColor: theme.palette.secondary.brightGrey,
    textAlign: 'center',
    height: 85,
    margin: 'auto 0',
    padding: '0 0'
  }
});

const ProcessingScsCard = ({
  intl,
  classes,
  history,
  sc: {
    reviewer1,
    reviewer2,
    scId,
    employeeFirstName,
    employeeLastName,
    department,
    inProgress,
    employeePosition
  }
}) => {
  const employeeName = (
    <Fragment>
      <Typography className={classes.firstname}>{employeeFirstName}</Typography>
      <Typography className={classes.lastname}>{employeeLastName}</Typography>
    </Fragment>
  );

  const showProgress = () => {
    if (!inProgress) {
      return (
        <Typography variant="caption">
          {intl.formatMessage({ id: 'scscard.finished' })}
        </Typography>
      );
    }
    if (!reviewer1 && !reviewer2) {
      return (
        <Typography variant="caption" className={classes.progressNoReviewers}>
          {intl.formatMessage({ id: 'sc.no.reviewer' })}
        </Typography>
      );
    }
    return (
      <Typography variant="caption">
        {intl.formatMessage({ id: 'scscard.inprogress' })}
      </Typography>
    );
  };

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.header} title={employeeName} />
      <CardContent
        className={classes.content}
        onClick={() => linkToSc(scId, history)}
      >
        <ScIcon className={classes.scIcon} />
        <div>
          <Fragment>
            <Typography variant="body1">{department}</Typography>
          </Fragment>
        </div>
      </CardContent>
      {/* Occasion container */}
      <div className={classes.occasion}>
        <br />
        <Typography variant="body1">
          {modifyString(employeePosition)}
        </Typography>
        {showProgress()}
      </div>
    </Card>
  );
};

export default withRouter(injectIntl(withStyles(styles)(ProcessingScsCard)));
