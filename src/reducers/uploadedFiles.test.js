import {
  RESET_UPLOADED_FILES,
  UPLOAD_FILES_RESPONSE
} from '../helper/dispatchTypes';
import { uploadedFiles } from './uploadedFiles';

describe('uploadedFiles reducer', () => {
  it('should save the state on UPLOAD_FILES_RESPONSE', async () => {
    let stateBefore = ['data1', 'data2'];

    let payload = [
      {
        fileName: '20170212_PeterLustig.xlsx',
        isStored: false
      },
      {
        fileName: '20160901_mbock.xlsx',
        isStored: false
      }
    ];
    const action = {
      type: UPLOAD_FILES_RESPONSE,
      payload: payload
    };
    const stateAfter = uploadedFiles(stateBefore, action);

    expect(stateAfter).toEqual(payload);
  });

  it('should reset the state on RESET_UPLOADED_FILES', async () => {
    let stateBefore = ['data1', 'data2'];

    const action = {
      type: RESET_UPLOADED_FILES
    };
    const stateAfter = uploadedFiles(stateBefore, action);

    expect(stateAfter).toEqual([]);
  });
});
