import { NavLink } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import React from 'react';
import PropTypes from 'prop-types';

function InfoWidget(props) {
  const style = {
    margin: '20px',
    textDecoration: 'none',
    padding: '0',
    alignItems: 'stretch',
    height: '100%'
  };

  return (
    <Card
      component={props.linkTo ? NavLink : null}
      to={props.linkTo}
      style={style}
      onClick={props.onClick}
    >
      <CardContent
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '0'
        }}
      >
        <div
          style={{
            flexGrow: '1',
            padding: '16px',
            fontSize: 30,
            alignSelf: 'center'
          }}
        >
          <Icon fontSize={'large'} color={'primary'}>
            {props.icon}
          </Icon>
        </div>
        <div
          style={{
            flexGrow: '3',
            padding: '16px 24px 16px 0px'
          }}
        >
          <Typography color="textSecondary">{props.label}</Typography>
          <Typography variant="h5" component="h2">
            {props.value}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

InfoWidget.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.node,
  label: PropTypes.node,
  icon: PropTypes.string,
  linkTo: PropTypes.string
};

export default InfoWidget;
