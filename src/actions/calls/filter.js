import { default as fetch } from '../../helper/customFetch';

export const getFilterPossibilities = async (
  setLoading,
  setFilterPossibilities,
  errorContext
) => {
  try {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/prs/filter`
    );
    const possibilities = await response.json();
    setFilterPossibilities(possibilities);
    setLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
    setLoading(false);
  }
};
