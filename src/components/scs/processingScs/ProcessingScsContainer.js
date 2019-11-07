import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Grid, CircularProgress } from '@material-ui/core';
import ProcessingScsCard from './ProcessingScCard';

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

const mockedScs = [
  {
    id: 3,
    employeeFirstName: 'First Name',
    employeeLastName: 'Last Name',
    createdDate: [2019, 10, 29],
    inProgress: true
  }
];

const ProcessingScsContainer = ({ classes, intl }) => {
  const isLoading = false; // temporary variable, in future will be set in state

  //   useEffect(() => {
  //     // fetch processing scs
  //   }, []);

  const listOfProcessingScs = mockedScs.map((scs, index) => (
    <Grid item key={index} className={classes.padding}>
      <ProcessingScsCard sc={scs} />
    </Grid>
  ));

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

export default injectIntl(withStyles(styles)(ProcessingScsContainer));
