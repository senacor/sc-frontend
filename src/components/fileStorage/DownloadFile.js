import React from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import * as actions from '../../actions';
import { getDownloadedFile } from '../../reducers/selector';
import { connect } from 'react-redux';

export class DownloadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: props.employeeId,
      fileId: props.fileId
    };
  }

  handleClick = (employeeId, fileId) => () => {
    this.props.downloadFile(employeeId, fileId);
  };

  checkDownloadFile(file) {
    let { employeeId, fileId } = this.state;
    return file.id && file.employeeId === employeeId && file.fileId === fileId;
  }
  render() {
    let { employeeId, fileId } = this.state;

    if (this.checkDownloadFile(this.props.downloadedFile)) {
      this.props.resetDownloadedFile();
      window.open(this.props.downloadedFile.url);
    }

    return (
      <IconButton onClick={this.handleClick(employeeId, fileId)}>
        <Icon>get_app</Icon>
      </IconButton>
    );
  }
}

export default connect(
  state => ({
    downloadedFile: getDownloadedFile(state)
  }),
  {
    downloadFile: actions.downloadFile,
    resetDownloadedFile: actions.resetDownloadedFile
  }
)(DownloadFile);
