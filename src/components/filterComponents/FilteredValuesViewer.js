import React from 'react';
import { injectIntl } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  valuesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit
  },
  textContainer: {
    color: theme.palette.secondary.darkGrey,
    textAlign: 'center',
    display: 'flex',
    marginRight: theme.spacing.unit
  },
  textHeader: {
    color: theme.palette.secondary.darkGrey,
    textAlign: 'center',
    display: 'flex',
    marginRight: theme.spacing.unit / 2
  },
  textValue: {
    color: theme.palette.secondary.darkGrey,
    textAlign: 'center',
    display: 'flex'
  }
});

const FilteredValuesViewer = ({ classes, intl, sortingData }) => {
  let rowComponent;
  if (sortingData && sortingData.length > 0) {
    rowComponent = sortingData
      .filter(a => a.stateValue && a.stateValue.length > 0)
      .map(fv => (
        <div className={classes.textContainer}>
          <Typography className={classes.textHeader}>
            <b>{intl.formatMessage({ id: fv.sortBy })}: </b>
          </Typography>
          <Typography className={classes.textValue}>
            {fv.sortBy === 'employeeInfo.scStatus'
              ? fv.stateValue
                  .map(sv => intl.formatMessage({ id: sv }))
                  .join(', ')
              : fv.sortBy === 'employeeInfo.supervisor'
              ? fv.stateValue
              : fv.stateValue.join(', ')}
          </Typography>
        </div>
      ));
  } else {
    rowComponent = '';
  }

  return <div className={classes.valuesContainer}>{rowComponent}</div>;
};

export default injectIntl(withStyles(styles)(FilteredValuesViewer));
