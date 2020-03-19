// Replacing "_" with " " and setting only first letter as capital
// Example use: pr occasion
export const modifyString = string => {
  if (string) {
    const replacedStr =
      string.charAt(0).toUpperCase() +
      string
        .slice(1)
        .toLowerCase()
        .replace(/_/g, ' ');
    return replacedStr;
  }
};

export const translateGeneralStatus = status => {
  switch (status) {
    case 'INITIALIZATION':
      return 'sc.phase.preparation';
    case 'IN_PROGRESS':
      return 'sc.phase.inProgress';
    case 'READY_TO_CLOSE':
      return 'sc.phase.ready';
    case 'DONE':
      return 'sc.phase.closed';
    case 'ARCHIVED':
      return 'sc.phase.archived';
    default:
      return 'Unbekannt';
  }
};

export const translateClassification = classification => {
  switch (classification) {
    case 'SPECIALIST':
      return 'sc.classification.specialist';
    case 'SENIOR_EXPERT':
      return 'sc.classification.seniorexpert';
    case 'SENIOR_MANAGEMENT':
      return 'sc.classification.seniormanagement';
    case 'LEAD_EXPERT':
      return 'sc.classification.expert';
    case 'LEAD_MANAGEMENT':
      return 'sc.classification.manager';
    default:
      return 'Unbekannt';
  }
};

export const translateRole = role => {
  switch (role) {
    case 'EMPLOYEE':
      return 'rolemanagement.employee';
    case 'SUPERVISOR':
      return 'rolemanagement.supervisor';
    case 'PERSONAL_DEV':
      return 'rolemanagement.personaldevelopment';
    default:
      return 'rolemanagement.unknown';
  }
};
