import { default as fetch } from '../helper/customFetch';

export const getAllRules = async (setRules, setIsLoading, error) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/automation/dates`
    );
    const responseRules = await response.json();
    setIsLoading(false);
    setRules(
      responseRules && Array.isArray(responseRules) ? responseRules : []
    );
  } catch (err) {
    setRules([]);
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const saveRules = async (rules, afterSave, error, info) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/automation/dates`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(rules)
      }
    );
    await response.json();
    afterSave();
    info.msg('autorules.save.success');
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
