import { CHANGE_LANGUAGE } from '../helper/dispatchTypes';

export const language = (state = 'de', action) => {
  if (action.type === CHANGE_LANGUAGE) {
    return changeLanguage(action.payload);
  } else {
    let localStorageLang = localStorage.getItem('lang');
    if (localStorageLang) {
      return localStorageLang;
    }
    return state;
  }
};

function changeLanguage(language) {
  localStorage.setItem('lang', language);
  return language;
}
