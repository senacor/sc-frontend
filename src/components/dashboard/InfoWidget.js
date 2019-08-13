import { NavLink } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  ...theme,
  card: {
    margin: 3 * theme.spacing.unit,
    textDecoration: 'none',
    padding: '0',
    alignItems: 'stretch',
    height: '100%'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0'
  }
});

const InfoWidget = ({ classes, linkTo, onClick, icon, label, value }) => {
  return (
    <Card
      component={linkTo ? NavLink : null}
      to={linkTo}
      className={classes.card}
      onClick={onClick}
    >
      <CardContent className={classes.cardContent}>
        <div
          style={{
            flexGrow: '1',
            padding: '16px',
            fontSize: 30,
            alignSelf: 'center'
          }}
        >
          <Icon fontSize={'large'} color={'primary'}>
            {icon}
          </Icon>
        </div>
        <div
          style={{
            flexGrow: '3',
            padding: '16px 24px 16px 0px'
          }}
        >
          <Typography color="textSecondary">{label}</Typography>
          <Typography variant="h5" component="h2">
            {value}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

InfoWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  value: PropTypes.node,
  label: PropTypes.node,
  icon: PropTypes.string,
  linkTo: PropTypes.string
};

export default withStyles(styles)(InfoWidget);
