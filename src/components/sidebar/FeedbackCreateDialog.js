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
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  ...theme,
  buttons: {
    color: theme.palette.secondary.white,
    margin: theme.spacing.unit
  },
  fullWidth: {
    width: '100%'
  },
  dialogContent: {
    padding: 3 * theme.spacing.unit,
    paddingBottom: 0
  },
  margin: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  input: {
    minWidth: 150
  },
  maxLength: {
    height: 25,
    marginLeft: theme.spacing.unit * 4
  },
  maxLengthFont: {
    color: theme.palette.secondary.darkRed
  }
});

const FeedbackCreateDialog = ({ classes, intl, open, handleClose }) => {
  const feedbackTypes = [
    {
      name: 'Bug',
      label: intl.formatMessage({
        id: 'feedbackcreatedialog.bug'
      })
    },
    {
      name: 'Optimization',
      label: intl.formatMessage({
        id: 'feedbackcreatedialog.optimization'
      })
    },
    {
      name: 'Other',
      label: intl.formatMessage({
        id: 'feedbackcreatedialog.other'
      })
    }
  ];

  const [type, setType] = useState(feedbackTypes[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [maxLengthReached, setMaxLengthReached] = useState(false);

  const errorContext = useContext(ErrorContext.context);

  const handleSend = () => {
    addFeedback(type.name, subject, message, errorContext);
    setMaxLengthReached(false);
    handleClose();
  };

  const handleChangeType = event => {
    setType(event.target.value);
  };

  const handleChangeSubject = event => {
    setSubject(event.target.value);
    if (event.target.value.length >= 120) {
      setMaxLengthReached(true);
    } else {
      setMaxLengthReached(false);
    }
  };

  const handleChangeMessage = event => {
    setMessage(event.target.value);
    if (event.target.value.length >= 1000) {
      setMaxLengthReached(true);
    } else {
      setMaxLengthReached(false);
    }
  };

  return (
    <Fragment>
      <Dialog open={open} fullWidth maxWidth={'md'}>
        <DialogTitle>
          <div>
            <Typography variant="h6">
              {intl.formatMessage({
                id: 'feedbackcreatedialog.createfeedback'
              })}
            </Typography>
          </div>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <FormControl className={`${classes.formControl} ${classes.input}`}>
              <InputLabel htmlFor="select-type">
                {intl.formatMessage({
                  id: 'feedbackcreatedialog.type'
                })}
              </InputLabel>
              <Select
                input={<Input id="select-type" />}
                className={`${classes.margin}`}
                value={type.label}
                onChange={handleChangeType}
              >
                {feedbackTypes.map(type => (
                  <MenuItem key={type.name} value={type}>
                    <ListItemText primary={type.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={classes.maxLength}>
              {maxLengthReached && (
                <Typography className={classes.maxLengthFont}>
                  {intl.formatMessage({ id: 'feedbackcreatedialog.maxLength' })}
                </Typography>
              )}
            </div>
          </div>
          <TextField
            variant="outlined"
            label={intl.formatMessage({
              id: 'feedbackcreatedialog.subject'
            })}
            onChange={handleChangeSubject}
            className={`${classes.fullWidth} ${classes.margin}`}
            inputProps={{ maxLength: 120 }}
          />
          <TextField
            variant="outlined"
            multiline
            rows="6"
            rowsMax="6"
            label={intl.formatMessage({
              id: 'feedbackcreatedialog.message'
            })}
            onChange={handleChangeMessage}
            className={`${classes.fullWidth} ${classes.margin}`}
            inputProps={{ maxLength: 1000 }}
          />
        </DialogContent>
        <DialogActions>
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
          <Button
            onClick={handleSend}
            className={classes.buttons}
            variant="contained"
            color="secondary"
            disabled={!subject || !message}
          >
            {intl.formatMessage({
              id: 'feedbackcreatedialog.send'
            })}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default injectIntl(withStyles(styles)(FeedbackCreateDialog));
