import React from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Card from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import withLoading from '../hoc/Loading';
import * as actions from '../../actions/index';

const styles = theme => ({
  avatar: {
    marginLeft: '20px',
    marginTop: '20px',
    height: '50px',
    width: '50px'
  },
  container: {
    display: 'flex'
  },
  typography: {
    color: '#FFF',
    marginLeft: '30px',
    marginTop: '20px',
    fontSize: '15px'
  },
  detailPanel: {
    width: '100%',
    backgroundColor: theme.palette.primary['400'],
    marginTop: '0px'
  },
  tabsColor: {
    color: theme.palette.contrastText
  }
});

class Pr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prById: props.prById,
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

  clickOnAnstellung = () => {};

  clickOnGehalt = () => {};
  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { classes, prById } = this.props;

    return (
      <div className={classes.detailPanel}>
        <div className={classes.container}>
          <Avatar
            alt="Employee"
            className={classes.avatar}
            src="/supervisor.jpg"
          />
          <Typography className={classes.typography} component="div">
            <div>Performance Review</div>
            <div>{prById.username}</div>
          </Typography>
        </div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="#FFA07A"
          className={classes.tabsColor}
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
      </div>
    );
  }
}
export const StyledComponent = withStyles(styles)(Pr);
export default connect(
  state => ({
    prById: state.prById.returnTask,
    isLoading: state.prById.getTask
  }),
  {
    fetchPrsById: actions.fetchTasksById
  }
)(
  withLoading(props => props.fetchPrsById(props.match.params.id))(
    StyledComponent
  )
);
