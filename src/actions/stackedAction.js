export const stackedAction = (firstAction, secondAction) => async dispatch => {
  console.log('first Action');
  await firstAction();
  console.log('secondAction');
  await secondAction();
};
