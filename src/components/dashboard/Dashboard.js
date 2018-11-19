import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';

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
    const { classes } = this.props;

    return (
      <div className={classes.columnContainer}>
        <div className={classes.rowContainer}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                5
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                offene PRs
              </Typography>
            </CardContent>
          </Card>

          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                18
              </Typography>
              <Typography className={classes.title} color="textSecondary">
                Kollegen im CST
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export const StyledComponent = withStyles(styles)(Dashboard);
export default StyledComponent;
