import errorsReducer from './errors';

describe('Errors Reducer', () => {
  const defaultState = { hasErrors: false, message: null };

  it('should return technical error on 500 httpCode', () => {
    let actionMock = {
      type: 'ERROR_RESPONSE',
      httpCode: 500
    };

    let result = errorsReducer(defaultState, actionMock);

    expect(result).toEqual({
      hasErrors: true,
      message: 'Es ist ein technischer Fehler aufgetreten.'
    });
  });

  it('should return technical error on errors greater than 500', () => {
    let actionMock = {
      type: 'ERROR_RESPONSE',
      httpCode: 501
    };

    let result = errorsReducer(defaultState, actionMock);

    expect(result).toEqual({
      hasErrors: true,
      message: 'Es ist ein technischer Fehler aufgetreten.'
    });
  });

  it('should return default error state on codes lower than 500', () => {
    let actionMock = {
      type: 'ERROR_RESPONSE',
      httpCode: 499
    };

    let result = errorsReducer(defaultState, actionMock);

    expect(result).toEqual(defaultState);
  });

  it('should return default error state on ERROR_GONE', () => {
    let actionMock = {
      type: 'ERROR_GONE'
    };

    let result = errorsReducer(defaultState, actionMock);

    expect(result).toEqual(defaultState);
  });
});
