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
    case "INITIALIZATION":
      return "sc.phase.preparation";
    case "IN_PROGRESS":
      return "sc.phase.inProgress";
    case "READY_TO_CLOSE":
      return "sc.phase.ready";
    case "DONE":
      return "sc.phase.closed";
    case "ARCHIVED":
      return "sc.phase.archived";
    default: return "Unbekannt";
  }
};
