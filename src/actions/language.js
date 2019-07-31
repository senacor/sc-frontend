import { CHANGE_LANGUAGE } from '../helper/dispatchTypes';

export const changeLanguage = language => dispatch => {
  dispatch({
    type: CHANGE_LANGUAGE,
    payload: language
  });
};
