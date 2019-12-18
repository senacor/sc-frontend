import { SC_STATUS } from '../../../helper/scSheetData';
import { exportToPdf } from '../../../calls/sc';

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

export const downloadScPdf = (scId, error) => {
  let promise = exportToPdf(scId, error);

  promise.then(response => {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ScoreCard.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });
};
