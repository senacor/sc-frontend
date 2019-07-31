import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockIcon from '@material-ui/icons/Lock';
import { FormattedMessage, injectIntl } from 'react-intl';

import officeMuenchen from './officeM.jpg';
import senacorLogo from './senacor_transparent.png';
import senacorLogoMobile from './senacor_transparent_white.png';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import { isLoading } from '../../reducers/selector';
import LanguageButton from '../AppBar/LanguageButton';

const styles = theme => ({
  hero: {
    width: '100wh',
    height: '100vh',
    display: 'flex',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${officeMuenchen})`
  },
  login: {
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      background:
        'linear-gradient(135deg, rgba(1,166,136,0.9) 0, rgba(0,73,83,0.9) 41%, rgba(0,73,83,0.9) 100%);'
    },
    [theme.breakpoints.up('md')]: {
      width: '33%',
      backgroundColor: 'rgba(255,255,255,0.98)'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    margin: 0,
    position: 'absolute',
    top: '31%',
    paddingBottom: '100px'
  },
  formControl: {
    margin: theme.spacing.unit,
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
      backgroundColor: '#FFF',
      borderRadius: '10px',
      padding: '10px'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  input: {
    [theme.breakpoints.down('sm')]: {
      color: 'rgba(0,0,0,1)',
      '&:before': {
        backgroundColor: 'inherit'
      },
      '&:after': {
        backgroundColor: 'inherit'
      }
    }
  },
  logo: {
    width: '60%',
    marginBottom: '15px'
  },
  button: {
    marginTop: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
      borderRadius: '10px',
      padding: '10px',
      backgroundColor: theme.palette.primary['100'],
      '&:hover': {
        backgroundColor: theme.palette.primary['100']
      }
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
      backgroundColor: theme.palette.primary['500']
    }
  },
  wrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: theme.palette.primary['A100'],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
});

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOnClick = event => {
    event.preventDefault();

    props.login({
      username: username,
      password: password
    });
  };

  const handleChange = event => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  let { from } = props.location.state || { from: { pathname: '/' } };

  if (props.isLoggedIn) {
    return <Redirect push to={from} />;
  }
  //console.log('isloading', isLoading);
  return (
    <div className={props.classes.hero}>
      <div className={props.classes.login}>
        <LanguageButton color="primary" />
        <form className={props.classes.form} onSubmit={handleOnClick}>
          <Hidden smDown>
            <img
              src={senacorLogo}
              className={props.classes.logo}
              alt="Senacor"
            />
          </Hidden>
          <Hidden mdUp>
            <img
              src={senacorLogoMobile}
              className={props.classes.logo}
              alt="Senacor"
            />
          </Hidden>
          <FormControl
            className={props.classes.formControl}
            error={props.isUnauthorized}
          >
            <Input
              name="username"
              value={username}
              placeholder={props.intl.formatMessage({
                id: 'login.username'
              })}
              className={props.classes.input}
              onChange={handleChange}
              startAdornment={<UserIcon />}
            />
          </FormControl>
          <FormControl
            className={props.classes.formControl}
            error={props.isUnauthorized}
          >
            <Input
              name="password"
              type="password"
              value={password}
              placeholder={props.intl.formatMessage({
                id: 'login.password'
              })}
              className={props.classes.input}
              onChange={handleChange}
              startAdornment={<PasswordIcon />}
            />
            <FormHelperText id="name-error-text">
              {props.isUnauthorized && 'Anmeldung fehlgeschlagen'}
            </FormHelperText>
          </FormControl>

          <Hidden smDown>
            <Button
              color="primary"
              className={props.classes.button}
              variant="contained"
              onClick={handleOnClick}
              type="submit"
            >
              {isLoading ? (
                <CircularProgress
                  size={24}
                  className={props.classes.buttonProgress}
                />
              ) : (
                <FormattedMessage id="login.login" />
              )}
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Button
              className={props.classes.button}
              variant="contained"
              onClick={handleOnClick}
              type="submit"
            >
              {<FormattedMessage id="login.login" />}
            </Button>
          </Hidden>
        </form>
      </div>
    </div>
  );
};

const UserIcon = () => (
  <InputAdornment position="start">
    <PermIdentityIcon />
  </InputAdornment>
);

const PasswordIcon = () => (
  <InputAdornment position="start">
    <LockIcon />
  </InputAdornment>
);

export const StyledComponent = withStyles(styles)(Login);

export default injectIntl(
  connect(
    state => ({
      isLoggedIn: state.login.isLoggedIn,
      isLoading: isLoading(state),
      isUnauthorized: state.login.isUnauthorized
    }),
    {
      login: actions.login
    }
  )(StyledComponent)
);
