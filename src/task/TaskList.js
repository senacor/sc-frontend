import React, { Component } from 'react';

// TODO(PR-20): implement this for real
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ['not filled']
    };
  }

  async componentDidMount() {
    if (process.env.NODE_ENV === 'test') {
      return; // TODO(PR-20): remove
    }

    const res = await fetch(process.env.REACT_APP_API + '/api/v1/tasks');
    const list = await res.json();
    list.push('filled!');
    this.setState({
      list: list
    });
  }

  render() {
    return <div> {this.state.list.toString()} </div>;
  }
}

export default TaskList;
