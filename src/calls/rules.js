import { default as fetch } from '../helper/customFetch';

export const getAllRules = async (setRules, setIsLoading, error) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/automation/rules`
    );
    const responseRules = await response.json();
    setIsLoading(false);
    console.log('responseRules', responseRules);
    setRules(responseRules);
  } catch (err) {
    setRules([]);
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const saveRules = async (
  ruleType,
  ruleValues,
  afterSave,
  error,
  info
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/automation/rules/` + ruleType,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(ruleValues)
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
