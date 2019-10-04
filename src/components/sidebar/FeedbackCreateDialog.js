import React, { Fragment, useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles, Button, DialogActions } from '@material-ui/core';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import { addFeedback } from '../../calls/feedbacks';
import { ErrorContext } from '../App';

const styles = theme => ({
  buttons: {
    color: theme.palette.secondary.white
  },
  fullWidth: {
    width: '100%'
  },
  spacing: {
    padding: 3 * theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const FeedbackCreateDialog = ({ classes, intl, open, handleClose }) => {
  const [type, setType] = useState('Bug');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const feedbackTypes = ['Bug', 'Optimization', 'Other'];

  const errorContext = useContext(ErrorContext.context);

  const handleSend = () => {
    addFeedback(type, subject, message, errorContext);
    handleClose();
  };

  const handleChange = event => {
    setType(event.target.value);
  };

  return (
    <Fragment>
      <Dialog open={open} className={classes.dialog}>
        <DialogTitle>
          <Typography variant="h6">
            {intl.formatMessage({
              id: 'feedbackcreatedialog.createfeedback'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.spacing}>
          <InputLabel htmlFor="select-type">
            {intl.formatMessage({
              id: 'feedbackcreatedialog.type'
            })}
          </InputLabel>
          <Select
            input={<Input id="select-type" />}
            className={`${classes.fullWidth} ${classes.margin}`}
            value={type}
            onChange={handleChange}
          >
            {feedbackTypes.map(type => (
              <MenuItem key={type} value={type}>
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
          <TextField
            variant="outlined"
            label={intl.formatMessage({
              id: 'feedbackcreatedialog.subject'
            })}
            onChange={event => setSubject(event.target.value)}
            className={`${classes.fullWidth} ${classes.margin}`}
          />
          <TextField
            variant="outlined"
            multiline
            rows="4"
            rowsMax="4"
            label={intl.formatMessage({
              id: 'feedbackcreatedialog.message'
            })}
            onChange={event => setMessage(event.target.value)}
            className={`${classes.fullWidth} ${classes.margin}`}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSend}
            className={classes.buttons}
            variant="contained"
            color="primary"
            disabled={!subject || !message}
          >
            {intl.formatMessage({
              id: 'feedbackcreatedialog.send'
            })}
          </Button>

          <Button
            onClick={handleClose}
            className={classes.buttons}
            variant="contained"
            color="primary"
          >
            {intl.formatMessage({
              id: 'feedbackcreatedialog.close'
            })}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackCreateDialog));
