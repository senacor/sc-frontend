import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
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
    marginBottom: '10px'
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

  render() {
    const { classes, tasks } = this.props;
    return (
      <div>
        <Typography variant="display1" paragraph>
          Aufgabenliste
        </Typography>
        {tasks.length === 0 ? <p>Keine offenen Aufgaben</p> : ''}
        {tasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
          <Card key={task.id} className={classes.task}>
            <CardContent>
              <Link
                to={
                  task.type === 'PR'
                    ? `/prs/${task.linkToDetails}`
                    : `${task.linkToDetails}`
                }
                style={{ textDecoration: 'none' }}
              >
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

export const StyledComponent = withStyles(styles)(TaskList);

export default connect(
  state => ({
    tasks: state.tasks.list,
    isLoading: state.isLoading,
    isChanging: state.tasks.isChanging
  }),
  {
    fetchTasks: actions.fetchTasks,
    changeTask: actions.editTask
  }
)(withLoading(props => props.fetchTasks())(StyledComponent));
