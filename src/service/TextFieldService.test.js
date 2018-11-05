import TextFieldService from './TextFieldService';
import { textFieldEnum } from '../helper/textFieldEnum';

describe('textField Service', () => {
  let isActionPerformer = true;
  let nonActionPerformer = true;
  let readOnly = true;
  let openEditing = true;
  let emptyText = '';
  let nullEntry = null;
  let commentText = 'this is not zero';
  let errorFlag = true;

  it('should be disabled for Non-ActionPerformer if it is not released as read-only', () => {
    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setReadOnlyFlag(!readOnly);
    expect(service.execute()).toEqual({
      state: textFieldEnum.DISABLED,
      value: ''
    });
  });

  it('should be disabled for ActionPerformer before editing is enabled', () => {
    let service = new TextFieldService();
    service.setIsActionPerformer(isActionPerformer);
    service.setOpenEditing(!openEditing);
    expect(service.execute()).toEqual({
      state: textFieldEnum.DISABLED,
      value: ''
    });
  });

  it('should be disabled for ActionPerformer when it is released as read-only, but there is no entry', () => {
    let service = new TextFieldService();
    service.setIsActionPerformer(isActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setReadOnlyText(emptyText);
    expect(service.execute()).toEqual({
      state: textFieldEnum.DISABLED,
      value: ''
    });
  });

  it('should be disabled for nonActionPerformer when it is released as read-only, but there is a null-entry', () => {
    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setReadOnlyText(nullEntry);
    expect(service.execute()).toEqual({
      state: textFieldEnum.DISABLED,
      value: ''
    });
  });

  it('should be in read-only-mode for ActionPerformer when it is released as read-only and the entry is non-zero', () => {
    let service = new TextFieldService();
    service.setIsActionPerformer(isActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setReadOnlyText(commentText);
    expect(service.execute()).toEqual({
      state: textFieldEnum.READONLY,
      value: commentText
    });
  });

  it('should be in read-only-mode for nonActionPerformer when it is released as read-only and the entry is non-zero', () => {
    let service = new TextFieldService();
    service.setNonActionPerformer(nonActionPerformer);
    service.setReadOnlyFlag(readOnly);
    service.setReadOnlyText(commentText);
    expect(service.execute()).toEqual({
      state: textFieldEnum.READONLY,
      value: commentText
    });
  });

  it('should be in error-mode for ActionPerformer when it has an errorFlag and there is no entry', () => {
    let service = new TextFieldService();
    service.setIsActionPerformer(isActionPerformer);
    service.setErrorFlag(errorFlag);
    service.setOpenEditing(openEditing);
    service.setWriteableText(emptyText);
    expect(service.execute()).toEqual({
      state: textFieldEnum.ERROR,
      value: ''
    });
  });

  it('should not be in error-mode but in standard enabled mode for ActionPerformer when it has an errorFlag and there is an entry', () => {
    let service = new TextFieldService();
    service.setIsActionPerformer(isActionPerformer);
    service.setErrorFlag(errorFlag);
    service.setOpenEditing(openEditing);
    service.setWriteableText(commentText);
    expect(service.execute()).toEqual({
      state: textFieldEnum.ENABLED,
      value: commentText
    });
  });

  it('should be in standard enabled mode for ActionPerformer when editing is open and it is not released as read-only', () => {
    let service = new TextFieldService();
    service.setIsActionPerformer(isActionPerformer);
    service.setOpenEditing(openEditing);
    service.setWriteableText(commentText);
    service.setReadOnlyFlag(!readOnly);
    expect(service.execute()).toEqual({
      state: textFieldEnum.ENABLED,
      value: commentText
    });
  });
});
