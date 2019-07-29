import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import PrStatusActionButton from '../pr/prDetail/PrStatusActionButton';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import ListItem from '@material-ui/core/ListItem';
import DialogActions from '@material-ui/core/DialogActions';
import { injectIntl } from 'react-intl';

const styles = {
  list: {
    maxHeight: '300px'
  },
  listItem: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
};

export const UploadSuccessDialog = props => {
  const getUnstoredFiles = uploadedFiles => {
    return uploadedFiles.filter(value => value.isStored === false);
  };

  const unstoredFiles = getUnstoredFiles(props.uploadedFiles);
  const numberOfSuccessfulUploadedFiles =
    props.uploadedFiles.length - unstoredFiles.length;

  return (
    <Dialog
      onClose={props.onClose}
      open={props.open}
      fullWidth={true}
      aria-labelledby="simple-dialog-title"
      style={{ height: '400px' }}
      scroll={'paper'}
    >
      <DialogTitle>
        <Typography variant={'body2'}>
          {props.intl.formatMessage({
            id: 'uploadsuccessdialog.files'
          })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant={'body2'}>
          {`${numberOfSuccessfulUploadedFiles} ${props.intl.formatMessage({
            id: 'uploadsuccessdialog.success'
          })}`}
        </Typography>
        <Typography variant={'body2'}>
          {`${unstoredFiles.length} ${props.intl.formatMessage({
            id: 'uploadsuccessdialog.error'
          })}`}
        </Typography>

        <List className={props.classes.list}>
          {unstoredFiles.map((file, index) => {
            return (
              <ListItem key={index} className={props.classes.listItem}>
                <Typography variant={'body2'}>{file.fileName}</Typography>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <PrStatusActionButton
          releaseButtonClick={props.onClose}
          label={props.intl.formatMessage({
            id: 'uploadsuccessdialog.ok'
          })}
        />
      </DialogActions>
    </Dialog>
  );
};

const StyledComponent = withStyles(styles)(UploadSuccessDialog);
export default injectIntl(StyledComponent);
