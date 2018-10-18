import { textFieldsInPrSheetService } from './textFieldsInPrSheetService';
import { textFieldEnum } from '../helper/textFieldEnum';

describe(
  'textFields in PrSheet Service which is textFieldsInPrSheetService = (\n' +
    '  nonActionPerformer = false,\n' +
    '  readOnlyFlag = false,\n' +
    '  isActionPerformer = false,\n' +
    '  openEditing = false,\n' +
    '  readOnlyText = null,\n' +
    '  errorFlag = false,\n' +
    '  writeableText = null\n' +
    ')',
  () => {
    let isActionPerformer = true;
    let nonActionPerformer = true;
    let readOnly = true;
    let openEditing = true;
    let emptyText = '';
    let nullEntry = null;
    let commentText = 'this is not zero';
    let errorFlag = true;

    it('should be disabled for Non-ActionPerformer if it is not released as read-only', () => {
      expect(
        textFieldsInPrSheetService(
          nonActionPerformer,
          !readOnly,
          false,
          false,
          null,
          false,
          null
        )
      ).toEqual({
        state: textFieldEnum.DISABLED,
        value: ''
      });
    });

    it('should be disabled for ActionPerformer before editing is enabled', () => {
      expect(
        textFieldsInPrSheetService(
          false,
          false,
          isActionPerformer,
          !openEditing,
          null,
          false,
          null
        )
      ).toEqual({
        state: textFieldEnum.DISABLED,
        value: ''
      });
    });

    it('should be disabled for ActionPerformer when it is released as read-only, but there is no entry', () => {
      expect(
        textFieldsInPrSheetService(
          false,
          readOnly,
          isActionPerformer,
          false,
          emptyText,
          false,
          null
        )
      ).toEqual({
        state: textFieldEnum.DISABLED,
        value: ''
      });
    });

    it('should be disabled for nonActionPerformer when it is released as read-only, but there is a null-entry', () => {
      expect(
        textFieldsInPrSheetService(
          nonActionPerformer,
          readOnly,
          false,
          false,
          nullEntry,
          false,
          null
        )
      ).toEqual({
        state: textFieldEnum.DISABLED,
        value: ''
      });
    });

    it('should be in read-only-mode for ActionPerformer when it is released as read-only and the entry is non-zero', () => {
      expect(
        textFieldsInPrSheetService(
          false,
          readOnly,
          isActionPerformer,
          false,
          commentText,
          false,
          null
        )
      ).toEqual({
        state: textFieldEnum.READONLY,
        value: commentText
      });
    });

    it('should be in read-only-mode for nonActionPerformer when it is released as read-only and the entry is non-zero', () => {
      expect(
        textFieldsInPrSheetService(
          nonActionPerformer,
          readOnly,
          false,
          false,
          commentText,
          false,
          null
        )
      ).toEqual({
        state: textFieldEnum.READONLY,
        value: commentText
      });
    });

    it('should be in error-mode for ActionPerformer when it has an errorFlag and there is no entry', () => {
      expect(
        textFieldsInPrSheetService(
          false,
          false,
          isActionPerformer,
          openEditing,
          null,
          errorFlag,
          emptyText
        )
      ).toEqual({
        state: textFieldEnum.ERROR,
        value: ''
      });
    });

    it('should not be in error-mode but in standard enabled mode for ActionPerformer when it has an errorFlag and there is an entry', () => {
      expect(
        textFieldsInPrSheetService(
          false,
          false,
          isActionPerformer,
          openEditing,
          null,
          errorFlag,
          commentText
        )
      ).toEqual({
        state: textFieldEnum.ENABLED,
        value: commentText
      });
    });

    it('should be in standard enabled mode for ActionPerformer when editing is open and it is not released as read-only', () => {
      expect(
        textFieldsInPrSheetService(
          false,
          !readOnly,
          isActionPerformer,
          openEditing,
          null,
          false,
          commentText
        )
      ).toEqual({
        state: textFieldEnum.ENABLED,
        value: commentText
      });
    });
  }
);
