import { default as fetch } from '../../helper/customFetch';

export const fetchPrById = async (
  prsId,
  afterPrFetched,
  setIsLoading,
  errorContext
) => {
  setIsLoading(true);
  errorContext.setValue({ hasErrors: false, message: '' });
  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/pr/${prsId}`
  );
  if (response.ok) {
    const prById = await response.json();
    afterPrFetched(prById);
    setIsLoading(false);
    return prById;
  } else {
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: false,
      message: 'Es wurde Fehler aufgetreten: ' + response.status
    });
  }
};
