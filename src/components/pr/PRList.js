import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import moment from 'moment';

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

  additionalSupervisor: {
    paddingLeft: theme.spacing.unit,
    display: 'none'
  },
  content: {
    paddingLeft: '10px',
    paddingRight: '10px'
  }
});

export class PRList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs
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
    this.props.addSupervisor(prId);
  };

  render() {
    const { classes, prs } = this.props;
    return (
      <div>
        <Typography variant="display1" paragraph>
          Performance Reviews
        </Typography>

        <div className={classes.container}>
          {prs.filter(pr => pr.supervisor === 'ttran').map(pr => {
            return (
              <Card className={classes.prs} key={pr.id}>
                <CardMedia
                  className={classes.media}
                  image="/supervisor.jpg"
                  title="Supervisor picture"
                />
                <CardContent className={classes.content}>
                  <Typography variant="display1">
                    {pr.employee.firstName}
                  </Typography>
                  <Typography variant="subheading" color="textSecondary">
                    Performance Review
                  </Typography>
                  <Typography variant="subheading" color="textSecondary">
                    Deadline: {moment(pr.deadline).format('DD.MM.YY')}
                  </Typography>
                  <div className={classes.controls}>
                    <Icon className={classes.mediaIcon}>linear_scale</Icon>
                    <Typography gutterBottom noWrap color="textSecondary">
                      {this.translateStatus(pr.status)}
                    </Typography>
                    {!pr.delegatedSupervisor ? (
                      ''
                    ) : (
                      <div
                        className={classes.additionalSupervisor}
                        style={{ display: 'flex' }}
                      >
                        <Icon className={classes.mediaIcon}>face</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          dummy
                        </Typography>
                      </div>
                    )}
                  </div>
                  <div className={classes.controls}>
                    <Icon className={classes.mediaIcon}>event_note</Icon>
                    <Typography gutterBottom noWrap color="textSecondary">
                      Bogen ausfüllen
                    </Typography>
                  </div>
                  <Divider />

                  <div className={classes.controlButtons}>
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
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(PRList);
export default connect(
  state => ({
    prs: state.prs.prsList,
    isLoading: state.isLoading
  }),
  {
    fetchPrs: actions.fetchPrs,
    addPr: actions.addPr,
    addSupervisor: actions.addSupervisor
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
