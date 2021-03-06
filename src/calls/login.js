import { default as fetch } from '../helper/customFetch';

export const login = async (
  credentials,
  setIsLoading,
  setIsLoggedIn,
  authorizationContext
) => {
  try {
    setIsLoading(true);

    authorizationContext.setValue({
      unauthorized: false,
      invalidCredentials: false
    });

    if (credentials.username === '' || credentials.password === '') {
      authorizationContext.setValue({
        unauthorized: true,
        invalidCredentials: true
      });
      setIsLoading(false);
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/oauth2/token`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(credentials)
      },
      authorizationContext
    );

    const data = await response.json();
    setIsLoading(false);
    setIsLoggedIn(setDataInLocalStorage(data));
  } catch (err) {
    setIsLoading(false);
    setIsLoggedIn(removeDataInLocalStorage());
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
