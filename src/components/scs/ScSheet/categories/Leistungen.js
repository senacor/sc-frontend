import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';
// Material UI
import { IconButton, Tooltip } from '@material-ui/core';

import AddIcon from '@material-ui/icons/AddBox';

const styles = theme => ({
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const Leistungen = ({
  isEmployee,
  classes,
  intl,
  dailyBusinessEmployeeFields,
  dailyBusinessReviewerFields,
  handleChangePropKeyEmployee,
  handleChangePropKeyReviewer,
  removeFieldsEmployee,
  removeFieldsReviewer,
  addFieldsEmployee,
  addFieldsReviewer,
  projectEmployeeFields,
  projectReviewerFields
}) => {
  return (
    <Fragment>
      <ScRow
        fields={
          isEmployee ? dailyBusinessEmployeeFields : dailyBusinessReviewerFields
        }
        type={'dailyBusiness'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
        removeFields={isEmployee ? removeFieldsEmployee : removeFieldsReviewer}
      />
      <Tooltip
        title={intl.formatMessage({
          id: 'scsheet.tooltip.addField.dailyBusiness'
        })}
      >
        <IconButton
          onClick={
            isEmployee
              ? () => addFieldsEmployee('dailyBusiness')
              : () => addFieldsReviewer('dailyBusiness')
          }
        >
          <AddIcon color="primary" />
        </IconButton>
      </Tooltip>
      <ScRow
        fields={isEmployee ? projectEmployeeFields : projectReviewerFields}
        type={'project'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
        removeFields={isEmployee ? removeFieldsEmployee : removeFieldsReviewer}
      />
      <Tooltip
        title={intl.formatMessage({ id: 'scsheet.tooltip.addField.project' })}
      >
        <IconButton
          onClick={
            isEmployee
              ? () => addFieldsEmployee('project')
              : () => addFieldsReviewer('project')
          }
        >
          <AddIcon className={classes.addProjectButton} />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(Leistungen)));
