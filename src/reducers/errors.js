import { ERROR_RESPONSE, ERROR_RESPONSE_DELEGATION, ERROR_GONE } from '../helper/dispatchTypes';

const defaultState = { hasErrors: false, message: null };

const errors = (state = defaultState, action) => {
  switch (action.type) {
    case ERROR_RESPONSE:
      return generateErrorState(action.httpCode);
    case ERROR_RESPONSE_DELEGATION:
      return generateErrorState(action.httpCode, action.errorMessage);
    case ERROR_GONE:
      return defaultState;
    default:
      return defaultState;
  }
};

function generateErrorState(httpCode, errorMessage, showErrorMessage) {
  //Todo: Methode umschreiben, vielleicht Warnungen/Hinweise ausgeben in anderer Farbe als rot
  if (httpCode === 400) {
    return Object.assign({}, { hasErrors: true, message: errorMessage });
  }
  if (httpCode < 500) {
    return Object.assign({}, { hasErrors: false, message: null });
  }

  if (httpCode >= 500) {
    return Object.assign(
      {},
      {
        hasErrors: true,
        message: 'Es ist ein technischer Fehler aufgetreten.'
      }
    );
  }
}

export default errors;
