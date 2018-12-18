import {
  DOWNLOAD_ALL_FILES_INFORMATION_RESPONSE,
  DOWNLOAD_FILES_INFORMATION_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const archivedFiles = (state = [], action) => {
  switch (action.type) {
    case DOWNLOAD_FILES_INFORMATION_RESPONSE:
      return cloneDeep(action.payload);
    case DOWNLOAD_ALL_FILES_INFORMATION_RESPONSE:
      return cloneDeep(action.payload);
    default:
      return state;
  }
};
