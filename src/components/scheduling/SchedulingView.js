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
      employee: '',
      supervisor: ''
    };
  }

  componentDidMount() {
    this.props.fetchPrById(this.props.match.params.id).then(() => {
      this.setEmployeeSupervisorReviewerData();
      this.props.fetchMeeting(this.props.prDetail);
      this.fetchAppointments(
        moment()
          .local()
          .format('YYYY-MM-DD')
      );
    });
  }

  setEmployeeSupervisorReviewerData = () => {
    this.setState(prevState => {
      return {
        employee: Object.assign({}, prevState.employee, {
          id: this.props.prDetail.employee.login,
          name:
            ObjectGet(this.props, 'prDetail.employee.firstName') +
            ' ' +
            ObjectGet(this.props, 'prDetail.employee.lastName'),
          role: 'Ich',
          show: true
        })
      };
    });

    if (
      this.props.prDetail.supervisor !== undefined &&
      this.props.prDetail.supervisor.id !== ''
    ) {
      this.setState(prevState => {
        return {
          supervisor: Object.assign({}, prevState.supervisor, {
            id: this.props.prDetail.supervisor.login,
            name:
              ObjectGet(this.props, 'prDetail.supervisor.firstName') +
              ' ' +
              ObjectGet(this.props, 'prDetail.supervisor.lastName'),
            role: 'Vorgesetzter',
            show: true
          })
        };
      });
    }

    if (
      this.props.prDetail.reviewer !== undefined &&
      this.props.prDetail.reviewer.id !== ''
    ) {
      this.setState(prevState => {
        return {
          prevState: Object.assign({}, prevState, {
            reviewer: {
              id: this.props.prDetail.reviewer.login,
              name:
                ObjectGet(this.props, 'prDetail.reviewer.firstName') +
                ' ' +
                ObjectGet(this.props, 'prDetail.reviewer.lastName'),
              role: 'Beurteiler',
              show: true
            }
          })
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
    fetchMeeting: actions.fetchMeeting,
    fetchPrById: actions.fetchPrById
  }
)(SchedulingView);
