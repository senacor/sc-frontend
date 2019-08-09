import {
  LOAD_ARCHIVED_FILES_LIST_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const archivedFiles = (state = [], action) => {
  switch (action.type) {
    case LOAD_ARCHIVED_FILES_LIST_RESPONSE:
      return cloneDeep(action.payload);
    default:
      return state;
  }
};
