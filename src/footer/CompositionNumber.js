import React, { Component } from 'react';
import Typography from 'material-ui/Typography';

class CompositionNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composition: 'unknown'
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('/static/composition-number.json');

      this.setState({
        composition: await res.json()
      });
    } catch (err) {
      this.setState({
        composition: 'failed'
      });
    }
  }

  render() {
    return (
      <div id="composition-number">
        <Typography>current composition: {this.state.composition}</Typography>
      </div>
    );
  }
}

export default CompositionNumber;
