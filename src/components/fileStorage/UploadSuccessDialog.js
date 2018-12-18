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

const styles = {
  list: {
    maxHeight: '300px'
  },
  listItem: {
    paddingTop: '0px',
    paddingBottom: '0px'
  }
};

export class UploadSuccessDialog extends React.Component {
  getUnstoredFiles = uploadedFiles => {
    return uploadedFiles.filter(function(value) {
      return value.isStored === false;
    });
  };
  render() {
    const { onClose, open, uploadedFiles, classes, ...other } = this.props;
    const unstoredFiles = this.getUnstoredFiles(uploadedFiles);
    const numberOfSuccessfulUploadedFiles =
      uploadedFiles.length - unstoredFiles.length;

    return (
      <Dialog
        onClose={onClose}
        open={open}
        fullWidth={true}
        aria-labelledby="simple-dialog-title"
        {...other}
        style={{ height: '400px' }}
        scroll={'paper'}
      >
        <DialogTitle>
          <Typography variant={'body2'}>Uploaded Files</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant={'body2'}>
            {numberOfSuccessfulUploadedFiles} Dateien wurden erfolgreich
            gespeichert.
          </Typography>
          <Typography variant={'body2'}>
            {unstoredFiles.length} Dateien konnten nicht gespeichert werden.
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
          <PrStatusActionButton releaseButtonClick={onClose} label={'Ok'} />
        </DialogActions>
      </Dialog>
    );
  }
}

const StyledComponent = withStyles(styles)(UploadSuccessDialog);
export default StyledComponent;
