import { DOWNLOAD_FILE_RESPONSE } from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const downloadedFile = (state = {}, action) => {
  switch (action.type) {
    case DOWNLOAD_FILE_RESPONSE:
      return cloneDeep(action.payload);
    default:
      return state;
  }
};
