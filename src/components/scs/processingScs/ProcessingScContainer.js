import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import ProcessingScsCard from './ProcessingScCard';
import { useErrorContext } from '../../../helper/contextHooks';
import { getScsToReview } from '../../../calls/sc';
import { translateGeneralStatus } from '../../../helper/string';

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

  useEffect(() => {
    getScsToReview(setProcessingScs, setIsLoading, error);
  }, []);

  const listOfProcessingScs = processingScs.map((sc, index) => {
    return (
      <Grid item key={index} className={classes.padding}>
        <ProcessingScsCard
          sc={sc}
          status={translateGeneralStatus(sc.scStatus)}
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
