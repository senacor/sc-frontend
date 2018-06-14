import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment/moment';
import styles from './MyPRListStyle';

export class MyPRListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewer: props.reviewer,
      deadline: props.deadline,
      occasion: props.occasion,
      status: props.status
    };
  }

  render() {
    const { classes } = this.props;
    const { reviewer, deadline, occasion, status } = this.state;
    return (
      <ListItem className={classes.listItem}>
        <ListItemText>
          <div className={classes.divItemText}>
            <Typography className={classes.typography}>
              Beurteiler: {reviewer}
            </Typography>
            {deadline ? (
              <Typography className={classes.typography}>
                Datum: {moment(deadline).format('DD.MM.YY')}
              </Typography>
            ) : (
              ''
            )}

            <Typography className={classes.typography}>{occasion}</Typography>
            <Typography
              className={
                status === 'DONE'
                  ? classes.typographyDone
                  : classes.typographyGreen
              }
            >
              {status}
            </Typography>
          </div>
        </ListItemText>
      </ListItem>
    );
  }
}

export default withStyles(styles)(MyPRListItem);
