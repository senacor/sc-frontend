import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';

const LanguageButton = ({
  language,
  changeLanguage,
  languageButtonClassName
}) => {
  const handleLanguageChange = () => {
    let localStorageLang = localStorage.getItem('lang');
    if (localStorageLang) {
      if (localStorageLang === 'de') {
        changeLanguage('en');
      } else {
        changeLanguage('de');
      }
    } else {
      if (language === 'de') {
        changeLanguage('en');
      } else {
        changeLanguage('de');
      }
    }
  };

  return (
    <Button onClick={handleLanguageChange} className={languageButtonClassName}>
      {language}
    </Button>
  );
};

export default connect(
  state => ({
    language: state.language
  }),
  {
    changeLanguage: actions.changeLanguage
  }
)(LanguageButton);
