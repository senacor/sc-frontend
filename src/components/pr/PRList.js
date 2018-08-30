import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import EmployeeSearchDialog from '../employeeSearch/EmployeeSearchDialog';
import Translate from '../translate/Translate';
import { getAllPrs } from '../../reducers/selector';

const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },

  prs: {
    marginBottom: '20px',
    display: 'flex',
    width: '361px',
    [theme.breakpoints.up('md')]: {
      marginRight: '1.7%',
      marginLeft: '1.7%',
      width: '29.93%',
      maxWidth: '450px',
      minWidth: '350px'
    }
  },
  media: {
    minHeight: '100%',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: 130
    }
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit
  },
  mediaIcon: {
    paddingRight: theme.spacing.unit
  },
  button: {
    padding: '0px 0px'
  },
  content: {
    paddingLeft: '10px',
    paddingRight: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  description: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export class PRList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs,
      open: false
    };
  }

  addReviewer = prId => {
    this.handleClickOpen();
    this.setState({
      currentPr: prId
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  selectEmployee = employee => {
    this.handleClose();
    this.props.delegateReviewer(this.state.currentPr, employee.id);
  };

  render() {
    const { classes, prs } = this.props;
    return (
      <div>
        <Typography variant="display1" paragraph>
          Performance Reviews
        </Typography>

        <div className={classes.container}>
          {prs
            .filter(pr => pr.supervisor.login === this.props.username)
            .map(pr => {
              return (
                <Card className={classes.prs} key={pr.id}>
                  <CardMedia
                    className={classes.media}
                    image="/supervisor.jpg"
                    title="Supervisor picture"
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '60%'
                    }}
                  >
                    <CardContent className={classes.content}>
                      <Typography variant="display1">
                        {pr.employee.firstName}
                      </Typography>
                      <Typography variant="subheading" color="textSecondary">
                        Performance Review
                      </Typography>

                      {pr.deadline ? (
                        <Typography variant="subheading" color="textSecondary">
                          Deadline: {moment(pr.deadline).format('DD.MM.YY')}
                        </Typography>
                      ) : (
                        ''
                      )}

                      <div
                        className={classes.controls}
                        style={{
                          visibility: pr.reviewer ? 'visible' : 'hidden'
                        }}
                      >
                        <Icon className={classes.mediaIcon}>face</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          {pr.reviewer
                            ? pr.reviewer.firstName + ' ' + pr.reviewer.lastName
                            : pr.supervisor.firstName +
                              ' ' +
                              pr.supervisor.lastName}
                        </Typography>
                      </div>

                      <div className={classes.controls}>
                        <Icon className={classes.mediaIcon}>linear_scale</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          <Translate
                            content={
                              pr.statuses && pr.statuses.length > 0
                                ? pr.statuses[pr.statuses.length - 1]
                                : 'PREPARATION'
                            }
                          />
                        </Typography>
                      </div>
                      <div className={classes.controls}>
                        <Icon className={classes.mediaIcon}>event_note</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          Bogen ausfüllen
                        </Typography>
                      </div>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        color="primary"
                        className={classes.button}
                        onClick={() => {
                          this.addReviewer(pr.id);
                        }}
                      >
                        DELEGIEREN
                      </Button>

                      <Button
                        color="primary"
                        className={classes.button}
                        component={Link}
                        to={`/prs/${pr.id}`}
                      >
                        DETAILS
                      </Button>
                    </CardActions>
                  </div>
                </Card>
              );
            })}
        </div>
        <EmployeeSearchDialog
          open={this.state.open}
          handleClose={this.handleClose}
          selectEmployee={this.selectEmployee}
        />
      </div>
    );
  }
}
export const StyledComponent = withStyles(styles)(PRList);
export default connect(
  state => ({
    prs: getAllPrs(state),
    isLoading: state.isLoading,
    username: state.userinfo.userPrincipalName
  }),
  {
    fetchPrs: actions.fetchPrs,
    addPr: actions.addPr,
    delegateReviewer: actions.delegateReviewer
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
