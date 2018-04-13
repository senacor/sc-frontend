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

const styles = () => ({
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
    height: 200,
    width: 130
  }
});

export class PRList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs
    };
  }
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
                    <Typography variant="headline">{pr.employee}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                      Performance Review
                    </Typography>
                    <Typography variant="subheading" color="textSecondary">
                      {pr.deadline}
                    </Typography>

                    <Typography variant="subheading" color="textSecondary">
                      {`In ${pr.status}`}{' '}
                    </Typography>
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
