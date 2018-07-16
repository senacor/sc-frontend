import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: '2018-06-14'
    };
  }

  render() {
    const { classes } = this.props;

    return (
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
          onChange={this.handleTimeChange}
        />
      </form>
    );
  }

  handleTimeChange = event => {
    this.props.changeDate(moment(event.target.value).format('YYYY-MM-DD'));
  };
}

export const StyledComponent = withStyles(styles)(DatePicker);
export default connect(
  state => ({}),
  { changeDate: actions.changeDate }
)(StyledComponent);
