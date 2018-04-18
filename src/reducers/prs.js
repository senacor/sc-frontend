import { combineReducers } from 'redux';

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    case 'ADD_PR_RESPONSE':
      return [...state, action.pr];

    case 'ADD_SUPERVISOR':
      return [
        ...state.filter(pr => pr.id !== action.prId),

        ...state.filter(pr => pr.id === action.prId).map(pr => ({
          id: pr.id,
          employee: pr.employee,
          occasion: pr.occasion,
          status: pr.status,
          supervisor: pr.supervisor,
          delegateSupervisor: action.supervisor,
          deadline: pr.deadline
        }))
      ].sort(function(pr1, pr2) {
        pr1.id < pr2.id;
      });

    default:
      return state;
  }
};

const prs = combineReducers({ prsList });

export default prs;
