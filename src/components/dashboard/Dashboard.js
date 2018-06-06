import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles/index';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

function Dashboard(props) {
  const { classes } = props;

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
        <ListItem className={classes.thinItem}>
          <ListItemText primary="Volker Vorgesetzter hat seine Bewertung abgegeben" />
        </ListItem>
        <Divider />
        <ListItem className={classes.thinItem}>
          <ListItemText primary="Volker Vorgesetzter hat den Terminvorschlag abgelehnt" />
        </ListItem>
      </List>
    </div>
  );
}

export default withStyles(styles)(Dashboard);
