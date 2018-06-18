import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment/moment';
import styles from './MyPRListStyle';

function MyPRListItem(props) {
  return (
    <ListItem className={props.classes.listItem}>
      <ListItemText>
        <div className={props.classes.divItemText}>
          <Typography className={props.classes.typography}>
            Beurteiler: {props.reviewer}
          </Typography>
          {props.deadline ? (
            <Typography className={props.classes.typography}>
              Datum: {moment(props.deadline).format('DD.MM.YY')}
            </Typography>
          ) : (
            ''
          )}

          <Typography className={props.classes.typography}>
            {props.occasion}
          </Typography>
          <Typography
            className={
              props.status === 'DONE'
                ? props.classes.typographyDone
                : props.classes.typographyGreen
            }
          >
            {props.status}
          </Typography>
        </div>
      </ListItemText>
    </ListItem>
  );
}

export default withStyles(styles)(MyPRListItem);
