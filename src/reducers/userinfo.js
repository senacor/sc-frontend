export const userinfo = (state = {}, action) => {
  switch (action.type) {
    case 'FETCHED_USERINFO':
      return action.userinfo;
    default:
      return state;
  }
};

export const userphoto = (state = '', action) => {
  switch (action.type) {
    case 'FETCHED_USERPHOTO':
      return action.imageString;
    default:
      return state;
  }
};
