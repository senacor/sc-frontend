import React, { Component } from 'react';
import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import MeetingCreatorForm from './MeetingCreatorForm';
import Typography from '@material-ui/core/Typography/Typography';
import Grid from '@material-ui/core/Grid/Grid';
import PersonToggle from './PersonToggle';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import connect from 'react-redux/es/connect/connect';
import { getAppointments, getSelectedDate } from '../../reducers/selector';
import * as actions from '../../actions';
import ObjectGet from 'object-get';

class MeetingCreator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: '',
      supervisor: ''
    };
  }

  componentDidMount() {
    this.setEmployeeSupervisorReviewerData(this.props.prDetail);
  }

  setEmployeeSupervisorReviewerData = pr => {
    this.setState(() => {
      return {
        employee: Object.assign(
          {},
          {
            id: pr.employee.login,
            name:
              ObjectGet(pr, 'employee.firstName') +
              ' ' +
              ObjectGet(pr, 'employee.lastName'),
            role: 'Ich',
            show: true
          }
        )
      };
    });

    if (pr.supervisor !== undefined && pr.supervisor.id !== '') {
      this.setState(() => {
        return {
          supervisor: Object.assign(
            {},
            {
              id: pr.supervisor.login,
              name:
                ObjectGet(pr, 'supervisor.firstName') +
                ' ' +
                ObjectGet(pr, 'supervisor.lastName'),
              role: 'Vorgesetzter',
              show: true
            }
          )
        };
      });
    }

    if (
      pr.hasOwnProperty('reviewer') &&
      pr.reviewer !== undefined &&
      pr.reviewer.id !== ''
    ) {
      this.setState(() => {
        return {
          reviewer: Object.assign(
            {},
            {
              id: pr.reviewer.login,
              name:
                ObjectGet(pr, 'reviewer.firstName') +
                ' ' +
                ObjectGet(pr, 'reviewer.lastName'),
              role: 'Beurteiler',
              show: true
            }
          )
        };
      });
    }
  };

  fetchAppointments = date => {
    this.props.appointmentsSearch(
      Object.getOwnPropertyNames(this.state)
        .map(role => this.state[role].id)
        .join(),
      date
    );
  };

  onVisibilityChange = attendee => () => {
    this.setState({
      [attendee]: Object.assign({}, this.state[attendee], {
        show: !this.state[attendee].show
      })
    });
  };

  render() {
    const allAppointments = this.props.appointmentsSearchResults;
    return (
      <React.Fragment>
        <Typography gutterBottom variant="display1">
          Terminfindung
        </Typography>
        <Grid id={'tableRolePick'} container spacing={24} direction="column">
          <Grid item>
            <MeetingCreatorForm
              prById={this.props.prDetail}
              fetchAppointments={this.fetchAppointments}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column">
              {Object.getOwnPropertyNames(this.state).map(attendee => {
                return (
                  <Grid item key={attendee}>
                    <PersonToggle
                      displayName={`${this.state[attendee].id}`}
                      displayRole={`${this.state[attendee].role}`}
                      onChange={this.onVisibilityChange(attendee)}
                      showAttendee={this.state[attendee].show}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item>
            <TimeTable>
              {Object.getOwnPropertyNames(this.state)
                .filter(
                  key =>
                    this.state[key] &&
                    this.state[key].id &&
                    allAppointments[this.state[key].id]
                )
                .map((attendee, index, keyArray) => (
                  <Attendee
                    key={attendee}
                    show={this.state[attendee].show}
                    appointments={extractAppointments(
                      allAppointments[this.state[attendee].id].appointments
                    )}
                    selectedDate={this.props.selectedDate}
                    distanceFromLeft={(100 * index) / keyArray.length}
                  />
                ))}
            </TimeTable>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    appointmentsSearchResults: getAppointments(state),
    selectedDate: getSelectedDate(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch
  }
)(MeetingCreator);
