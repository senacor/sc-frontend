import {
  RESET_UPLOADED_FILES,
  UPLOAD_FILES_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const uploadedFiles = (state = [], action) => {
  switch (action.type) {
    case UPLOAD_FILES_RESPONSE:
      return cloneDeep(action.payload);
    case RESET_UPLOADED_FILES:
      return [];
    default:
      return state;
  }
};
