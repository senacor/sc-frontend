import { textFieldEnum } from '../helper/textFieldEnum';

class TextFieldService {
  constructor(
    nonActionPerformer = false,
    readOnlyFlag = false,
    isActionPerformer = false,
    openEditing = false,
    readOnlyText = null,
    errorFlag = false,
    writeableText = null,
    closeEditingExplicitly = false
  ) {
    this.nonActionPerformer = nonActionPerformer;
    this.readOnlyFlag = readOnlyFlag;
    this.isActionPerformer = isActionPerformer;
    this.openEditing = openEditing;
    this.readOnlyText = readOnlyText;
    this.errorFlag = errorFlag;
    this.writeableText = writeableText;
    this.closeEditingExplicitly = closeEditingExplicitly;
  }

  setNonActionPerformer = nonActionPerformer => {
    this.nonActionPerformer = nonActionPerformer;
  };
  setReadOnlyFlag = readOnlyFlag => {
    this.readOnlyFlag = readOnlyFlag;
  };
  setIsActionPerformer = isActionPerformer => {
    this.isActionPerformer = isActionPerformer;
  };
  setOpenEditing = openEditing => {
    this.openEditing = openEditing;
  };
  setReadOnlyText = readOnlyText => {
    this.readOnlyText = readOnlyText;
  };
  setErrorFlag = errorFlag => {
    this.errorFlag = errorFlag;
  };
  setWriteableText = writeableText => {
    this.writeableText = writeableText;
  };
  setCloseEditingExplicitly = closeEditingExplicitly => {
    this.closeEditingExplicitly = closeEditingExplicitly;
  };

  execute = () => {
    let {
      nonActionPerformer,
      readOnlyFlag,
      isActionPerformer,
      openEditing,
      readOnlyText,
      errorFlag,
      writeableText,
      closeEditingExplicitly
    } = this;

    if (closeEditingExplicitly && isActionPerformer && !errorFlag) {
      return { state: textFieldEnum.ENABLED, value: writeableText };
    } else if (
      closeEditingExplicitly &&
      isActionPerformer &&
      openEditing &&
      errorFlag &&
      writeableText !== null &&
      writeableText !== ''
    ) {
      return { state: textFieldEnum.ENABLED, value: writeableText };
    } else if (
      isActionPerformer &&
      openEditing &&
      errorFlag &&
      closeEditingExplicitly
    ) {
      return { state: textFieldEnum.ERROR, value: writeableText };
    } else if (nonActionPerformer && !readOnlyFlag) {
      return { state: textFieldEnum.DISABLED, value: '' };
    } else if (isActionPerformer && !openEditing && !readOnlyFlag) {
      return { state: textFieldEnum.DISABLED, value: '' };
    } else if (isActionPerformer && readOnlyFlag && readOnlyText === null) {
      return { state: textFieldEnum.DISABLED, value: '' };
    } else if (nonActionPerformer && readOnlyFlag && readOnlyText === null) {
      return { state: textFieldEnum.DISABLED, value: '' };
    } else if (isActionPerformer && readOnlyFlag && readOnlyText === '') {
      return { state: textFieldEnum.DISABLED, value: '' };
    } else if (nonActionPerformer && readOnlyFlag && readOnlyText === '') {
      return { state: textFieldEnum.DISABLED, value: '' };
    } else if (isActionPerformer && readOnlyFlag) {
      return { state: textFieldEnum.READONLY, value: readOnlyText };
    } else if (nonActionPerformer && readOnlyFlag) {
      return { state: textFieldEnum.READONLY, value: readOnlyText };
    } else if (
      isActionPerformer &&
      openEditing &&
      !readOnlyFlag &&
      errorFlag &&
      writeableText !== null &&
      writeableText !== ''
    ) {
      return { state: textFieldEnum.ENABLED, value: writeableText };
    } else if (isActionPerformer && openEditing && !readOnlyFlag && errorFlag) {
      return { state: textFieldEnum.ERROR, value: writeableText };
    } else if (
      isActionPerformer &&
      openEditing &&
      !readOnlyFlag &&
      !errorFlag
    ) {
      return { state: textFieldEnum.ENABLED, value: writeableText };
    } else {
      return { state: textFieldEnum.DISABLED, value: '' };
    }
  };

  getState = () => {
    return this.execute().state;
  };

  getValue = () => {
    return this.execute().value;
  };
}

export default TextFieldService;
