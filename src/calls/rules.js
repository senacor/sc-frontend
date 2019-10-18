import { default as fetch } from '../helper/customFetch';

export const getAllRules = async (setRules, setIsLoading, errorContext) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/automation/rule/all`
    );

    const responseRules = await response.json();
    console.log(responseRules);

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
