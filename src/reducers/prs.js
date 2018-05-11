import { combineReducers } from 'redux';

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    case 'ADD_PR_RESPONSE':
      return [...state, action.pr];
    case 'ADD_SUPERVISOR': {
      let index = state.findIndex(pr => pr.id === action.prId);

      return [
        ...state.slice(0, index),
        Object.assign(state[index], {
          delegatedSupervisor: action.delegatedSupervisor
        }),
        ...state.slice(index + 1, state.length)
      ];
    }
    case 'ADD_COMMENT': {
      let index = state.findIndex(pr => pr.id === action.prId);
      console.log(state);
      return [
        ...state.slice(0, index),
        Object.assign(
          state[index],
          Object.assign({
            [action.category]: {
              comment: action.comment
            }
          })
        ),
        ...state.slice(index + 1, state.length)
      ];
    }

    default:
      return state;
  }
};

const prs = combineReducers({ prsList });

export default prs;
