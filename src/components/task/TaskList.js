import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import withLoading from '../hoc/Loading';
import Deadline from './Deadline';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    marginLeft: 'auto'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  task: {
    marginBottom: '15px'
  }
});

export class TaskList extends React.Component {
  constructor(props) {
    super(props);
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

  // TODO remove className only for e2e test.
  // is needed. thinking of another way to do this.
  render() {
    const { classes, tasks } = this.props;
    return (
      <div>
        {tasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
          <Card key={task.id}>
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
                Als erledigt markieren
                <Icon className={classes.rightIcon}>check</Icon>
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
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
