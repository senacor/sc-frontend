export const sortBySortActive = (data, sortActive, sortDirection) => {
  const sortsForFields = {
    byField: (a, b, field) => {
      const collator = new Intl.Collator('de');
      return collator.compare(a[field], b[field]) < 0
        ? -1
        : collator.compare(a[field], b[field]) > 0
        ? 1
        : 0;
    },

    employeeLastName: (a, b) => {
      const collator = new Intl.Collator('de');
      if (collator.compare(a.employeeLastName, b.employeeLastName) < 0) {
        return -1;
      } else if (collator.compare(a.employeeLastName, b.employeeLastName) > 0) {
        return 1;
      } else {
        if (collator.compare(a.employeeFirstName, b.employeeFirstName) < 0) {
          return -1;
        } else if (
          collator.compare(a.employeeFirstName, b.employeeFirstName) > 0
        ) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    position: (a, b) => {
      return sortsForFields.byField(a, b, 'position');
    },
    supervisor: (a, b) => {
      return sortsForFields.byField(a, b, 'supervisor');
    },
    department: (a, b) => {
      return sortsForFields.byField(a, b, 'department');
    },
    office: (a, b) => {
      return sortsForFields.byField(a, b, 'office');
    },
    createdDate: (a, b) => {
      const dateA = a.createdDate;
      const dateB = b.createdDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    statusStartTime: (a, b) => {
      const dateA = a.statusStartTime;
      const dateB = b.statusStartTime;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    lastName: (a, b) => {
      const collator = new Intl.Collator('de');
      if (collator.compare(a.lastName, b.lastName) < 0) {
        return -1;
      } else if (collator.compare(a.lastName, b.lastName) > 0) {
        return 1;
      } else {
        if (collator.compare(a.firstName, b.firstName) < 0) {
          return -1;
        } else if (collator.compare(a.firstName, b.firstName) > 0) {
          return 1;
        } else {
          return 0;
        }
      }
    },
    officeLocation: (a, b) => {
      return sortsForFields.byField(a, b, 'officeLocation');
    },
    entryDate: (a, b) => {
      const dateA = a.entryDate;
      const dateB = b.entryDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    }

    // department: (a, b) => {
    //   return sortsForFields.byField(a, b, 'department');
    // },
    // office: (a, b) => {
    //   return sortsForFields.byField(a, b, 'office');
    // },
    // officeLocation: (a, b) => {
    //   return sortsForFields.byField(a, b, 'officeLocation');
    // },
    // status: (a, b) => {
    //   return sortsForFields.byField(a, b, 'inProgress');
    // },
    // employee: (a, b) => {
    //   return sortsForFields.byField(a, b, 'employeeLastName');
    // },
    // employeeName: (a, b) => {
    //   return sortsForFields.byField(a, b, 'lastName');
    // },
    // lastName: (a, b) => {
    //   return sortsForFields.byField(a, b, 'lastName');
    // },
    // employeeLastName: (a, b) => {
    //   return sortsForFields.byField(a, b, 'employeeLastName');
    // },
    // position: (a, b) => {
    //   return sortsForFields.byField(a, b, 'position');
    // },
    // scposition: (a, b) => {
    //   return sortsForFields.byField(a, b, 'employeePosition');
    // },
    // occasion: (a, b) => {
    //   return sortsForFields.byField(a, b, 'occasion');
    // },
    // currentStatus: (a, b) => {
    //   return sortsForFields.byField(a, b, 'scStatus');
    // },
    // supervisor: (a, b) => {
    //   return sortsForFields.byField(a, b, 'supervisor');
    // },
    // supervisorName: (a, b) => {
    //   return sortsForFields.byField(a, b, 'supervisorName');
    // },
    // date: (a, b) => {
    //   const dateA = a.startDate;
    //   const dateB = b.startDate;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // createdDate: (a, b) => {
    //   const dateA = a.createdDate;
    //   const dateB = b.createdDate;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // createdDateTime: (a, b) => {
    //   const dateA = a.createdDateTime;
    //   const dateB = b.createdDateTime;
    //   const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
    //   const result3 =
    //     dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
    //   const result2 =
    //     dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // periodName: (a, b) => {
    //   const dateA = a.createdDateTime;
    //   const dateB = b.createdDateTime;
    //   const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
    //   const result3 =
    //     dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
    //   const result2 =
    //     dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // periodNameCD: (a, b) => {
    //   const dateA = a.createdDateTime;
    //   const dateB = b.createdDateTime;
    //   const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
    //   const result3 =
    //     dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
    //   const result2 =
    //     dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // deadline: (a, b) => {
    //   const dateA = a.deadline;
    //   const dateB = b.deadline;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // scStart: (a, b) => {
    //   const dateA = a.createdDate;
    //   const dateB = b.createdDate;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // classification: (a, b) => {
    //   return sortsForFields.byField(a, b, 'classification');
    // },
    // finalScore: (a, b) => {
    //   return sortsForFields.byField(a, b, 'finalScore');
    // },
    // scStatus: (a, b) => {
    //   return sortsForFields.byField(a, b, 'status');
    // },
    // scStatusStartTime: (a, b) => {
    //   const dateA = a.statusStartTime;
    //   const dateB = b.statusStartTime;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // endDate: (a, b) => {
    //   const dateA = a.endDate;
    //   const dateB = b.endDate;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // entryDate: (a, b) => {
    //   const dateA = a.entryDate;
    //   const dateB = b.entryDate;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // },
    // statusStartTime: (a, b) => {
    //   const dateA = a.statusStartTime;
    //   const dateB = b.statusStartTime;
    //   const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
    //   const result1 =
    //     dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
    //   return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    // }
  };

  let sortBy = null;
  for (let key in sortActive) {
    if (sortActive[key]) {
      sortBy = key;
      break;
    }
  }
  const missingProperties = data.filter(a => !a[sortBy]);
  let withProperties = data.filter(a => a[sortBy]);

  if (sortBy) {
    withProperties.sort(sortsForFields[sortBy]);

    data = [...withProperties, ...missingProperties];
    if (sortDirection === 'desc') {
      data = data.reverse();
    }
  }
  return data;
};
