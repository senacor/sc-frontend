import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import withLoading from '../hoc/Loading';
import Deadline from './Deadline';
import { Link } from 'react-router-dom';

export class TaskList extends React.Component {
  handleClick = task => {
    task.status = 'DONE';
    let tempArray = [];

    for (let i = 0; i < this.state.tasks.length; i++) {
      tempArray[i] = this.state.tasks[i];
    }
    this.setState({
      tasks: tempArray
    });
  };

  constructor(props) {
    super(props);
    this.state = {tasks: props.tasks};
  }

  render() {
    return (
      <div>
        {props.tasks.map(task => (
          <Card key={task.id} className="task">
            <CardContent className={task.id}>
              <Link to={`/prs/${task.id}`} style={{textDecoration: 'none'}}>
                <Typography variant="headline" component="h2">
                  {task.title}
                </Typography>
                <Typography component="p">{task.description}</Typography>
                <Deadline deadline={task.deadline}/>
                <button
                  onClick={() => {
                    this.handleClick(task);
                  }}
                >
                  {' '}
                  {task.status}
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default connect(
  state => ({
    tasks: state.tasks.list,
    isLoading: state.tasks.isLoading
  }),
  {
    fetchTasks: actions.fetchTasks
  }
)(withLoading(props => props.fetchTasks())(TaskList));
