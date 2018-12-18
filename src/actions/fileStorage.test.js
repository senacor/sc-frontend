import fetchMock from 'fetch-mock';
import {
  DOWNLOAD_ALL_FILES_INFORMATION_REQUEST,
  DOWNLOAD_ALL_FILES_INFORMATION_RESPONSE,
  DOWNLOAD_FILE_REQUEST,
  DOWNLOAD_FILE_RESPONSE,
  DOWNLOAD_FILES_INFORMATION_REQUEST,
  DOWNLOAD_FILES_INFORMATION_RESPONSE,
  RESET_DOWNLOADED_FILE,
  RESET_UPLOADED_FILES,
  UPLOAD_FILES_REQUEST,
  UPLOAD_FILES_RESPONSE
} from '../helper/dispatchTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  downloadAllFilesInformation,
  downloadFile,
  downloadFilesInformation,
  resetDownloadedFile,
  resetUploadedFiles,
  uploadFiles
} from './fileStorage';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// mock file
function MockFile() {}

MockFile.prototype.create = function(name, size, mimeType) {
  name = name || 'mock.txt';
  size = size || 1024;
  mimeType = mimeType || 'plain/txt';

  function range(count) {
    var output = '';
    for (var i = 0; i < count; i++) {
      output += 'a';
    }
    return output;
  }

  var blob = new Blob([range(size)], { type: mimeType });
  blob.lastModifiedDate = new Date();
  blob.name = name;

  return blob;
};

describe('uploadFiles', () => {
  it('should send an upload', async () => {
    function FormDataMock() {
      this.append = jest.fn();
    }
    global.FormData = FormDataMock;

    var files = [
      new MockFile('20180102_mbock.xlsx'),
      new MockFile('20180203_PeterLustig.xlsx')
    ];

    const testData = [
      {
        fileName: '20180102_mbock.xlsx',
        isStored: true
      },
      {
        fileName: '20180203_PeterLustig.xlsx',
        isStored: false
      }
    ];

    fetchMock.postOnce('/api/v1/hr/upload', {
      body: {
        _embedded: {
          fileUploadResponseList: testData
        }
      }
    });
    const store = mockStore();

    await store.dispatch(uploadFiles(files));

    expect(store.getActions()).toEqual([
      {
        type: UPLOAD_FILES_REQUEST
      },
      {
        type: UPLOAD_FILES_RESPONSE,
        payload: testData
      }
    ]);
  });

  it('should reset the store uploadedFiles', async () => {
    const store = mockStore();

    await store.dispatch(resetUploadedFiles());

    expect(store.getActions()).toEqual([
      {
        type: RESET_UPLOADED_FILES
      }
    ]);
  });

  it('should reset the store downloadedFiles', async () => {
    const store = mockStore();

    await store.dispatch(resetDownloadedFile());

    expect(store.getActions()).toEqual([
      {
        type: RESET_DOWNLOADED_FILE
      }
    ]);
  });

  it('should download fileInformation', async () => {
    const testData = [
      {
        id: 15,
        employeeId: 504,
        fileId: 11,
        fileName: '20180102_mbock.xlsx',
        date: '2018-01-02',
        firstName: 'Michaela',
        lastName: 'Bock'
      },
      {
        id: 35,
        employeeId: 504,
        fileId: 31,
        fileName: '20180902_mbock.xlsx',
        date: '2018-09-02',
        firstName: 'Michaela',
        lastName: 'Bock'
      }
    ];

    fetchMock.getOnce('/api/v1/employees/1/archivedPrs', {
      body: {
        _embedded: {
          fileDownloadInformationResponseList: testData
        }
      }
    });
    const store = mockStore();

    await store.dispatch(downloadFilesInformation(1));

    expect(store.getActions()).toEqual([
      {
        type: DOWNLOAD_FILES_INFORMATION_REQUEST
      },
      {
        type: DOWNLOAD_FILES_INFORMATION_RESPONSE,
        payload: testData
      }
    ]);
  });

  it('should download all fileInformations', async () => {
    const testData = [
      {
        id: 15,
        employeeId: 503,
        fileId: 50,
        fileName: '20180102_mbock.xlsx',
        date: '2018-01-02',
        firstName: 'Michaela',
        lastName: 'Bock'
      },
      {
        id: 27,
        employeeId: 504,
        fileId: 11,
        fileName: '20180902_mbock.xlsx',
        date: '2018-09-02',
        firstName: 'Karl',
        lastName: 'Heins'
      }
    ];

    fetchMock.getOnce('/api/v1/hr/download', {
      body: {
        _embedded: {
          fileDownloadInformationResponseList: testData
        }
      }
    });
    const store = mockStore();

    await store.dispatch(downloadAllFilesInformation());

    expect(store.getActions()).toEqual([
      {
        type: DOWNLOAD_ALL_FILES_INFORMATION_REQUEST
      },
      {
        type: DOWNLOAD_ALL_FILES_INFORMATION_RESPONSE,
        payload: testData
      }
    ]);
  });

  it('should download a awsUrl for one File', async () => {
    const testData = [
      {
        id: 15,
        employeeId: 504,
        fileId: 42,
        url: 'https://url1.com'
      }
    ];

    fetchMock.getOnce('/api/v1/employees/504/archivedPrs/42', {
      body: testData
    });
    const store = mockStore();

    await store.dispatch(downloadFile(504, 42));

    expect(store.getActions()).toEqual([
      {
        type: DOWNLOAD_FILE_REQUEST
      },
      {
        type: DOWNLOAD_FILE_RESPONSE,
        payload: testData
      }
    ]);
  });
});
