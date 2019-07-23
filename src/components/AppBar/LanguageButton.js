import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

const styles = theme => ({
  button: {
    color: '#FFF',
    position: 'absolute',
    right: 2 * theme.spacing.unit
  }
});

class LanguageButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLanguageChange = () => {
    let localStorageLang = localStorage.getItem('lang');
    if (localStorageLang) {
      if (localStorageLang === 'de') {
        this.props.changeLanguage('en');
      } else {
        this.props.changeLanguage('de');
      }
    } else {
      if (this.props.language === 'de') {
        this.props.changeLanguage('en');
      } else {
        this.props.changeLanguage('de');
      }
    }
  };

  render() {
    const { classes, language, color } = this.props;
    if (this.props.color === 'primary') {
      return (
        <Button color={color} onClick={() => this.handleLanguageChange()}>
          {language}
        </Button>
      );
    } else {
      return (
        <Button
          color={color}
          className={classes.button}
          onClick={() => this.handleLanguageChange()}
        >
          {language}
        </Button>
      );
    }
  }
}

export const StyledComponent = withStyles(styles)(LanguageButton);

export default connect(
  state => ({
    language: state.language
  }),
  {
    changeLanguage: actions.changeLanguage
  }
)(StyledComponent);
