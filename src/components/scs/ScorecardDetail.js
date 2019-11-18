import React, { useEffect, useState, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import ScTabs from './ScTabs';
import ScDetailInformation from './ScDetailInformation';
import { useErrorContext, useUserinfoContext } from '../../helper/contextHooks';
import { fetchScById } from '../../calls/sc';
import { injectIntl } from 'react-intl';

const styles = theme => ({
  ...theme.styledComponents
});

const ScorecardDetail = ({ match, intl, classes }) => {
  const [sc, setSc] = useState(null);
  const [scTab, setScTab] = useState('SC_EMPLOYEE');
  const [isLoading, setIsLoading] = useState(false);
  const error = useErrorContext();
  const user = useUserinfoContext();

  useEffect(() => {
    fetchScById(match.params.id, setSc, setIsLoading, error);
  }, []);

  useEffect(
    () => {
      if (sc && user.isReviewerInSc(sc)) {
        setScTab('SC_REVIEWER');
      } else {
        setScTab('SC_EMPLOYEE');
      }
    },
    [sc]
  );

  const handleChangeTab = (event, value) => {
    setScTab(value);
  };

  return (
    <Fragment>
      {isLoading ? (
        <CircularProgress />
      ) : (
        sc && (
          <Fragment>
            <ScDetailInformation sc={sc} />
            <ScTabs
              sc={sc}
              tabValue={scTab}
              handleChangeTab={handleChangeTab}
            />
          </Fragment>
        )
      )}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScorecardDetail));
