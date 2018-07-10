import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Switch from '@material-ui/core/Switch';

const marginLeft = 50;
const timeTableListHeight = 40;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  datePicker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  appointmentDiv: {
    borderRadius: 10,
    background: '#4d8087',
    height: timeTableListHeight,
    position: 'absolute'
  },
  timeTable: {
    height: timeTableListHeight
  },
  divider: {
    position: 'relative',
    top: -20,
    left: marginLeft,
    height: 1,
    margin: 0,
    border: 'none',
    flexShrink: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  },
  hours: {
    position: 'relative',
    top: -10
  }
});

class AvailabilityView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHeight: 0,
      tableWidth: 0,
      employee: true,
      reviewer: false,
      supervisor: true
    };
  }

  componentDidMount() {
    const tableHeight = this.divElement.clientHeight;
    this.setState({ tableHeight });
    console.log('height :', tableHeight);
    const tableWidth = this.divElement.clientWidth;
    this.setState({ tableWidth });
    console.log('width :', tableWidth);
  }

  appointment(json, employeeId) {
    let i;
    for (i = 0; i < 3; i++) {
      if (
        json._embedded.exchangeOutlookResponseList[i].employeeId === employeeId.toString()
      ) {
        let j;
        let responseList = json._embedded.exchangeOutlookResponseList[i];
        for (j = 0; j < Object.keys(responseList.exchangeOutlookAppointmentResponse).length; j++) {
          console.log(
            responseList.exchangeOutlookAppointmentResponse[j]
              .appointmentStartTime
          );
        }
        return;
      }
    }
  }

  handleToggle = name => event => {
    this.setState({ [name]: event.target.checked });
    let jsonFile = require('./test.json');
    if (name === 'employee') {
      this.appointment(jsonFile, 1);
    } else if (name === 'reviewer') {
      this.appointment(jsonFile, 2);
    } else if (name === 'supervisor') {
      this.appointment(jsonFile, 3);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div id={'outer'} className={classes.root}>
        <Typography variant="headline">Terminfindung</Typography>
        <Grid id={'tableRolePick'} container spacing={24}>
          <Grid item xs={12} lg={3} sm={6}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subheading">Mitarbeiter</Typography>
                  </TableCell>
                  <TableCell numeric>
                    <Switch
                      checked={this.state.employee}
                      onChange={this.handleToggle('employee')}
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
                      checked={this.state.reviewer}
                      onChange={this.handleToggle('reviewer')}
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
                      checked={this.state.supervisor}
                      onChange={this.handleToggle('supervisor')}
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={12} lg={9} sm={6}>
            <form noValidate>
              <TextField
                id="datetime-local"
                label="Terminvorschlag"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.datePicker}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Grid>
        </Grid>
        <div
          ref={divElement => (this.divElement = divElement)}
          style={{ position: 'relative', top: 50, maxWidth: 650 }}
        >
          <div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>8:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>8:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>9:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>9:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>10:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>10:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>11:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>11:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>12:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>12:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>13:00</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
            <div className={classes.timeTable}>
              <Typography className={classes.hours}>13:30</Typography>
              <hr
                className={classes.divider}
                style={{ maxWidth: this.state.tableWidth - marginLeft }}
              />
            </div>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0 }}>
            <div
              id={'availabilityEmployee'}
              className={classes.appointmentDiv}
              style={{
                left: (this.state.tableWidth / 6) * 0.5 + marginLeft,
                top: 0,
                width: (this.state.tableWidth - marginLeft) / 6
              }}
            />
            <div
              id={'availabilityReviewer'}
              className={classes.appointmentDiv}
              style={{
                left:
                  ((this.state.tableWidth - marginLeft) / 6) * 2.5 + marginLeft,
                top: (0.5 * this.state.tableHeight) / 6,
                width: (this.state.tableWidth - marginLeft) / 6
              }}
            />
            <div
              id={'availabilitySupervisor'}
              className={classes.appointmentDiv}
              style={{
                left:
                  ((this.state.tableWidth - marginLeft) / 6) * 4.5 + marginLeft,
                top: (1 * this.state.tableHeight) / 6,
                width: (this.state.tableWidth - marginLeft) / 6
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

AvailabilityView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AvailabilityView);
