import {
  DOWNLOAD_FILE_RESPONSE,
  RESET_DOWNLOADED_FILE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const downloadedFile = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_FILE_RESPONSE:
      return cloneDeep(action.payload);
    case RESET_DOWNLOADED_FILE:
      return {};
    default:
      return state;
  }
};
