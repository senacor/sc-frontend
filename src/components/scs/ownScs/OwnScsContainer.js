import React, { Fragment, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { CircularProgress, Grid, withStyles } from '@material-ui/core';
import { useErrorContext } from '../../../helper/contextHooks';
import { getOwnScs } from '../../../calls/sc';
import ScCard from './ScCard';
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

const OwnScsContainer = ({ classes }) => {
  const [ownScs, setOwnScs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const error = useErrorContext();

  useEffect(() => {
    getOwnScs(setOwnScs, setIsLoading, error);
  }, []);

  const listofOwnScs = ownScs.map((sc, index) => {
    return (
      <Grid item key={index} className={classes.padding}>
        <ScCard sc={sc} status={translateGeneralStatus(sc.scStatus)} />
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
            {listofOwnScs}
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

export default injectIntl(withStyles(styles)(OwnScsContainer));
