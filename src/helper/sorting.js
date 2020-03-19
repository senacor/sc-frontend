import { translateGeneralStatus } from './string';

export const sortBySortActive = (data, sortActive, sortDirection, intl) => {
  const sortsForFields = {
    byStringField: (a, b, field) => {
      const collator = new Intl.Collator('de');
      return collator.compare(a[field], b[field]) < 0
        ? -1
        : collator.compare(a[field], b[field]) > 0
        ? 1
        : 0;
    },
    byNumberField: (a, b, field) => {
      const numberA = a[field];
      const numberB = b[field];
      return numberA < numberB ? -1 : numberA > numberB ? 1 : 0;
    },
    byDateField: (a, b, field) => {
      const dateA = a[field];
      const dateB = b[field];
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    byDateTimeField: (a, b, field) => {
      const dateA = a[field];
      const dateB = b[field];
      const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
      const result3 =
        dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
      const result2 =
        dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
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
      return sortsForFields.byStringField(a, b, 'position');
    },
    supervisor: (a, b) => {
      return sortsForFields.byStringField(a, b, 'supervisor');
    },
    department: (a, b) => {
      return sortsForFields.byStringField(a, b, 'department');
    },
    office: (a, b) => {
      return sortsForFields.byStringField(a, b, 'office');
    },
    createdDate: (a, b) => {
      return sortsForFields.byDateField(a, b, 'createdDate');
    },
    statusStartTime: (a, b) => {
      return sortsForFields.byDateField(a, b, 'statusStartTime');
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
      return sortsForFields.byStringField(a, b, 'officeLocation');
    },
    entryDate: (a, b) => {
      return sortsForFields.byDateField(a, b, 'entryDate');
    },
    supervisorName: (a, b) => {
      return sortsForFields.byStringField(a, b, 'supervisorName');
    },
    endDate: (a, b) => {
      return sortsForFields.byDateField(a, b, 'endDate');
    },
    scStatus: (a, b) => {
      const statusA = intl.formatMessage({
        id: translateGeneralStatus(a.scStatus)
      });
      const statusB = intl.formatMessage({
        id: translateGeneralStatus(b.scStatus)
      });
      return statusA < statusB ? -1 : statusA > statusB ? 1 : 0;
    },
    roles: (a, b) => {
      const roleA = a.roles[0];
      const roleB = b.roles[0];
      if (!roleA) {
        return 1;
      }
      if (!roleB) {
        return -1;
      }
      return roleA < roleB ? -1 : roleA > roleB ? 1 : 0;
    },
    periodName: (a, b) => {
      return sortsForFields.byDateField(a, b, 'createdDate');
    },
    createdDateTime: (a, b) => {
      return sortsForFields.byDateTimeField(a, b, 'createdDateTime');
    },
    periodNameDialog: (a, b) => {
      return sortsForFields.byDateTimeField(a, b, 'createdDateTime');
    },
    deadline: (a, b) => {
      return sortsForFields.byDateField(a, b, 'deadline');
    },
    classification: (a, b) => {
      return sortsForFields.byStringField(a, b, 'classification');
    },
    finalScore: (a, b) => {
      return sortsForFields.byNumberField(a, b, 'finalScore');
    }
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
