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

const styles = theme => ({
  prs: {
    marginBottom: '10px',
    display: 'flex'
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
    width: 170
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit
  },
  mediaIcon: {
    paddingRight: 2 * theme.spacing.unit
  },
  controlButtons: {
    margin: theme.spacing.unit,
    paddingLeft: 15 * theme.spacing.unit
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
        {prs.filter(pr => pr.supervisor === 'fukara').map(pr => {
          return (
            <div key={pr.id}>
              <Link to={`/prs/${pr.id}`} style={{ textDecoration: 'none' }}>
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
                    </Typography>{' '}
                    <div className={classes.controls}>
                      <Icon className={classes.mediaIcon}>linear_scale</Icon>{' '}
                      <Typography gutterBottom noWrap color="textSecondary">
                        {this.translateStatus(pr.status)}
                      </Typography>
                    </div>
                    <div className={classes.controls}>
                      <Icon className={classes.mediaIcon}>event_note</Icon>{' '}
                      <Typography gutterBottom noWrap color="textSecondary">
                        Bogen ausfüllen
                      </Typography>
                    </div>
                    <div className={classes.controlButtons}>
                      <Button color="primary" className={classes.button}>
                        DELEGIEREN
                      </Button>

                      <Button color="primary" className={classes.button}>
                        DETAILS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          );
        })}
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
    addPr: actions.addPr
  }
)(withLoading(props => props.fetchPrs())(StyledComponent));
