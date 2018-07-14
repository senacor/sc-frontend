import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

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
      selectedDay: '2018-06-14'
    };
  }

  handleTimeChange = event => {
    this.setState(
      {
        selectedDay: moment(event.target.value).format('YYYY-MM-DD')
      },
      () => {
        this.props.onChange(this.state.selectedDay);
      }
    );
  };

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
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired
};
DatePicker.defaultProps = {};

export default withStyles(styles)(DatePicker);
