import {
  ADD_FILTER,
  ADD_SUBFILTER,
  DELETE_SUBFILTER,
  LOGOUT
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';
import HR_ELEMENTS from '../components/humanResources/hrElements';

const hr_initDateFrom = new Date().getFullYear() + '-01-01';
const hr_initDateTo = new Date().getFullYear() + '-12-31';
const hr_initDate = {
  [HR_ELEMENTS.DEADLINE]: {
    searchString: `${HR_ELEMENTS.DEADLINE}From=${hr_initDateFrom}&${
      HR_ELEMENTS.DEADLINE
    }To=${hr_initDateTo}`,
    values: {
      From: hr_initDateFrom,
      To: hr_initDateTo
    }
  }
};

export const filter = (state = { hr: hr_initDate }, action) => {
  switch (action.type) {
    case ADD_FILTER: {
      let newFilterGroup = Object.assign(
        {},
        state[action.payload.filterGroup],
        action.payload.filter
      );

      return cloneDeep(
        Object.assign({}, state, {
          [action.payload.filterGroup]: newFilterGroup
        })
      );
    }
    case ADD_SUBFILTER: {
      let newFilterGroup = Object.assign(
        {},
        state[action.payload.filterGroup],
        {
          [action.payload.filterBy]: action.payload.filter
        }
      );

      return cloneDeep(
        Object.assign({}, state, {
          [action.payload.filterGroup]: newFilterGroup
        })
      );
    }

    case DELETE_SUBFILTER: {
      let newFilterGroup = cloneDeep(state);
      if (newFilterGroup[action.payload.filterGroup]) {
        delete newFilterGroup[action.payload.filterGroup][
          action.payload.filterBy
        ];
      }
      return newFilterGroup;
    }
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
