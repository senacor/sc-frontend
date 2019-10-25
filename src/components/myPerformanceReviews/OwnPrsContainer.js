import React, { useState, useEffect, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import { getOwnPrs } from '../../calls/pr';
import PrCard from './PrCard';
import { RequestPerformanceReview } from './RequestPerformanceReview';
import { useErrorContext } from '../../helper/contextHooks';

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

const OwnPrsContainer = ({ classes, intl }) => {
  const [ownPrs, setOwnPrs] = useState([]);
  const [ownArchivedPrs, setOwnArchivedPrs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const ownPrsTogether = [...ownPrs, ...ownArchivedPrs];

  const error = useErrorContext();

  useEffect(() => {
    getOwnPrs(setOwnPrs, setOwnArchivedPrs, setIsLoading, error);
  }, []);

  const listofOwnPrs = ownPrsTogether.map((pr, index) => (
    <Grid item key={index} className={classes.padding}>
      <PrCard pr={pr} active={true} />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          <RequestPerformanceReview intl={intl} />
          <Grid container spacing={40}>
            {listofOwnPrs}
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(OwnPrsContainer));
