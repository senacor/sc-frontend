import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ScRow from '../ScRow';

const styles = theme => ({
  addProjectButton: {
    color: theme.palette.secondary.yellow
  }
});

const Kompetenz = ({
  isEmployee,
  classes,
  intl,
  kompetenzEmployeeFields,
  kompetenzReviewerFields,
  handleChangePropKeyEmployee,
  handleChangePropKeyReviewer
}) => {
  return (
    <Fragment>
      <ScRow
        fields={
          isEmployee ? kompetenzEmployeeFields : kompetenzReviewerFields
        }
        type={'kompetenz'}
        handleChange={
          isEmployee ? handleChangePropKeyEmployee : handleChangePropKeyReviewer
        }
      />
    </Fragment>
  );
};

export default withRouter(injectIntl(withStyles(styles)(Kompetenz)));
