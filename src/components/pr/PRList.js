import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import withLoading from '../hoc/Loading';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Card, { CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';

const styles = () => ({
  prs: {
    marginBottom: '10px'
  },
  button: {
    anchor: 'right'
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
        <Card style={{ display: hasError ? 'none' : 'block' }}>
          <CardHeader
            avatar={<Avatar src="/warning.png" className={classes.avatar} />}
            title="No PRs available"
          />
        </Card>
      );
    } else {
      return (
        <div>
          <Typography variant="display1" paragraph>
            Performance Review Liste
          </Typography>
          <Paper style={{ width: 500, position: 'right', align: 'right' }}>
            <Button
              variant="fab"
              mini
              color="primary"
              aria-label="add"
              className={classes.button}
              onClick={() => {
                this.handleClick();
              }}
            >
              {' '}
              <AddIcon />
            </Button>
          </Paper>
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
