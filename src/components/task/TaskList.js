import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import withLoading from '../hoc/Loading';
import Deadline from './Deadline';
import {Link} from 'react-router-dom';

export const TaskList = props => (
  <div>
    {props.tasks.map(task => (
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
      </Card>
    ))}
  </div>
);

export default connect(
  state => ({
    tasks: state.tasks.list,
    isLoading: state.tasks.isLoading
  }),
  {
    fetchTasks: actions.fetchTasks
  }
)(withLoading(props => props.fetchTasks())(TaskList));
