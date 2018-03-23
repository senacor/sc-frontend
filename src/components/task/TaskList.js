import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import withLoading from '../hoc/Loading';
import Deadline from './Deadline';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  button: {
    marginLeft: 'auto'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  task: {
    marginBottom: '10px'
  }
});

export class TaskList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      tasks: props.tasks
    };
  }

  handleClick = task => {
    task.status = 'DONE';
    let tempArray = [];

    for (let i = 0; i < this.state.tasks.length; i++) {
      tempArray[i] = this.state.tasks[i];
    }

    this.setState({
      tasks: tempArray
    });

    this.props.changeTask(task);
  };

  render() {
    const { classes, tasks } = this.props;

    if (tasks.length === 0) {
      return (
        <div>
          {' '}
          <Card>
            <CardHeader
              avatar={<Avatar src="/warning.png" className={classes.avatar} />}
              title="No tasks assigned"
            />
          </Card>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="display1" paragraph>
            Aufgabenliste
          </Typography>
          {tasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
            <Card key={task.id} className={classes.task}>
              <CardContent>
                <Link to={`/prs/${task.id}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="headline" component="h2">
                    {task.title}
                  </Typography>
                  <Typography component="p">{task.description}</Typography>
                  <Deadline deadline={task.deadline} />
                </Link>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.button}
                  color="primary"
                  onClick={() => {
                    this.handleClick(task);
                  }}
                >
                  <Hidden smDown>Als erledigt markieren</Hidden>
                  <Icon className={classes.rightIcon}>check</Icon>
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      );
    }
  }
}

export default connect(
  state => ({
    tasks: state.tasks.list,
    isLoading: state.tasks.isLoading,
    isChanging: state.tasks.isChanging
  }),
  {
    fetchTasks: actions.fetchTasks,
    changeTask: actions.editTask
  }
)(withLoading(props => props.fetchTasks())(withStyles(styles)(TaskList)));
