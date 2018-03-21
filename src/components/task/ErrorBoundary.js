import React from 'react';
import Typography from 'material-ui/Typography';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles/index';

let errorImage = '/Error.png';
const styles = () => ({
  error: {
    color: '#D8000C',
    backgroundColor: '#FFBABA',
    backgroundImage: 'url(' + errorImage + ')',
    border: '1px solid',
    margin: '10px 0px',
    padding: '15px 10px 15px 50px',
    backgroundPosition: '10px center',
    backgroundRepeat: 'no-repeat',
    fontSize: '13px'
  }
});

export class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: props.hasError
    };
  }
  render() {
    const { classes, hasError } = this.props;

    return (
      <div
        className={classes.error}
        style={{ visibility: hasError ? 'visible' : 'hidden' }}
      >
        <Typography>Sorry Something went wrong!!!</Typography>
      </div>
    );
  }
}
export default connect(
  state => ({
    hasError: state.error.addError
  }),
  {
    fetch: actions.fetchTasks
  }
)(withLoading(props => props.fetch())(withStyles(styles)(Error)));
