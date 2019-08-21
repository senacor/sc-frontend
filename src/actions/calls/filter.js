import { default as fetch } from '../../helper/customFetch';

export const getFilterPossibilities = async (
  setLoading,
  setFilterPossibilities,
  errorContext
) => {
  setLoading(true);

  const response = await fetch(
    `${process.env.REACT_APP_API}/api/v3/prs/filter`
  );

  if (response.ok) {
    const possibilities = await response.json();
    setFilterPossibilities(possibilities);
    setLoading(false);
  } else {
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setLoading(false);
  }
};
