import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import { useErrorContext } from '../../helper/contextHooks';
import { getScsToReview } from '../../calls/sc';
import ProcessingScsCard from './ProcessingScsCard';

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

const ProcessingScsContainer = ({ classes }) => {
  const [scsToReview, setScsToReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(() => {
    getScsToReview(setScsToReview, setIsLoading, error);
  }, []);

  const listofScs = scsToReview.map((sc, index) => (
    <Grid item key={index} className={classes.padding}>
      <ProcessingScsCard sc={sc} />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={40}>
          {listofScs}
        </Grid>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ProcessingScsContainer));
