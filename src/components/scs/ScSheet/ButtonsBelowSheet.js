import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Button } from '@material-ui/core';
import { useUserinfoContext } from '../../../helper/contextHooks';

const styles = theme => ({
  btnContainer: {
    padding: theme.spacing.unit * 2,
    textAlign: 'right'
  },
  btnSave: {
    marginRight: theme.spacing.unit * 2
  }
});

const ButtonsBelowSheet = ({ classes, intl, sc, handleSave, handleSubmit }) => {
  const user = useUserinfoContext();

  const disableSaveButton = () => {
    if (user.isReviewerInSc(sc)) {
      return sc.statusSet.includes('REVIEWER_SUBMITTED');
    }

    if (user.isOwnerInSc(sc)) {
      return sc.statusSet.includes('EMPLOYEE_SUBMITTED');
    }

    return true;
  };

  return (
    <div className={classes.btnContainer}>
      <Button
        disabled={disableSaveButton()}
        className={classes.btnSave}
        variant="contained"
        color="secondary"
        onClick={handleSave}
      >
        {intl.formatMessage({ id: 'scsheet.save' })}
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {intl.formatMessage({ id: 'scsheet.submit' })}
      </Button>
    </div>
  );
};

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
