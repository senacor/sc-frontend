import { LOAD_ARCHIVED_FILES_LIST_RESPONSE } from '../helper/dispatchTypes';
import { archivedFiles } from './archivedFiles';

describe('archivedFiles reducer', () => {
  it('should save the state on LOAD_ARCHIVED_FILES_LIST_RESPONSE', async () => {
    let stateBefore = ['data1', 'data2'];

    let payload = [
      {
        date: '2017-11-11',
        fileName: '20171111_test.pr.mitarbeiter1.xlsx',
        firstName: 'Michaela',
        id: 15,
        lastName: 'Mitarbeiterin',
        url: 'https://url_15.com'
      },
      {
        date: '2018-01-01',
        fileName: '20180101_test.pr.mitarbeiter1.xlsx',
        firstName: 'Michaela',
        id: 23,
        lastName: 'Mitarbeiterin',
        url: 'https://url_23.com'
      }
    ];
    const action = {
      type: LOAD_ARCHIVED_FILES_LIST_RESPONSE,
      payload: payload
    };
    const stateAfter = archivedFiles(stateBefore, action);

    expect(stateAfter).toEqual(payload);
  });
});
