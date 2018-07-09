import { ERROR_RESPONSE, ERROR_GONE } from '../helper/dispatchTypes';

const defaultState = { hasErrors: false, message: null };

const errors = (state = defaultState, action) => {
  switch (action.type) {
    case ERROR_RESPONSE:
      return generateErrorState(action.httpCode);
    case ERROR_GONE:
      return defaultState;
    default:
      return defaultState;
  }
};

function generateErrorState(httpCode, errorMessage, showErrorMessage) {
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
