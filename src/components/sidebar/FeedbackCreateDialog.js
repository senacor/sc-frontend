import React, { Fragment, useState } from 'react';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { addFeedback, addFeedbackFromLogin } from '../../calls/feedbacks';
// Material UI
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useErrorContext, useInfoContext } from '../../helper/contextHooks';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Zoom from '@material-ui/core/Zoom';

const styles = theme => ({
  ...theme,
  buttons: {
    color: theme.palette.secondary.white,
    margin: theme.spacing.unit
  },
  sentCheck: {
    color: theme.palette.secondary.green,
    fontSize: 12 * theme.spacing.unit
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  sentDialogContent: {
    padding: 3 * theme.spacing.unit,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  dialogContent: {
    padding: 3 * theme.spacing.unit,
    paddingBottom: 0
  },
  dialogContainer: {
    display: 'flex',
    alignItems: 'flex-end'
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

const FeedbackCreateDialog = ({ classes, intl, open, handleClose, login }) => {
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

  const [type, setType] = useState(feedbackTypes[0].name);
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [message, setMessage] = useState('');
  const [maxLengthReached, setMaxLengthReached] = useState(false);

  const error = useErrorContext();
  const info = useInfoContext();

  const handleSend = () => {
    addFeedback(type, subject, message, error, info);
    setMaxLengthReached(false);
    handleClose();
  };

  const handleSendFromLogin = () => {
    addFeedbackFromLogin(email, type, subject, message, error, info);
    setMaxLengthReached(false);
    setFeedbackSent(true);
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

  const invalidEmail =
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !email || email.length < 1;

  const feedbackSentDialog = () => {
    return (
      <Fragment>
        <Dialog
          open={open}
          maxWidth={'md'}
          TransitionComponent={Zoom}
          transitionDuration={{ enter: 500 }}
        >
          <DialogContent className={classes.sentDialogContent}>
            <div className={classes.flexCenter}>
              <CheckCircleOutlineIcon className={classes.sentCheck} />
            </div>
            <div className={classes.flexCenter}>
              <Typography>
                {intl.formatMessage({
                  id: 'message.feedbackloginCreated'
                })}
              </Typography>
            </div>
          </DialogContent>
          <DialogActions className={classes.flexCenter}>
            <Button
              onClick={() => handleClose()}
              className={classes.buttons}
              variant="contained"
              color="secondary"
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

  if (feedbackSent) return feedbackSentDialog();

  return (
    <Fragment>
      <Dialog open={open} fullWidth maxWidth={'md'}>
        <DialogTitle disableTypography>
          <Typography variant="h6">
            {intl.formatMessage({
              id: 'feedbackcreatedialog.createfeedback'
            })}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.dialogContent}>
          <div className={classes.dialogContainer}>
            {!login ? (
              <FormControl
                className={`${classes.formControl} ${classes.input}`}
              >
                <InputLabel htmlFor="select-type">
                  {intl.formatMessage({
                    id: 'feedbackcreatedialog.type'
                  })}
                </InputLabel>
                <Select
                  input={<Input id="select-type" />}
                  className={classes.margin}
                  value={type}
                  onChange={handleChangeType}
                >
                  {feedbackTypes.map(type => (
                    <MenuItem key={type.name} value={type.name}>
                      <ListItemText primary={type.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography>
                {intl.formatMessage({
                  id: 'feedbackcreatedialog.logindescription'
                })}
              </Typography>
            )}
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
          {login && (
            <TextField
              value={email}
              error={invalidEmail}
              required
              className={`${classes.fullWidth} ${classes.margin}`}
              variant="outlined"
              label={intl.formatMessage({
                id: 'maintenance.email'
              })}
              type={'email'}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          )}
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
            onClick={login ? handleSendFromLogin : handleSend}
            className={classes.buttons}
            variant="contained"
            color="secondary"
            disabled={
              !subject.trim() || !message.trim() || (login && invalidEmail)
            }
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
