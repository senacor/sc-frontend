import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  version: {
    padding: theme.spacing.unit
  }
});

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
        composition: 'localhost'
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div id="composition-number" className={classes.version}>
        <Typography color="textSecondary">
          version {this.state.composition}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(CompositionNumber);
