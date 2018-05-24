import React, { Component } from 'react';
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

import officeMuenchen from './officeM.jpg';
import senacorLogo from './senacor_transparent.png';
import senacorLogoMobile from './senacor_transparent_white.png';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

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
    display: 'flex',
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
    width: '100%',
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'test.pr.mitarbeiter1',
      password: 'K!ckst4rter',
      token: props.token
    };
  }

  handleOnClick = () => {
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, isLoggedIn, isUnauthorized, isLoading } = this.props;

    if (isLoggedIn) {
      return <Redirect push to="/tasks" />;
    }

    return (
      <div className={classes.hero}>
        <div className={classes.login}>
          <div className={classes.form}>
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
            <FormControl className={classes.formControl} error={isUnauthorized}>
              <Input
                name="username"
                value={this.state.username}
                placeholder="Nutzername"
                className={classes.input}
                onChange={this.handleChange}
                startAdornment={<UserIcon />}
              />
            </FormControl>
            <FormControl className={classes.formControl} error={isUnauthorized}>
              <Input
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Passwort"
                className={classes.input}
                onChange={this.handleChange}
                startAdornment={<PasswordIcon />}
              />
              <FormHelperText id="name-error-text">
                {isUnauthorized && 'Anmeldung fehlgeschlagen'}
              </FormHelperText>
            </FormControl>

            <Hidden smDown>
              <Button
                color="primary"
                className={classes.button}
                variant="raised"
                onClick={this.handleOnClick}
              >
                {isLoading ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  'Log In'
                )}
              </Button>
            </Hidden>
            <Hidden mdUp>
              <Button
                className={classes.button}
                variant="raised"
                onClick={this.handleOnClick}
              >
                Log In
              </Button>
            </Hidden>
          </div>
        </div>
      </div>
    );
  }
}

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

export default connect(
  state => ({
    isLoggedIn: state.login.isLoggedIn,
    isLoading: state.isLoading,
    isUnauthorized: state.login.isUnauthorized
  }),
  {
    login: actions.login
  }
)(StyledComponent);
