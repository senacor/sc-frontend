import React from 'react';
import { withStyles } from '@material-ui/core';
import { injectIntl } from 'react-intl';

// Material UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    width: 250
  }
});

const EmployeeCard = ({ classes, firstName, lastName }) => {
  return (
    <Card className={classes.card}>
      <CardHeader title="Michel Mitarbeiterin" />
      <CardMedia image="/" title={`${firstName} ${lastName}`} />
      <CardContent>
        <Typography>Current position (CON/DEV): Consultant</Typography>
        <Typography>CST: Teambank, Rolf Kintscher</Typography>
        <Typography>CC: Consulting, 8 months</Typography>
        <Typography>Office location: Munchen</Typography>
        <Typography>Due date: 20.09.2019</Typography>
      </CardContent>
    </Card>
  );
};

export default injectIntl(withStyles(styles)(EmployeeCard));
