import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getAppointments,
  getPrDetail,
  getSelectedDate,
  getMeeting
} from '../../reducers/selector';
import PersonToggle from './PersonToggle';
import TimeTable from './AppointmentTable/TimeTable';
import Attendee from './AppointmentTable/Attendee';
import { extractAppointments } from './AppointmentTable/AppointmentUtilities';
import ObjectGet from 'object-get';
import MeetingDetailsView from './MeetingDetailsView';
import MeetingCreatorForm from './MeetingCreatorForm';

export class SchedulingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewer: ''
    };

    this.state = {
      employee: {
        id: props.prDetail.employee.login,
        name:
          ObjectGet(props, 'prDetail.employee.firstName') +
          ' ' +
          ObjectGet(props, 'prDetail.employee.lastName'),
        role: 'Ich',
        show: false
      }
    };
    if (
      props.prDetail.reviewer !== undefined &&
      props.prDetail.reviewer.id !== ''
    ) {
      this.state.reviewer = {
        id: props.prDetail.reviewer.login,
        name:
          ObjectGet(props, 'prDetail.reviewer.firstName') +
          ' ' +
          ObjectGet(props, 'prDetail.reviewer.lastName'),
        role: 'Beurteiler',
        show: false
      };
    }
    if (
      props.prDetail.supervisor !== undefined &&
      props.prDetail.supervisor.id !== ''
    ) {
      this.state.supervisor = {
        id: props.prDetail.supervisor.login,
        name:
          ObjectGet(props, 'prDetail.supervisor.firstName') +
          ' ' +
          ObjectGet(props, 'prDetail.supervisor.lastName'),
        role: 'Vorgesetzter',
        show: false
      };
    }
  }

  render() {
    const allAppointments = this.props.appointmentsSearchResults;
    const { meeting } = this.props;
    return (
      <div id={'outer'}>
        {meeting == null ? (
          <React.Fragment>
            <Typography gutterBottom variant="display1">
              Terminfindung
            </Typography>
            <Grid
              id={'tableRolePick'}
              container
              spacing={24}
              direction="column"
            >
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
        ) : (
          <MeetingDetailsView />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchMeeting(this.props.prDetail);
    this.fetchAppointments(
      moment()
        .local()
        .format('YYYY-MM-DD')
    );
  }

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
}

export default connect(
  state => ({
    appointmentsSearchResults: getAppointments(state),
    prDetail: getPrDetail()(state),
    selectedDate: getSelectedDate(state),
    meeting: getMeeting(state)
  }),
  {
    appointmentsSearch: actions.appointmentsSearch,
    fetchMeeting: actions.fetchMeeting
  }
)(SchedulingView);
