import { combineReducers } from 'redux';

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    case 'ADD_PR_RESPONSE':
      return [...state, action.pr];

    case 'ADD_SUPERVISOR': {
      function findPrIndex(pr) {
        return pr.id === action.prId;
      }
      let index = state.findIndex(findPrIndex);
      return [
        ...state.slice(0, index),
        {
          id: state[index].id,
          employee: state[index].employee,
          occasion: state[index].occasion,
          status: state[index].status,
          supervisor: state[index].supervisor,
          delegatedSupervisor: action.delegatedSupervisor,
          deadline: state[index].deadline,
          _links: state[index]._links
        },
        ...state.slice(index + 1, state.length)
      ];
    }
    default:
      return state;
  }
};

const prs = combineReducers({ prsList });

export default prs;
