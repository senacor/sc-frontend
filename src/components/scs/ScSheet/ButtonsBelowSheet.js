import React, { memo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Tooltip, Typography, withStyles } from '@material-ui/core';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import PublishScDialog from './PublishScDialog';
import ConfirmDialog from '../../utils/ConfirmDialog';
import { useUserinfoContext } from '../../../helper/contextHooks';
import ArchiveButtonWithDialog from './ArchiveButtonWithDialog';
import { isReady } from './evaluationsCheck';

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
  btnClose: {
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
    handlePublish,
    handleCloseSc,
    handlePdfDownload,
    submitDisabled,
    withEvaluationsButtonDisabled
  }) => {
    const [publishScDialogOpened, setPublishScDialogOpened] = useState(false);
    const [closeScDialogOpened, setCloseScDialogOpened] = useState(false);

    const user = useUserinfoContext();

    const handleOpenPublishDialog = () => {
      setPublishScDialogOpened(true);
    };

    const handleClosePublishScDialog = () => {
      setPublishScDialogOpened(false);
    };

    const handleOpenScClosingDialog = () => {
      setCloseScDialogOpened(true);
    };

    const handleCloseScClosingDialog = () => {
      setCloseScDialogOpened(false);
    };

    return (
      <div className={classes.btnContainer}>
        {(user.isReviewerInSc(sc) || user.hasRoleHr()) && (
          <ArchiveButtonWithDialog sc={sc} />
        )}

        <Tooltip
          title={intl.formatMessage({ id: 'scsheet.tooltip.save' })}
          placement="top"
        >
          <Button
            className={classes.btnSave}
            variant="contained"
            color="secondary"
            onClick={handleSave}
          >
            {intl.formatMessage({ id: 'scsheet.save' })}
          </Button>
        </Tooltip>

        <Tooltip
          title={
            submitDisabled
              ? intl.formatMessage({ id: 'scsheet.tooltip.titleMissing' })
              : intl.formatMessage({ id: 'scsheet.tooltip.publish' })
          }
          placement="top"
        >
          <div>
            <Button
              className={classes.btnSubmit}
              disabled={submitDisabled}
              variant="contained"
              color="primary"
              onClick={handleOpenPublishDialog}
            >
              {intl.formatMessage({ id: 'scsheet.publish' })}
            </Button>
          </div>
        </Tooltip>

        {!user.isOwnerInSc(sc) && (
          <Tooltip
            title={intl.formatMessage({ id: 'scsheet.tooltip.close' })}
            placement="top"
          >
            <Button
              className={isReady(sc) ? classes.btnClose : classes.hidden}
              variant="contained"
              color="secondary"
              onClick={handleOpenScClosingDialog}
            >
              {intl.formatMessage({ id: 'scsheet.closeSc' })}
            </Button>
          </Tooltip>
        )}

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

        <PublishScDialog
          open={publishScDialogOpened}
          handlePublish={handlePublish}
          handleClose={handleClosePublishScDialog}
          withEvaluationsButtonDisabled={withEvaluationsButtonDisabled}
        />
        <ConfirmDialog
          open={closeScDialogOpened}
          handleClose={handleCloseScClosingDialog}
          handleConfirm={() => {
            handleCloseSc();
            handleCloseScClosingDialog();
          }}
          confirmationText={intl.formatMessage({
            id: 'scsheet.closeScDialog.content'
          })}
          confirmationHeader={intl.formatMessage({
            id: 'scsheet.closeScDialog.header'
          })}
        />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.submitDisabled === nextProps.submitDisabled &&
    prevProps.handleSave === nextProps.handleSave &&
    prevProps.handlePublish === nextProps.handlePublish
);

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
