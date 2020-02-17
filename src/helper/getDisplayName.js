function getDisplayName(employee) {
  if (employee) {
    return `${employee.lastName}, ${employee.firstName}`;
  }
}

export default getDisplayName;
