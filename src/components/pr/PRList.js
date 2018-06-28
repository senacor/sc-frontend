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
      maxWidth: '450px'
    }
  },
  media: {
    height: '100%',
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

  translateStatus = status => {
    switch (status) {
      case 'PREPARATION':
        return 'In Vorbereitung';
      case 'EXECUTION':
        return 'In Durchführung';
      case 'POST_PROCESSING':
        return 'Nachbearbeitung';
      case 'DONE':
        return 'Fertig';
      default:
        return 'In Vorbereitung';
    }
  };

  addNewSupervisor = prId => {
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
    this.props.addSupervisor(this.state.currentPr, employee);
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
            .filter(
              pr =>
                pr.supervisor ===
                this.props.username.replace('@polaris.senacor.com', '')
            )
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
                          visibility: pr.delegatedSupervisor
                            ? 'visible'
                            : 'hidden'
                        }}
                      >
                        <Icon className={classes.mediaIcon}>face</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          {pr.delegatedSupervisor}
                        </Typography>
                      </div>

                      <div className={classes.controls}>
                        <Icon className={classes.mediaIcon}>linear_scale</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          {this.translateStatus(pr.status)}
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
                          this.addNewSupervisor(pr.id);
                        }}
                      >
                        DELEGIEREN
                      </Button>

                      <Button color="primary" className={classes.button}>
                        <Link
                          to={`/prs/${pr.id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          DETAILS
                        </Link>
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
    prs: state.prs.prsList,
    isLoading: state.isLoading,
    username: state.userinfo.userPrincipalName
  }),
  {
    fetchPrs: actions.fetchPrs,
    addPr: actions.addPr,
    addSupervisor: actions.addSupervisor
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
