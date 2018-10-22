function getDisplayName(employee) {
  if (employee) {
    return `${employee.firstName} ${employee.lastName}`;
  }
}

export default getDisplayName;
