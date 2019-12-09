import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Button, Tooltip } from '@material-ui/core';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { SC_STATUS } from '../../../helper/scSheetData';

const styles = theme => ({
  btnContainer: {
    padding: theme.spacing.unit * 2,
    position: 'fixed',
    bottom: 5,
    right: 5
  },
  btnSave: {
    marginRight: theme.spacing.unit * 2
  },
  submitBtnContainer: {
    display: 'inline-block'
  },
  hidden: {
    display: 'none'
  }
});

const ButtonsBelowSheet = ({
  classes,
  intl,
  sc,
  handleSave,
  handleSubmit,
  submitDisabled
}) => {
  const user = useUserinfoContext();
  const [hidden, setHidden] = useState(false);
  const statuses = sc.statusSet;

  useEffect(
    () => {
      if (
        (user.isReviewerInSc(sc) &&
          statuses.includes(SC_STATUS.REVIEWER_SUBMITTED)) ||
        (user.isOwnerInSc(sc) &&
          statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)) ||
        user.hasRoleHr()
      ) {
        setHidden(true);
      }
    },
    [sc]
  );

  const disableSaveButton = () => {
    if (user.isReviewerInSc(sc)) {
      return sc.statusSet.includes(SC_STATUS.REVIEWER_SUBMITTED);
    } else if (user.isOwnerInSc(sc)) {
      return sc.statusSet.includes(SC_STATUS.EMPLOYEE_SUBMITTED);
    }
    return true;
  };

  return (
    <div className={hidden ? classes.hidden : classes.btnContainer}>
      <Button
        disabled={disableSaveButton()}
        className={classes.btnSave}
        variant="contained"
        color="secondary"
        onClick={handleSave}
      >
        {intl.formatMessage({ id: 'scsheet.save' })}
      </Button>

      <Tooltip
        title={
          submitDisabled
            ? intl.formatMessage({ id: 'scsheet.tooltip.titleMissing' })
            : ''
        }
        placement="top"
      >
        <div className={classes.submitBtnContainer}>
          <Button
            disabled={submitDisabled}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {intl.formatMessage({ id: 'scsheet.submit' })}
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
