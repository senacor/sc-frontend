import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import SummaryViewWithoutPr from './SummaryViewWithoutPr';
import SummaryViewWithPr from './SummaryViewWithPr';

const styles = theme => ({
  ...theme.styledComponents,
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const ScSheetSummaryContainer = ({ sc, setSc, scWithPr, afterScFetched }) => {
  return (
    <Fragment>
      {scWithPr ?
        <SummaryViewWithPr sc={sc} setSc={setSc} afterScFetched={afterScFetched} /> :
        <SummaryViewWithoutPr sc={sc} setSc={setSc} afterScFetched={afterScFetched} />}
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(ScSheetSummaryContainer));
