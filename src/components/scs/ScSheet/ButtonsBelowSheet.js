import React, { memo, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Tooltip, withStyles, Typography } from '@material-ui/core';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import PublishScDialog from "./PublishScDialog";
import ConfirmDialog from '../../utils/ConfirmDialog';
import {useUserinfoContext} from "../../../helper/contextHooks";
import {SC_STATUS} from "../../../helper/scSheetData";

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
    closeScButtonHidden
  }) => {
    const user = useUserinfoContext();
    const [publishScDialogOpened, setPublishScDialogOpened] = useState(false);
    const [closeScDialogOpened, setCloseScDialogOpened] = useState(false);

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

    const isWithEvaluationsButtonDisabled = () => {
      if (user.isOwnerInSc(sc)) {
        return isAnyEvaluationNotFilled(sc.privateEmployeeData, sc.statusSet.includes(SC_STATUS.WITH_PR));
      }
      if (user.isReviewerInSc(sc)) {
        return isAnyEvaluationNotFilled(sc.privateReviewerData, sc.statusSet.includes(SC_STATUS.WITH_PR));
      }
    };

    const isAnyEvaluationNotFilled = (sectionData, withPr) => {
      if (withPr) {
        if (sectionData.serviceQuality.evaluation === '0') return true;
        if (sectionData.impactOnTeam.evaluation === '0') return true;
        if (sectionData.impactOnCompany.evaluation === '0') return true;
        if (sectionData.skillsInTheFields.evaluation === '0') return true;
      } else {
        if (sectionData.workQuality.evaluation === '0') return true;
        if (sectionData.workEfficiency.evaluation === '0') return true;
      }
      return false;
    };

    return (
      <div className={classes.btnContainer}>
        <Button
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
              disabled={submitDisabled}
              variant="contained"
              color="primary"
              onClick={handleOpenPublishDialog}
            >
              {intl.formatMessage({ id: 'scsheet.publish' })}
            </Button>
          </div>
        </Tooltip>

        <Button
          className={sc.statusSet.includes(SC_STATUS.REVIEWER_PUBLISHED) ? classes.btnClose : classes.hidden}
          variant="contained"
          color="secondary"
          onClick={handleOpenScClosingDialog}
        >
          {intl.formatMessage({ id: 'scsheet.closeSc' })}
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

        <PublishScDialog
          open={publishScDialogOpened}
          handlePublish={handlePublish}
          handleClose={handleClosePublishScDialog}
          withEvaluationsButtonDisabled={isWithEvaluationsButtonDisabled()}
        />
        <ConfirmDialog
          open={closeScDialogOpened}
          handleClose={handleCloseScClosingDialog}
          handleConfirm={() => { handleCloseSc(); handleCloseScClosingDialog(); }}
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
    prevProps.handlePublish === nextProps.handlePublish &&
    prevProps.closeScButtonHidden === nextProps.closeScButtonHidden
);

export default injectIntl(withStyles(styles)(ButtonsBelowSheet));
