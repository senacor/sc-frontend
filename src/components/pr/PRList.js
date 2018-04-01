import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';

const styles = () => ({
  prs: {
    marginBottom: '10px'
  },
  container: {
    width: '25%',
    height: '5%',
    marginLeft: '75%',
    marginBottom: '10px',
    border: '1px',
    textAlign: 'center'
  },

  content: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3c8cb'
  },
  button: {
    position: 'absolute',
    marginLeft: '6.5%'
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
          <Card className={classes.container}>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                variant="headline"
                component="h4"
                color="white"
              >
                Neuen PR beantragen
              </Typography>
              <CardActions>
                <Button
                  variant="fab"
                  mini
                  aria-label="add"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    this.handleClick();
                  }}
                >
                  {' '}
                  <AddIcon />
                </Button>
              </CardActions>
            </CardContent>
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
          <Card className={classes.container}>
            <CardContent className={classes.content}>
              <Typography
                gutterBottom
                variant="headline"
                component="h4"
                color="white"
              >
                Neuen PR beantragen
              </Typography>
              <CardActions>
                <Button
                  variant="fab"
                  mini
                  aria-label="add"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    this.handleClick();
                  }}
                >
                  {' '}
                  <AddIcon />
                </Button>
              </CardActions>
            </CardContent>
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
