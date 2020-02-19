import { SC_STATUS } from '../../../helper/scSheetData';
import { exportToPdf } from '../../../calls/sc';
import {
  FILE_NAME_DATE_FORMAT,
  formatLocaleDateTime
} from '../../../helper/date';

export const allowEditFields = (isOwner, isReviewer, statuses) => {
  if (isOwner) {
    if (
      (!statuses.includes(SC_STATUS.CLOSED) ||
        !statuses.includes(SC_STATUS.ARCHIVED)) &&
      (statuses.includes(SC_STATUS.WITHOUT_PR) ||
        statuses.includes(SC_STATUS.WITH_PR))
    ) {
      return true;
    } else {
      return false;
    }
  } else if (isReviewer) {
    if (
      (!statuses.includes(SC_STATUS.CLOSED) ||
        !statuses.includes(SC_STATUS.ARCHIVED)) &&
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

export const downloadScAsPdf = (scId, deadline, login, error) => {
  let promise = exportToPdf(scId, error);

  const date = formatLocaleDateTime(deadline, FILE_NAME_DATE_FORMAT);

  promise.then(response => {
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${login}_${date}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  });
};
