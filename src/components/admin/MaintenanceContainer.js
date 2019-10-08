import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import MaintenanceTeamTable from './MaintenanceTeamTable';
import FeedbackTable from './feedbacks/FeedbackTable';

const styles = theme => ({});

export const MaintenanceContainer = ({ classes, intl }) => {
  return (
    <Fragment>
      <MaintenanceTeamTable />
      <FeedbackTable />
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(MaintenanceContainer));
