import { default as fetch } from '../helper/customFetch';

export const getFeedbacks = async (setData, setIsLoading, errorContext) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v3/feedback/all`
    );
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const addFeedback = async (type, subject, message, errorContext) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/feedback`, {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({
        subject: subject,
        body: message,
        context: type.toUpperCase()
      })
    });
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};

export const deleteFeedbacks = async (ids, errorContext) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v3/feedback`, {
      method: 'delete',
      mode: 'cors',
      body: JSON.stringify(ids)
    });
  } catch (err) {
    console.log(err);
    errorContext.setValue({
      hasErrors: true,
      messageId: 'message.error'
    });
  }
};
