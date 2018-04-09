import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import Hidden from 'material-ui/Hidden';
import { FormControl } from 'material-ui/Form';
import InputAdornment from 'material-ui/Input/InputAdornment';
import PermIdentityIcon from 'material-ui-icons/PermIdentity';
import LockIcon from 'material-ui-icons/Lock';

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
  }
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: props.token
    };
  }
  handleOnClick = () => {
    this.setState({ redirect: true });
    this.props.login();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    if (this.state.redirect) {
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
            <FormControl className={classes.formControl}>
              <Input
                name="username"
                value={this.state.name}
                placeholder="Nutzername"
                className={classes.input}
                onChange={this.handleChange}
                startAdornment={<UserIcon />}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Input
                name="password"
                type="password"
                value={this.state.name}
                placeholder="Passwort"
                className={classes.input}
                onChange={this.handleChange}
                startAdornment={<PasswordIcon />}
              />
            </FormControl>

            <Hidden smDown>
              <Button
                color="primary"
                className={classes.button}
                variant="raised"
                onClick={this.handleOnClick}
              >
                Log In
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
    token: state.login.isLoggedIn
  }),
  {
    login: actions.login
  }
)(StyledComponent);
