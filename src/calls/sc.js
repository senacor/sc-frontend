export const getOwnScs = async (setOwnScs, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/sc/overview/own`
    );
    const responseOwnScs = await response.json();

    console.log('response', responseOwnScs);

    setIsLoading(false);
    setOwnScs(responseOwnScs);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};
