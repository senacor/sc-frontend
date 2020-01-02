import { SC_STATUS } from '../../helper/scSheetData';

export const determineScRole = (isOwnerSc, isReviewerSc, statuses) => {
  if (isReviewerSc) {
    return determineStatusReviewer(statuses);
  } else if (isOwnerSc) {
    return determineStatusOwner(statuses);
  }
};

const determineStatusOwner = statuses => {
  let statusTextId = '';
  if (
    !statuses.includes(SC_STATUS.WITHOUT_PR) &&
    !statuses.includes(SC_STATUS.WITH_PR)
  ) {
    statusTextId = 'sc.status.scTypeWaiting';
  } else if (
    (statuses.includes(SC_STATUS.WITH_PR) ||
      statuses.includes(SC_STATUS.WITHOUT_PR)) &&
    !statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)
  ) {
    statusTextId = 'sc.status.pleaseSubmit';
  } else if (
    (statuses.includes(SC_STATUS.WITH_PR) ||
      statuses.includes(SC_STATUS.WITHOUT_PR)) &&
    statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED) &&
    !statuses.includes(SC_STATUS.REVIEWER_SUBMITTED)
  ) {
    statusTextId = 'sc.status.waitForReviewer';
  } else if (
    statuses.includes(SC_STATUS.REVIEWER_SUBMITTED) &&
    statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)
  ) {
    statusTextId = 'sc.status.processDone';
  }
  return statusTextId;
};

const determineStatusReviewer = statuses => {
  let statusTextId = '';
  if (
    !statuses.includes(SC_STATUS.WITHOUT_PR) &&
    !statuses.includes(SC_STATUS.WITH_PR)
  ) {
    statusTextId = 'sc.status.chooseScType';
  } else if (
    (statuses.includes(SC_STATUS.WITH_PR) ||
      statuses.includes(SC_STATUS.WITHOUT_PR)) &&
    !statuses.includes(SC_STATUS.REVIEWER_SUBMITTED)
  ) {
    statusTextId = 'sc.status.pleaseSubmit';
  } else if (
    (statuses.includes(SC_STATUS.WITH_PR) ||
      statuses.includes(SC_STATUS.WITHOUT_PR)) &&
    statuses.includes(SC_STATUS.REVIEWER_SUBMITTED) &&
    !statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)
  ) {
    statusTextId = 'sc.status.waitForEmployee';
  } else if (
    statuses.includes(SC_STATUS.REVIEWER_SUBMITTED) &&
    statuses.includes(SC_STATUS.EMPLOYEE_SUBMITTED)) {
    statusTextId = 'sc.status.processDone';
  }
  return statusTextId;
};
