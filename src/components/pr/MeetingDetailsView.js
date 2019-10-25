import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
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

import Typography from '@material-ui/core/Typography/Typography';
import PrStatusActionButton from './PrStatusActionButton';
import MeetingDetailVisibilityService from '../../service/MeetingDetailVisibilityService';
import { formatDateForFrontend } from '../../helper/date';
import { injectIntl } from 'react-intl';
import { MeetingContext } from '../App';
import { useUserinfoContext } from '../../helper/contextHooks';

const styles = theme => ({
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
    color: theme.palette.secondary.white,
    marginBottom: '1.5%',
    marginLeft: '3%'
  },
  info: {
    marginTop: '4%',
    marginBottom: '4%'
  }
});

const MeetingDetailsView = ({ classes, pr, click, handleChange, intl }) => {
  const { value: meeting } = useContext(MeetingContext.context);
  const user = useUserinfoContext();
  const [openRequiredAttendees, setOpenRequiredAttendees] = useState(true);
  const [openOptionalAttendees, setOpenOptionalAttendees] = useState(true);

  let visibilityService = new MeetingDetailVisibilityService();
  visibilityService.setMeeting(meeting);
  visibilityService.setPr(pr);
  visibilityService.setUser(user);

  const handleClickOpenRequiredAttendees = () => {
    setOpenRequiredAttendees(!openRequiredAttendees);
  };

  const handleClickOpenOptionalAttendees = () => {
    setOpenOptionalAttendees(!openOptionalAttendees);
  };

  const findDisplayState = employee => {
    return intl.formatMessage({
      id: `${employee.status}`
    });
  };

  const informationTypography = (classes, visibilityService) => {
    return (
      <div>
        <Typography gutterBottom variant="h4">
          {intl.formatMessage({
            id: 'meetingdetailsview.termindetails'
          })}
        </Typography>
        {visibilityService.getAccept() ? (
          <Typography variant={'body2'} className={classes.info}>
            {intl.formatMessage({
              id: 'meetingdetailsview.confirmation'
            })}
          </Typography>
        ) : null}
        {visibilityService.getMeetingDeclined() ? (
          <Typography variant={'body2'} className={classes.info}>
            {intl.formatMessage({
              id: 'meetingdetailsview.cancelled'
            })}
          </Typography>
        ) : null}
        {visibilityService.getEvaluationExternal() ? (
          <Typography variant={'body2'} className={classes.info}>
            {intl.formatMessage({
              id: 'meetingdetailsview.arrangedoffportal'
            })}
          </Typography>
        ) : null}
        {visibilityService.getHrInfoNotAccepted() ? (
          <Typography variant={'body2'} className={classes.info}>
            {intl.formatMessage({
              id: 'meetingdetailsview.confirmationneeded'
            })}
          </Typography>
        ) : null}
        {visibilityService.getHrInfoNotSent() ? (
          <Typography variant={'body2'} className={classes.info}>
            {intl.formatMessage({
              id: 'meetingdetailsview.arrangemendneeded'
            })}
          </Typography>
        ) : null}
      </div>
    );
  };

  const meetingInformationExternal = (classes, pr) => {
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

  const meetingInformation = (
    meeting,
    openRequiredAttendees,
    openOptionalAttendees,
    classes
  ) => {
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
                  : intl.formatMessage({
                      id: 'meetingdetailsview.noplace'
                    })
              }
            />
          </ListItem>
          <ListItem button onClick={handleClickOpenRequiredAttendees}>
            <ListItemIcon>
              <PeopleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={intl.formatMessage({
                id: 'meetingdetailsview.memberneeded'
              })}
            />
            {openRequiredAttendees ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openRequiredAttendees} timeout="auto" unmountOnExit>
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
                      secondary={`${intl.formatMessage({
                        id: 'meetingdetailsview.status'
                      })} ${findDisplayState(
                        meeting.requiredAttendees[employee]
                      )}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
          {Object.keys(meeting.optionalAttendees).length > 0 && (
            <React.Fragment>
              <ListItem button onClick={handleClickOpenOptionalAttendees}>
                <ListItemIcon>
                  <PeopleIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={intl.formatMessage({
                    id: 'meetingdetailsview.optionalmember'
                  })}
                />
                {openOptionalAttendees ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={openOptionalAttendees} timeout="auto" unmountOnExit>
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
                          secondary={`${intl.formatMessage({
                            id: 'meetingdetailsview.status'
                          })} ${findDisplayState(
                            meeting.optionalAttendees[employee]
                          )}`}
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

  return (
    <div className={classes.meetingView}>
      {informationTypography(classes, visibilityService, click)}
      {visibilityService.getEvaluationExternal()
        ? meetingInformationExternal(classes, pr)
        : null}
      {visibilityService.getMeetingExists() &&
      !visibilityService.getEvaluationExternal()
        ? meetingInformation(
            meeting,
            openRequiredAttendees,
            openOptionalAttendees,
            classes
          )
        : null}
      <PrStatusActionButton
        label={intl.formatMessage({
          id: 'meetingdetailsview.newtermin'
        })}
        releaseButtonClick={handleChange}
        inputClass={classes.buttonPosition}
      />
    </div>
  );
};

export default injectIntl(withStyles(styles)(MeetingDetailsView));
