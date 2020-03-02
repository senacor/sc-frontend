import { default as fetch } from '../helper/customFetch';

export const getFeedbacks = async (setData, setIsLoading, error) => {
  try {
    setIsLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/feedback/all`
    );
    const data = await response.json();

    setData(data);
    setIsLoading(false);
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const addFeedback = async (type, subject, message, error, info) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/feedback`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          subject: subject,
          body: message,
          context: type.toUpperCase()
        })
      }
    );
    if (response.status === 201) {
      info.msg('message.feedbackCreated');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const addFeedbackFromLogin = async (
  email,
  type,
  subject,
  message,
  error,
  info
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API}/api/v1/feedback/login`,
      {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify({
          email: email,
          subject: subject,
          body: message,
          context: type.toUpperCase()
        })
      }
    );
    if (response.status === 201) {
      info.msg('message.feedbackCreated');
    }
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};

export const deleteFeedbacks = async (ids, error) => {
  try {
    await fetch(`${process.env.REACT_APP_API}/api/v1/feedback`, {
      method: 'delete',
      mode: 'cors',
      body: JSON.stringify(ids)
    });
  } catch (err) {
    console.log(err);
    error.showGeneral();
  }
};
