import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { withStyles } from '@material-ui/core/styles/index';
import withLoading from '../hoc/Loading';
import { formatMomentForFrontend } from '../../helper/date';

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
  componentDidMount() {
    this.props.getPrEvents();
  }

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

        <List
          component="nav"
          subheader={<ListSubheader component="div">Aktivitäten</ListSubheader>}
        >
          {events.map(eventable => {
            return (
              <ListItem className={classes.thinItem} key={eventable.id}>
                <Chip
                  label={formatMomentForFrontend(eventable.createdAt)}
                  className={classes.chip}
                />
                <Divider />
                <ListItemText primary={`${eventable.eventType}`} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(Dashboard);
export default connect(
  // MapStateToProps
  state => ({
    events: state.events
  }),
  // MapDispatchToProps
  {
    getPrEvents: actions.getPrEvents
  }
)(withLoading(props => props.getPrEvents())(StyledComponent));
