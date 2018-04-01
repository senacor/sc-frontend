import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card, { CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions/index';

const styles = () => ({
  card: {
    maxWidth: '100%',
    backgroundColor: '#004953',
    indicatorColor: '#FFF',
    textColor: '#FFF'
  },

  avatar: {},
  flexGrow: {
    flex: '1 1 auto'
  }
});

class Pr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prs: props.prs,
      taskById: props.taskById,
      value: 0
    };
  }

  clickOnStatus = () => {
    return (
      <Card>
        <Typography>status</Typography>
      </Card>
    );
  };

  clickOnAnstellung = () => {
    console.log('anstellung');
  };

  clickOnGehalt = () => {
    console.log('gehalt');
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper
        style={{
          width: '80%',

          backgroundColor: '#004953',
          position: 'center'
        }}
      >
        <div>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  aria-label="Employee"
                  className={classes.avatar}
                  src="/supervisor.jpg"
                />
              }
              title={`Performance Review for ${this.props.taskById.username}`}
              subheader={`Deadline ${this.props.taskById.deadline}`}
            />
          </Card>
        </div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="#FFF"
          textColor="#FFF"
        >
          <Tab
            label="STATUS"
            onClick={() => {
              this.clickOnStatus();
            }}
          />
          <Tab
            label="ANSTELLUNG"
            onClick={() => {
              this.clickOnAnstellung();
            }}
          />
          <Tab
            label="GEHALT"
            onClick={() => {
              this.clickOnGehalt();
            }}
          />
        </Tabs>
      </Paper>
    );
  }
}

export default connect(
  state => ({
    taskById: state.taskById.returnTask,
    hasError: state.error.addError,
    isLoading: state.taskById.getTask
  }),
  {
    fetchTasksById: actions.fetchTasksById
  }
)(withLoading(props => props.fetchTasksById())(withStyles(styles)(Pr)));
