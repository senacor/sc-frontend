import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { LanguageContext } from '../App';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../helper/routes';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  btnHidden: {
    display: 'none'
  }
});

const LanguageButton = ({ languageButtonClassName, match, classes }) => {
  const languageContext = useContext(LanguageContext.context);

  useEffect(
    () => {
      if (match.path === ROUTES.SC_DETAIL) {
        if (localStorage.getItem('lang') !== 'de') {
          changeLanguage('de');
        }
      }
    },
    [match]
  );

  const changeLanguage = language => {
    languageContext.setValue(language);
    localStorage.setItem('lang', language);
  };

  const handleLanguageChange = () => {
    let localStorageLang = localStorage.getItem('lang');
    if (localStorageLang) {
      if (localStorageLang === 'de') {
        changeLanguage('en');
      } else {
        changeLanguage('de');
      }
    } else {
      if (languageContext.value === 'de') {
        changeLanguage('en');
      } else {
        changeLanguage('de');
      }
    }
  };

  return (
    <Button
      onClick={handleLanguageChange}
      className={
        match.path === ROUTES.SC_DETAIL
          ? classes.btnHidden
          : languageButtonClassName
      }
    >
      {localStorage.getItem('lang')
        ? localStorage.getItem('lang')
        : languageContext.value}
    </Button>
  );
};

export default withRouter(withStyles(styles)(LanguageButton));
