import React, { memo } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Tooltip, withStyles, Typography } from '@material-ui/core';
import { useUserinfoContext } from '../../../helper/contextHooks';
import { SC_STATUS } from '../../../helper/scSheetData';
import PdfIcon from '@material-ui/icons/PictureAsPdf';

const styles = theme => ({
  btnContainer: {
    padding: theme.spacing.unit * 2,
    position: 'fixed',
    display: 'flex',
    bottom: 5,
    right: 5
  },
  hidden: {
    display: 'none'
  },
  btnSubmit: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  btnDownload: {
    background: theme.palette.secondary.darkYellow,
    color: theme.palette.secondary.white
  },
  btnDownloadText: {
    color: theme.palette.secondary.white,
    paddingLeft: theme.spacing.unit
  }
});

const ButtonsBelowSheet = memo(
  ({
    classes,
    intl,
    sc,
    handleSave,
    handleSubmit,
    handlePdfDownload,
    submitDisabled
  }) => {
    const user = useUserinfoContext();

    const isButtonDisabled = () => {
      if (user.isReviewerInSc(sc)) {
        return sc.statusSet.includes(SC_STATUS.REVIEWER_SUBMITTED);
      } else if (user.isOwnerInSc(sc)) {
        return sc.statusSet.includes(SC_STATUS.EMPLOYEE_SUBMITTED);
      }
      return true;
    };

    return (
      <div className={classes.btnContainer}>
        <Button
          disabled={isButtonDisabled()}
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
          <div>
            <Button
              className={classes.btnSubmit}
              disabled={submitDisabled || isButtonDisabled()}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {intl.formatMessage({ id: 'scsheet.submit' })}
            </Button>
          </div>
        </Tooltip>

        <Button
          className={classes.btnDownload}
          variant="contained"
          onClick={handlePdfDownload}
          download
        >
          <PdfIcon />
          <Typography className={classes.btnDownloadText}>
            {intl.formatMessage({ id: 'scsheet.downloadPdf' })}
          </Typography>
        </Button>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.submitDisabled === nextProps.submitDisabled &&
    prevProps.handleSave === nextProps.handleSave &&
    prevProps.handleSubmit === nextProps.handleSubmit
);

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
