import React, { Fragment, useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import ProcessingScsCard from './ProcessingScCard';
import {
  useErrorContext,
  useUserinfoContext
} from '../../../helper/contextHooks';
import { getScsToReview } from '../../../calls/sc';
import { determineScRole } from '../helperFunc';

const styles = theme => ({
  ...theme,
  container: {
    height: '70vh',
    padding: 3 * theme.spacing.unit,
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  padding: 3 * theme.spacing.unit
});

const ProcessingScContainer = ({ classes }) => {
  const [processingScs, setProcessingScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();
  const userId = useUserinfoContext().context.value.userinfo.userId;

  useEffect(() => {
    getScsToReview(setProcessingScs, setIsLoading, error);
  }, []);

  const listOfProcessingScs = processingScs.map((sc, index) => {
    const statuses = sc.statusSet;
    const isOwner = userId === sc.employeeId;
    const isReviewer = userId === sc.reviewer1 || userId === sc.reviewer2;
    return (
      <Grid item key={index} className={classes.padding}>
        <ProcessingScsCard
          sc={sc}
          status={determineScRole(isOwner, isReviewer, statuses)}
        />
      </Grid>
    );
  });

  return (
    <div className={classes.container}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <Grid container spacing={40}>
            {listOfProcessingScs}
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ProcessingScContainer));
