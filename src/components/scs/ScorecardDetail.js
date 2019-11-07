import React, { useEffect, useState, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScTabs from './ScTabs';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext } from '../../helper/contextHooks';
import { fetchScById } from '../../calls/sc';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match }) => {
  const [sc, setSc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const error = useErrorContext();

  useEffect(() => {
    fetchScById(match.params.id, setSc, setIsLoading, error);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        sc && (
          <Fragment>
            <ScDetailInformation sc={sc} />
            <ScTabs sc={sc} />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default withStyles(styles)(ScorecardDetail);
