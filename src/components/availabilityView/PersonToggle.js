import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';

class PersonToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showReviewer: props.showReviewer,
      showSupervisor: props.showSupervisor,
      showEmployee: props.showEmployee
    };
  }

  handleToggle = showPerson => {
    this.setState(
      previousState => {
        return { [showPerson]: !previousState[showPerson] };
      },
      () => {
        this.props.onChange(this.state);
      }
    );
  };

  render() {
    return (
      <Grid item xs={12} lg={3} sm={6}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="subheading">Mitarbeiter</Typography>
              </TableCell>
              <TableCell numeric>
                <Switch
                  checked={this.state.showEmployee}
                  onChange={() => {
                    //does not run function immediately, just makes reference. Function is executed on click, not on reder
                    this.handleToggle('showEmployee');
                  }}
                  color="primary"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subheading">Bewerter</Typography>
              </TableCell>
              <TableCell numeric>
                <Switch
                  checked={this.state.showReviewer}
                  onChange={() => {
                    this.handleToggle('showReviewer');
                  }}
                  color="primary"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="subheading">Vorgesetzter</Typography>
              </TableCell>
              <TableCell numeric>
                <Switch
                  checked={this.state.showSupervisor}
                  onChange={() => {
                    this.handleToggle('showSupervisor');
                  }}
                  color="primary"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    );
  }
}

PersonToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  showReviewer: PropTypes.bool,
  showEmployee: PropTypes.bool,
  showSupervisor: PropTypes.bool
};
PersonToggle.defaultProps = {
  showReviewer: false,
  showEmployee: false,
  showSupervisor: false
};
export default PersonToggle;
