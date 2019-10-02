import React, { useState, useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import { ErrorContext } from '../App';
import { getPrsToReview } from '../../calls/pr';
import ProcessingPrsCard from './ProcessingPrsCard';

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

  const errorContext = useContext(ErrorContext.context);

  useEffect(() => {
    getPrsToReview(setPrsToReview, setIsLoading, errorContext);
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
