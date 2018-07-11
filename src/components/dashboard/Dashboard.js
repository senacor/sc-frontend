import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withStyles } from '@material-ui/core/styles/index';
import withLoading from '../hoc/Loading';
import EventList from './EventList';

let styles = {
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    flexGrow: '1',
    margin: '20px'
  },
  thinItem: {
    paddingTop: 10,
    paddingBottom: 10
  }
};

class Dashboard extends Component {
  render() {
    const { classes, events } = this.props;

    return (
      <div className={classes.columnContainer}>
        <div className={classes.rowContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                5
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                offene PRs
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                18
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Kollegen im CST
              </Typography>
            </CardContent>
          </Card>
        </div>

        <EventList events={events} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: Object.values(state.events)
  };
}

let dispatchToProps = {
  getEvents: actions.getEvents
};

export const StyledComponent = withStyles(styles)(Dashboard);
export default connect(mapStateToProps, dispatchToProps)(
  withLoading(props => props.getEvents())(StyledComponent)
);
