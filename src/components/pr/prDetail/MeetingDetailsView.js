import React from 'react';
import { withStyles } from '@material-ui/core/styles/index';
import moment from 'moment-timezone';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

import { translateContent } from '../../translate/Translate';
import Typography from '@material-ui/core/Typography/Typography';
import PrStatusActionButton from './PrStatusActionButton';
import MeetingDetailVisibilityService from '../../../service/MeetingDetailVisibilityService';
import { formatDateForFrontend } from '../../../helper/date';

const styles = theme => ({
  container: {
    '& > *': {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    }
  },
  attendeeList: {
    '& ListItemText span': {
      fontSize: '0.875rem'
    }
  },
  nested: {
    paddingLeft: theme.spacing.unit * 8
  },
  meetingView: {
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  buttonPosition: {
    marginTop: '3.5%',
    position: 'relative',
    backgroundColor: theme.palette.primary['400'],
    color: '#FFF',
    marginBottom: '1.5%',
    marginLeft: '3%'
  },
  info: {
    marginTop: '4%',
    marginBottom: '4%'
  }
});

class MeetingDetailsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openRequiredAttendees: true,
      openOptionalAttendees: true
    };
  }

  handleClickOpenRequiredAttendees = () => {
    this.setState(state => ({
      openRequiredAttendees: !state.openRequiredAttendees
    }));
  };

  handleClickOpenOptionalAttendees = () => {
    this.setState(state => ({
      openOptionalAttendees: !state.openOptionalAttendees
    }));
  };

  findDisplayState = employee => {
    return translateContent(employee.status);
  };

  informationTypography = (classes, visibilityService) => {
    return (
      <div>
        <Typography gutterBottom variant="h4">
          Termindetails
        </Typography>
        {visibilityService.getAccept() ? (
          <Typography variant={'body2'} className={classes.info}>
            Bitte den Termin zeitnah im Kalender bestätigen.
          </Typography>
        ) : null}
        {visibilityService.getMeetingDeclined() ? (
          <Typography variant={'body2'} className={classes.info}>
            Termin wurde abgesagt, bitte neuen Termin vereinbaren.
          </Typography>
        ) : null}
        {visibilityService.getEvaluationExternal() ? (
          <Typography variant={'body2'} className={classes.info}>
            Termin wurde außerhalb des Portals vereinbart.
          </Typography>
        ) : null}
        {visibilityService.getHrInfoNotAccepted() ? (
          <Typography variant={'body2'} className={classes.info}>
            Termin muss noch bestätigt werden.
          </Typography>
        ) : null}
        {visibilityService.getHrInfoNotSent() ? (
          <Typography variant={'body2'} className={classes.info}>
            Termin muss noch vereinbart werden.
          </Typography>
        ) : null}
      </div>
    );
  };

  meetingInformationExternal = (classes, pr) => {
    return (
      <div>
        <List>
          <ListItem id={'date'}>
            <ListItemIcon>
              <TodayIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={formatDateForFrontend(pr.meetingDay)} />
          </ListItem>
        </List>
      </div>
    );
  };

  meetingInformation = (meeting, state, classes) => {
    return (
      <div>
        <List>
          <ListItem id={'date'}>
            <ListItemIcon>
              <TodayIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={moment(meeting.start)
                .local()
                .format('DD.MM.YYYY')}
            />
          </ListItem>
          <ListItem id={'startAndEndTime'}>
            <ListItemIcon>
              <ScheduleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={`${moment(meeting.start)
                .local()
                .format('HH:mm')} - ${moment(meeting.end)
                .local()
                .format('HH:mm')}`}
            />
          </ListItem>
          <ListItem id={'location'}>
            <ListItemIcon>
              <LocationOnIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={
                meeting.location !== null
                  ? meeting.location
                  : 'Kein Ort angegeben'
              }
            />
          </ListItem>
          <ListItem button onClick={this.handleClickOpenRequiredAttendees}>
            <ListItemIcon>
              <PeopleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={'Benötigte Teilnehmer'} />
            {state.openRequiredAttendees ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse
            in={state.openRequiredAttendees}
            timeout="auto"
            unmountOnExit
          >
            <List id="requiredAttendees" component="div" disablePadding dense>
              {Object.keys(meeting.requiredAttendees).map(employee => {
                return (
                  <ListItem
                    key={meeting.requiredAttendees[employee].email}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      primary={`${meeting.requiredAttendees[employee].name} <${
                        meeting.requiredAttendees[employee].email
                      }>`}
                      secondary={
                        'Status: ' +
                        this.findDisplayState(
                          meeting.requiredAttendees[employee]
                        )
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          {Object.keys(meeting.optionalAttendees).length > 0 && (
            <React.Fragment>
              <ListItem button onClick={this.handleClickOpenOptionalAttendees}>
                <ListItemIcon>
                  <PeopleIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'Optionale Teilnehmer'} />
                {state.openOptionalAttendees ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={state.openOptionalAttendees}
                timeout="auto"
                unmountOnExit
              >
                <List
                  id="optionalAttendees"
                  component="div"
                  disablePadding
                  dense
                >
                  {Object.keys(meeting.optionalAttendees).map(employee => {
                    return (
                      <ListItem
                        key={meeting.optionalAttendees[employee].email}
                        className={classes.nested}
                      >
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText
                          inset
                          primary={`${
                            meeting.optionalAttendees[employee].name
                          } <${meeting.optionalAttendees[employee].email}>`}
                          secondary={
                            'Status: ' +
                            this.findDisplayState(
                              meeting.optionalAttendees[employee]
                            )
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          )}
        </List>
      </div>
    );
  };

  render() {
    const { classes, meeting, pr, userroles, userinfo, click } = this.props;
    let visibilityService = new MeetingDetailVisibilityService();
    visibilityService.setMeeting(meeting);
    visibilityService.setPr(pr);
    visibilityService.setUserinfo(userinfo);
    visibilityService.setUserroles(userroles);

    return (
      <div className={classes.meetingView}>
        {this.informationTypography(classes, visibilityService, click)}
        {visibilityService.getEvaluationExternal()
          ? this.meetingInformationExternal(classes, pr)
          : null}
        {visibilityService.getMeetingExists() &&
        !visibilityService.getEvaluationExternal()
          ? this.meetingInformation(meeting, this.state, classes)
          : null}
        {visibilityService.getAction() ? (
          <PrStatusActionButton
            label={'neuen Termin erstellen'}
            releaseButtonClick={this.props.handleChange}
            inputClass={classes.buttonPosition}
          />
        ) : null}
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(MeetingDetailsView);
