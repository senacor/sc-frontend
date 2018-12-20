import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { DownloadFile } from './DownloadFile';

describe('DownloadFile Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot', () => {
    let component = shallow(
      <DownloadFile employeeId={504} fileId={42} downloadedFile={{}} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should not start an download', () => {
    let downloadedFile = {
      id: 21,
      employeeId: 504,
      fileId: 999,
      url: 'https://url.com'
    };
    let resetDownloadedFileMock = jest.fn();
    let openMock = jest.fn();

    global.window = jest.fn();
    global.window.open = openMock;

    shallow(
      <DownloadFile
        employeeId={504}
        fileId={42}
        downloadedFile={downloadedFile}
        resetDownloadedFile={resetDownloadedFileMock}
      />
    );
    expect(resetDownloadedFileMock).toHaveBeenCalledTimes(0);
    expect(openMock).toHaveBeenCalledTimes(0);
  });
});
