import { SC_STATUS } from '../../../helper/scSheetData';

export const allowEditFields = (isOwner, isReviewer, statuses) => {
  if (isOwner) {
    if (
      !statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED) &&
      (statuses.includes(SC_STATUS.WITHOUT_PR) ||
        statuses.includes(SC_STATUS.WITH_PR))
    ) {
      return true;
    } else {
      return false;
    }
  } else if (isReviewer) {
    if (
      !statuses.includes(SC_STATUS.REVIEWER_SUBMITTED) &&
      (statuses.includes(SC_STATUS.WITHOUT_PR) ||
        statuses.includes(SC_STATUS.WITH_PR))
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
