import { SC_STATUS } from '../../../helper/scSheetData';

export const allowEditFields = (isOwner, isReviewer, statuses) => {
  if (isOwner) {
    if (!statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)) {
      return true;
    } else {
      return false;
    }
  } else if (isReviewer) {
    if (!statuses.includes(SC_STATUS.REVIEWER_SUBMITTED)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
