import { default as fetch } from '../../helper/customFetch';

export const login = async (
  credentials,
  setIsLoading,
  setIsLoggedIn,
  authorizationContext,
  errorContext
) => {
  setIsLoading(true);
  errorContext.setValue({ hasErrors: false, messageId: '' });
  authorizationContext.setValue(false);

  if (credentials.username === '' || credentials.password === '') {
    return;
  }

  const response = await fetch(`${process.env.REACT_APP_API}/oauth2/token`, {
    method: 'post',
    mode: 'cors',
    body: JSON.stringify(credentials)
  });

  if (response.ok) {
    const data = await response.json();
    setIsLoading(false);
    setIsLoggedIn(setDataInLocalStorage(data));
  } else {
    setIsLoading(false);
    setIsLoggedIn(removeDataInLocalStorage());
    authorizationContext.setValue(true);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const logout = async () => {
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
