import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
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

import officeMuenchen from '../../styles/office_muenchen.jpg';
import senacorLogo from '../../styles/senacor_transparent.png';
import senacorLogoMobile from '../../styles/senacor_transparent_white.png';
import LanguageButton from '../translations/LanguageButton';
import { login } from '../../calls/login';
import { AuthorizationContext, UserinfoContext } from '../App';
import { useErrorContext } from '../../helper/contextHooks';

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '40rem',
    margin: 'auto'
  },
  formControl: {
    margin: theme.spacing.unit,
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: {
      width: '75%',
      backgroundColor: theme.palette.secondary.white,
      borderRadius: '10px',
      padding: '10px'
    },
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  input: {
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.primary[900],
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
  languageButton: {
    color: theme.palette.primary,
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      color: theme.palette.contrastText
    }
  },
  buttonProgress: {
    color: theme.palette.secondary.blue
  }
});

const Login = ({ location, classes, intl }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const error = useErrorContext();
  const authorizationContext = useContext(AuthorizationContext.context);
  const userInfoContext = useContext(UserinfoContext.context);

  useEffect(() => {
    userInfoContext.setValue({
      userinfo: {},
      userroles: [],
      userphoto: ''
    });
  }, []);

  const handleOnClick = event => {
    event.preventDefault();
    login(
      { username: username, password: password },
      setIsLoading,
      setIsLoggedIn,
      authorizationContext,
      error
    );
  };

  const handleChange = event => {
    if (event.target.name === 'username') {
      setUsername(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };

  let { from } = location.state || { from: { pathname: '/' } };

  if (isLoggedIn) {
    return <Redirect push to={from} />;
  }

  return (
    <div className={classes.hero}>
      <div className={classes.login}>
        <LanguageButton languageButtonClassName={classes.languageButton} />
        <form className={classes.form} onSubmit={handleOnClick}>
          <Hidden smDown>
            <img src={senacorLogo} className={classes.logo} alt="Senacor" />
          </Hidden>
          <Hidden mdUp>
            <img
              src={senacorLogoMobile}
              className={classes.logo}
              alt="Senacor"
            />
          </Hidden>
          <FormControl
            className={classes.formControl}
            error={authorizationContext.value}
          >
            <Input
              name="username"
              value={username}
              placeholder={intl.formatMessage({
                id: 'login.username'
              })}
              className={classes.input}
              onChange={handleChange}
              startAdornment={<UserIcon />}
            />
          </FormControl>
          <FormControl
            className={classes.formControl}
            error={authorizationContext.value}
          >
            <Input
              name="password"
              type="password"
              value={password}
              placeholder={intl.formatMessage({
                id: 'login.password'
              })}
              className={classes.input}
              onChange={handleChange}
              startAdornment={<PasswordIcon />}
            />
            <FormHelperText id="name-error-text">
              {authorizationContext.value &&
                `${intl.formatMessage({
                  id: 'login.failed'
                })}`}
            </FormHelperText>
          </FormControl>

          <Hidden smDown>
            <Button
              color="primary"
              className={classes.button}
              variant="contained"
              onClick={handleOnClick}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                <FormattedMessage id="login.login" />
              )}
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Button
              className={classes.button}
              variant="contained"
              onClick={handleOnClick}
              type="submit"
              disabled={isLoading}
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

export default injectIntl(withStyles(styles)(Login));
