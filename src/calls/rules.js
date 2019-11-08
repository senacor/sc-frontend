import { default as fetch } from '../helper/customFetch';
import { sortByPriority } from '../components/admin/automationRules/functions';

export const getAllRules = async (setRules, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/scorecards/automation/rule/all`
    );

    const responseRules = await response.json();

    setIsLoading(false);
    sortByPriority(responseRules);
    setRules(responseRules);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    error.showGeneral();
  }
};

export const deleteRule = async (id, error) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v1/scorecards/automation/rule/${id}`, {
      method: 'delete',
      mode: 'cors'
    });
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const addRule = async (ruleObject, rules, setRules, error, info) => {
  try {
    const newRules = [...rules];
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/scorecards/automation/rule`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          chronology: ruleObject.chronology,
          timeUnit: ruleObject.timeUnit,
          processType: ruleObject.processType,
          regulationCriterion: ruleObject.regulationCriterion,
          priority: ruleObject.priority,
          timeUnitNumber: ruleObject.timeUnitNumber,
          expirationDate: ruleObject.expirationDate
        })
      }
    );

    const ruleResponse = await response.json();
    if (response.status === 200) {
      newRules.push(ruleResponse);
      sortByPriority(newRules);
      setRules(newRules);
      info.msg('message.ruleCreated');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const updateRulePriority = async (map, processType, error) => {
  try {
    await fetch(
      `${
        process.env.REACT_APP_API
      }/api/v1/scorecards/automation/rule/swapPriorities?processType=${processType}`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(Object.fromEntries(map))
      }
    );
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
