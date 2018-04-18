import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Hidden from 'material-ui/Hidden';
import AddIcon from 'material-ui-icons/Add';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
const styles = theme => ({
  container: {
    display: 'flex',
    flexFlow: 'row wrap'
  },

  prs: {
    marginBottom: '20px',
    display: 'flex',
    width: '368px',
    [theme.breakpoints.up('md')]: {
      marginRight: '30px',
      width: '410px'
    },
    maxHeight: 220
  },
  buttonMobile: {
    position: 'fixed',
    left: '80%',
    bottom: '10%'
  },
  icon: {
    position: 'fixed',
    left: '84%',
    bottom: '13%'
  },
  buttonDesktop: {
    position: 'relative',
    marginRight: '1%',
    marginLeft: '80%'
  },
  media: {
    height: 220,
    width: 150,
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

  translate = occasion => {
    switch (occasion) {
      case 'ON_DEMAND':
        return 'Auf Nachfrage';
      case 'YEARLY':
        return 'jährlich';
      case 'QUARTERLY':
        return 'vierteljährlich';
      case 'END_PROBATION':
        return 'Ende der Probezeit';
      default:
        return 'Auf Nachfrage';
    }
  };

  handleClick = () => {
    let tempArray = [];

    for (let i = 0; i < this.state.prs.length; i++) {
      tempArray[i] = this.state.prs[i];
    }

    this.setState({
      prs: tempArray
    });
    this.props.addPr();
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
        <Hidden smDown>
          <Button
            className={classes.buttonDesktop}
            color="primary"
            onClick={this.handleClick}
          >
            PR beantragen
            <Icon className={classes.rightIcon}>add</Icon>
          </Button>
        </Hidden>
        <Hidden mdUp>
          <Button
            variant="fab"
            color="primary"
            aria-label="add"
            className={classes.buttonMobile}
            onClick={this.handleClick}
          >
            <AddIcon className={classes.icon} />
          </Button>
        </Hidden>
        <div className={classes.container}>
          {prs.filter(pr => pr.supervisor === 'fukara').map(pr => {
            return (
              <div>
                <div key={pr.id}>
                  <Card className={classes.prs}>
                    <CardMedia
                      className={classes.media}
                      image="/supervisor.jpg"
                      title="Supervisor picture"
                    />
                    <CardContent className={classes.content}>
                      <Typography variant="display1">{pr.employee}</Typography>
                      <Typography variant="subheading" color="textSecondary">
                        Performance Review
                      </Typography>
                      <Typography variant="subheading" color="textSecondary">
                        {pr.deadline}
                      </Typography>
                      <div className={classes.controls}>
                        <Icon className={classes.mediaIcon}>linear_scale</Icon>
                        <Typography gutterBottom noWrap color="textSecondary">
                          {this.translateStatus(pr.status)}
                        </Typography>
                        {pr.delegateSupervisor === undefined ? (
                          ''
                        ) : (
                          <div
                            className={classes.additionalSupervisor}
                            style={{ display: 'flex' }}
                          >
                            <Icon className={classes.mediaIcon}>face</Icon>
                            <Typography
                              gutterBottom
                              noWrap
                              color="textSecondary"
                            >
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
                </div>
              </div>
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
