import { textFieldEnum } from '../helper/textFieldEnum';

export const textFieldsInPrSheetService = (
  nonActionPerformer = false,
  readOnlyFlag = false,
  isActionPerformer = false,
  openEditing = false,
  readOnlyText = null,
  errorFlag = false,
  writeableText = null
) => {
  if (nonActionPerformer && !readOnlyFlag) {
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
  } else if (isActionPerformer && openEditing && !readOnlyFlag && !errorFlag) {
    return { state: textFieldEnum.ENABLED, value: writeableText };
  } else {
    return { state: textFieldEnum.DISABLED, value: '' };
  }
};
