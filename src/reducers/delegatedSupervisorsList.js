import { combineReducers } from 'redux';

const delegatedSupervisorsList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SUPERVISOR':
      return [...state, { supervisor: action.supervisor, prId: action.prId }];

    default:
      return state;
  }
};

const supervisors = combineReducers({ delegatedSupervisorsList });

export default supervisors;
