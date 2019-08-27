import React from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import DialogActions from '@material-ui/core/DialogActions';

import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';

const styles = () => ({
  list: {
    maxHeight: '300px'
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0
  },
  dialogHeight: {
    height: '400px'
  }
});

export const UploadSuccessDialog = ({
  uploadedFiles,
  onClose,
  open,
  intl,
  classes
}) => {
  const getUnstoredFiles = uploadedFiles => {
    return uploadedFiles.filter(value => value.isStored === false);
  };

  const unstoredFiles = getUnstoredFiles(uploadedFiles);
  const numberOfSuccessfulUploadedFiles =
    uploadedFiles.length - unstoredFiles.length;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth={true}
      aria-labelledby="simple-dialog-title"
      scroll={'paper'}
      className={classes.dialogHeight}
    >
      <DialogTitle>
        <Typography variant={'body2'}>
          {intl.formatMessage({
            id: 'uploadsuccessdialog.files'
          })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant={'body2'}>
          {`${numberOfSuccessfulUploadedFiles} ${intl.formatMessage({
            id: 'uploadsuccessdialog.success'
          })}`}
        </Typography>
        <Typography variant={'body2'}>
          {`${unstoredFiles.length} ${intl.formatMessage({
            id: 'uploadsuccessdialog.error'
          })}`}
        </Typography>

        <List className={classes.list}>
          {unstoredFiles.map((file, index) => {
            return (
              <ListItem key={index} className={classes.listItem}>
                <Typography variant={'body2'}>{file.fileName}</Typography>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <PrStatusActionButton
          releaseButtonClick={onClose}
          label={intl.formatMessage({
            id: 'uploadsuccessdialog.ok'
          })}
        />
      </DialogActions>
    </Dialog>
  );
};

export default injectIntl(withStyles(styles)(UploadSuccessDialog));
