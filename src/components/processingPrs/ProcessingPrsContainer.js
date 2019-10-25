import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import { getPrsToReview } from '../../calls/pr';
import ProcessingPrsCard from './ProcessingPrsCard';
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

const ProcessingPrsContainer = ({ classes, intl }) => {
  const [prsToReview, setPrsToReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(() => {
    getPrsToReview(setPrsToReview, setIsLoading, error);
  }, []);

  const listofPrs = prsToReview.map((pr, index) => (
    <Grid item key={index} className={classes.padding}>
      <ProcessingPrsCard pr={pr} />
    </Grid>
  ));

  return (
    <div className={classes.container}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={40}>
          {listofPrs}
        </Grid>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(ProcessingPrsContainer));
