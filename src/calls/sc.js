import { default as fetch } from '../helper/customFetch';

export const getOwnScs = async (setOwnScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/sc/overview/own`
    );
    const responseOwnScs = await response.json();

    console.log('response', responseOwnScs.scs);

    setIsLoading(false);
    setOwnScs(responseOwnScs.scs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};
