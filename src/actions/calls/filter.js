import { default as fetch } from '../../helper/customFetch';

export const getFilterPossibilities = async (
  setLoading,
  setFilterPossibilities
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
    //TODO: errorhandling response.status
  }
};
