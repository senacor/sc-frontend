import React from 'react';
import { Button, Typography, withStyles } from '@material-ui/core';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import { injectIntl } from 'react-intl';
import {
  useErrorContext,
  useInfoContext,
  useUserinfoContext
} from '../../../../helper/contextHooks';
import { removeScStatus } from '../../../../calls/sc';
import { SC_STATUS } from '../../../../helper/scSheetData';
import { downloadScAsPdf } from '../helperFunc';
import ArchiveButtonWithDialog from '../ArchiveButtonWithDialog';

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
  btnReopen: {
    marginRight: theme.spacing.unit
  },
  btnArchive: {
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

const SummaryButtonsBelowSheet = ({
  classes,
  intl,
  sc,
  setSc,
  afterScFetched
}) => {
  const user = useUserinfoContext();
  const error = useErrorContext();
  const info = useInfoContext();

  const isReopenScButtonVisible = () => {
    return (
      user.hasRoleHr() &&
      (sc.statusSet.includes(SC_STATUS.CLOSED) &&
        !sc.statusSet.includes(SC_STATUS.ARCHIVED))
    );
  };

  const handlePdfDownload = () => {
    downloadScAsPdf(sc.id, sc.deadline, sc.employee.login, error);
  };

  const handleReopenSc = () => {
    if (user.hasRoleHr()) {
      removeScStatus(
        sc.id,
        SC_STATUS.CLOSED,
        setSc,
        () => {},
        afterScFetched,
        info,
        error
      );
    }
  };

  return (
    <div className={classes.btnContainer}>
      {(user.isReviewerInSc(sc) || user.hasRoleHr()) && (
        <ArchiveButtonWithDialog sc={sc} />
      )}

      <Button
        className={
          isReopenScButtonVisible() ? classes.btnReopen : classes.hidden
        }
        variant="contained"
        color="secondary"
        onClick={handleReopenSc}
      >
        {intl.formatMessage({ id: 'scsheet.reopen' })}
      </Button>

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
};

export default injectIntl(withStyles(styles)(SummaryButtonsBelowSheet));
