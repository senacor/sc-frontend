import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  card: {
    marginTop: 3 * theme.spacing.unit,
    marginLeft: 3 * theme.spacing.unit,
    textDecoration: 'none',
    height: 100,
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  },
  iconContainer: {
    flexGrow: 1,
    padding: 2 * theme.spacing.unit,
    fontSize: 30
  },
  textContainer: {
    width: 250,
    padding: 2 * theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  }
});

const InfoWidget = ({ linkTo, onClick, icon, label, value, classes }) => {
  return (
    <Card
      component={linkTo && NavLink}
      to={linkTo}
      className={classes.card}
      onClick={onClick}
    >
      <CardContent className={classes.cardContent}>
        <div className={classes.iconContainer}>
          <Icon fontSize={'large'} color={'primary'}>
            {icon}
          </Icon>
        </div>
        <div className={classes.textContainer}>
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
