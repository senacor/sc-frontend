import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { LanguageContext } from '../App';

const LanguageButton = ({ languageButtonClassName }) => {
  const languageContext = useContext(LanguageContext.context);

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
    <Button onClick={handleLanguageChange} className={languageButtonClassName}>
      {localStorage.getItem('lang')
        ? localStorage.getItem('lang')
        : languageContext.value}
    </Button>
  );
};

export default LanguageButton;
