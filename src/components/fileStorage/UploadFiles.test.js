import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { StyledComponent as UploadFiles } from './UploadFiles';

describe('UploadFiles Component', () => {
  let shallow = createShallow({ dive: true });

  it('should match snapshot without loading', () => {
    let component = shallow(
      <UploadFiles uploadedFiles={[]} isLoading={false} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should match snapshot with loading', () => {
    let component = shallow(
      <UploadFiles uploadedFiles={[]} isLoading={true} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should match snapshot with uploadedFiles', () => {
    let uploadedFiles = [
      {
        fileName: '20170213_PeterLustig.xlsx',
        isStored: false
      },
      {
        fileName: '20170926_mbock.xlsx',
        isStored: false
      }
    ];
    let component = shallow(
      <UploadFiles uploadedFiles={uploadedFiles} isLoading={false} />
    );

    expect(component).toMatchSnapshot();
  });

  it('should send upload', () => {
    let uploadMock = jest.fn();
    let resetUploadedMock = jest.fn();

    let component = shallow(
      <UploadFiles
        uploadedFiles={[]}
        isLoading={false}
        uploadFiles={uploadMock}
        resetUploadedFiles={resetUploadedMock}
      />
    );

    let event = {
      target: {
        files: ['file1', 'file2']
      }
    };
    component.instance().handleChange(event);

    expect(uploadMock).toHaveBeenCalledTimes(1);
    expect(uploadMock).toHaveBeenCalledWith(['file1', 'file2']);
  });

  it('should send resetUploadedFiles', () => {
    let uploadMock = jest.fn();
    let resetUploadedMock = jest.fn();

    let component = shallow(
      <UploadFiles
        uploadedFiles={[]}
        isLoading={false}
        uploadFiles={uploadMock}
        resetUploadedFiles={resetUploadedMock}
      />
    );

    component.instance().handleClose();

    expect(resetUploadedMock).toHaveBeenCalledTimes(1);
    expect(resetUploadedMock).toHaveBeenCalledWith();
  });
});
