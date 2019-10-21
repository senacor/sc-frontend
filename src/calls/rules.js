import { default as fetch } from '../helper/customFetch';

export const getAllRules = async (setRules, setIsLoading, errorContext) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/automation/rule/all`
    );

    const responseRules = await response.json();

    setIsLoading(false);
    setRules(responseRules);
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const deleteRule = async (id, errorContext) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/automation/rule/${id}`, {
      method: 'delete',
      mode: 'cors'
    });
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const addRule = async (ruleObject, rules, setRules, errorContext) => {
  try {
    const newRules = [...rules];
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/automation/rule`,
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
    }
    setRules(newRules);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
