export const dateFixed = (requiredAttendees, pr) => {
  let fixedDate = false;
  let numberOfRequiredThatHaveNotAnswered = 0;
  if (requiredAttendees[pr.supervisor.login]) {
    numberOfRequiredThatHaveNotAnswered++;
    if (requiredAttendees[pr.supervisor.login].status !== 'UNKNOWN') {
      numberOfRequiredThatHaveNotAnswered--;
    }
  }
  if (requiredAttendees[pr.reviewer.login]) {
    numberOfRequiredThatHaveNotAnswered++;
    if (requiredAttendees[pr.reviewer.login].status !== 'UNKNOWN') {
      numberOfRequiredThatHaveNotAnswered--;
    }
  }
  if (numberOfRequiredThatHaveNotAnswered === 0) {
    fixedDate = true;
  }
  return fixedDate;
};
