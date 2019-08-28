import { default as fetch } from '../../helper/customFetch';

export const login = async (
  credentials,
  setIsLoading,
  setIsLoggedIn,
  authorizationContext,
  errorContext
) => {
  try {
    setIsLoading(true);
    authorizationContext.setValue(false);

    if (credentials.username === '' || credentials.password === '') {
      authorizationContext.setValue(true);
      setIsLoading(false);
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API}/oauth2/token`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    setIsLoading(false);
    setIsLoggedIn(setDataInLocalStorage(data));
  } catch (err) {
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setIsLoggedIn(removeDataInLocalStorage());
    authorizationContext.setValue(true);
  }
};

export const logout = () => {
  removeDataInLocalStorage();
};

const setDataInLocalStorage = data => {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  return true;
};

const removeDataInLocalStorage = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return false;
};
