import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Card, { CardActions, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
  prs: {
    marginBottom: '10px'
  },
  button: {
    marginLeft: 'auto'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  addCard: {
    width: '19%',
    height: '5%',
    marginLeft: '81%',
    marginBottom: '10px',
    border: '1px',
    textAlign: 'center'
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
    this.props.fetchPrs();
  };

  render() {
    const { classes, prs, hasError } = this.props;
    if (prs.length === 0) {
      return (
        <div>
          <Card className={classes.addCard}>
            <CardActions>
              <Button
                className={classes.button}
                color="primary"
                onClick={() => {
                  this.handleClick();
                }}
              >
                <Hidden smDown> Neuen PR beantragen</Hidden>
                <Icon className={classes.rightIcon}>add</Icon>
              </Button>
            </CardActions>
          </Card>
          <Card style={{ display: hasError ? 'none' : 'block' }}>
            <CardHeader
              avatar={<Avatar src="/warning.png" className={classes.avatar} />}
              title="No PRs available"
            />
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="display1" paragraph>
            Performance Review Liste
          </Typography>

          <Card className={classes.addCard}>
            <CardActions>
              <Button
                className={classes.button}
                color="primary"
                onClick={() => {
                  this.handleClick();
                }}
              >
                <Hidden smDown> Neuen PR beantragen</Hidden>
                <Icon className={classes.rightIcon}>add</Icon>
              </Button>
            </CardActions>
          </Card>

          {prs.map(pr => {
            return (
              <div key={pr.id}>
                <Card className={classes.prs}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src="/supervisor.jpg"
                        className={classes.avatar}
                      />
                    }
                    title={`Grund der PR: ${this.translate(pr.occasion)}`}
                    subheader={`supervisor: ${pr.supervisor}`}
                  />
                </Card>
                <Divider inset />
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    prs: state.prs.prsList,
    isLoading: state.prs.isLoading,
    hasError: state.error.addError,
    addingPrs: state.prs.addingPrs
  }),
  {
    fetchPrs: actions.fetchPrs,
    addPr: actions.addPr
  }
)(withLoading(props => props.fetchPrs())(withStyles(styles)(PRList)));
