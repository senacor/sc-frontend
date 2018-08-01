import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  textFieldDesktop: {}
});

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datetime: new Date()
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Hidden smDown>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              className={classes.textField}
              value={this.state.datetime}
              onChange={this.handleTimeChangeDesktop}
            />
          </MuiPickersUtilsProvider>
        </Hidden>
        <Hidden smUp>
          <form noValidate>
            <TextField
              id="datetime-local"
              label="Terminvorschlag"
              type="datetime-local"
              defaultValue="2018-06-14T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onChange={this.handleTimeChangeMobile}
            />
          </form>
        </Hidden>
      </div>
    );
  }

  handleTimeChangeMobile = event => {
    this.props.changeDate(moment(event.target.value).format('YYYY-MM-DD'));
  };

  handleTimeChangeDesktop = date => {
    this.props.changeDate(moment(date).format('YYYY-MM-DD'));
    this.setState({ datetime: date });
  };
}

export const StyledComponent = withStyles(styles)(DatePicker);
export default connect(
  null,
  { changeDate: actions.changeDate }
)(StyledComponent);
