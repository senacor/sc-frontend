import moment from 'moment';
import { translateGeneralStatus } from './string';

const isEqual = require('lodash/isEqual');

export const sortByLastName = (data, sortDirection) => {
  if (sortDirection === 'asc') {
    data.sort((a, b) => {
      const lastNameA = a.lastName;
      const lastNameB = b.lastName;
      if (lastNameA < lastNameB) {
        return -1;
      } else if (lastNameA > lastNameB) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    // sortDirection === 'desc'
    data.sort((a, b) => {
      const lastNameA = a.lastName;
      const lastNameB = b.lastName;
      if (lastNameA < lastNameB) {
        return 1;
      } else if (lastNameA > lastNameB) {
        return -1;
      } else {
        return 0;
      }
    });
  }
};

export const sortEmployeeByLastNameOrRoles = (
  data,
  sortActive,
  sortDirection
) => {
  const sortsForFields = {
    lastName: (a, b) => {
      return a['lastName'] < b['lastName']
        ? -1
        : a['lastName'] > b['lastName']
        ? 1
        : 0;
    },
    roles: (a, b) => {
      const aRolesArray = a.roles;
      const bRolesArray = b.roles;
      if (!aRolesArray || !aRolesArray[0]) {
        return -1;
      }
      return aRolesArray[0] < bRolesArray[0]
        ? -1
        : aRolesArray[0] > bRolesArray[0]
        ? 1
        : 0;
    }
  };

  const sortBy = sortActive.lastName ? 'lastName' : 'roles';

  let missingProperties;
  let withProperties;
  if (sortBy === 'lastName') {
    missingProperties = data.filter(a => !a['lastName']);
    withProperties = data.filter(a => a['lastName']);
  } else {
    missingProperties = data.filter(a => !a['roles'] || a['roles'].length < 1);
    withProperties = data.filter(a => a['roles'] && a['roles'].length > 0);
  }

  if (sortBy) {
    withProperties.sort(sortsForFields[sortBy]);
    data = [...withProperties, ...missingProperties];
    if (sortDirection === 'desc') {
      data = data.reverse();
    }
  }
  return data;
};

export const sortEmployeeBySortActive = (
  data,
  sortActive,
  sortDirection,
  intl
) => {
  const sortsForFields = {
    byField: (a, b, field) => {
      return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    },
    lastName: (a, b) => {
      return sortsForFields.byField(a, b, 'lastName');
    },
    position: (a, b) => {
      return sortsForFields.byField(a, b, 'position');
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
    supervisorName: (a, b) => {
      return sortsForFields.byField(a, b, 'supervisorName');
    },
    department: (a, b) => {
      return sortsForFields.byField(a, b, 'department');
    },
    officeLocation: (a, b) => {
      return sortsForFields.byField(a, b, 'officeLocation');
    },
    roles: (a, b) => {
      const aRolesArray = a.roles;
      const bRolesArray = b.roles;
      if (!aRolesArray || !aRolesArray[0]) {
        return -1;
      }
      return aRolesArray[0] < bRolesArray[0]
        ? -1
        : aRolesArray[0] > bRolesArray[0]
        ? 1
        : 0;
    },
    endDate: (a, b) => {
      const dateA = a.endDate;
      const dateB = b.endDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    entryDate: (a, b) => {
      const dateA = a.entryDate;
      const dateB = b.entryDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
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

export const sortBySortActive = (data, sortActive, sortDirection) => {
  const sortsForFields = {
    byField: (a, b, field) => {
      return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    },
    department: (a, b) => {
      return sortsForFields.byField(a, b, 'department');
    },
    office: (a, b) => {
      return sortsForFields.byField(a, b, 'office');
    },
    officeLocation: (a, b) => {
      return sortsForFields.byField(a, b, 'officeLocation');
    },
    status: (a, b) => {
      return sortsForFields.byField(a, b, 'inProgress');
    },
    employee: (a, b) => {
      return sortsForFields.byField(a, b, 'employeeLastName');
    },
    employeeName: (a, b) => {
      return sortsForFields.byField(a, b, 'lastName');
    },
    lastName: (a, b) => {
      return sortsForFields.byField(a, b, 'lastName');
    },
    employeeLastName: (a, b) => {
      return sortsForFields.byField(a, b, 'employeeLastName');
    },
    position: (a, b) => {
      return sortsForFields.byField(a, b, 'position');
    },
    scposition: (a, b) => {
      return sortsForFields.byField(a, b, 'employeePosition');
    },
    occasion: (a, b) => {
      return sortsForFields.byField(a, b, 'occasion');
    },
    currentStatus: (a, b) => {
      return sortsForFields.byField(a, b, 'scStatus');
    },
    supervisor: (a, b) => {
      const aValue = a.supervisor;
      const bValue = b.supervisor;
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    },
    supervisorName: (a, b) => {
      const aValue = a.supervisorName;
      const bValue = b.supervisorName;
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    },
    date: (a, b) => {
      const dateA = a.startDate;
      const dateB = b.startDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    createdDate: (a, b) => {
      const dateA = a.createdDate;
      const dateB = b.createdDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    createdDateTime: (a, b) => {
      const dateA = a.createdDateTime;
      const dateB = b.createdDateTime;
      const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
      const result3 =
        dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
      const result2 =
        dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    periodName: (a, b) => {
      const dateA = a.createdDateTime;
      const dateB = b.createdDateTime;
      const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
      const result3 =
        dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
      const result2 =
        dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    periodNameCD: (a, b) => {
      const dateA = a.createdDateTime;
      const dateB = b.createdDateTime;
      const result4 = dateA[4] < dateB[4] ? -1 : dateA[4] > dateB[4] ? 1 : 0;
      const result3 =
        dateA[3] < dateB[3] ? -1 : dateA[3] > dateB[3] ? 1 : result4;
      const result2 =
        dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : result3;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    deadline: (a, b) => {
      const dateA = a.deadline;
      const dateB = b.deadline;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    scStart: (a, b) => {
      const dateA = a.createdDate;
      const dateB = b.createdDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    classification: (a, b) => {
      return sortsForFields.byField(a, b, 'classification');
    },
    finalScore: (a, b) => {
      return sortsForFields.byField(a, b, 'finalScore');
    },
    scStatus: (a, b) => {
      return sortsForFields.byField(a, b, 'status');
    },
    scStatusStartTime: (a, b) => {
      const dateA = a.statusStartTime;
      const dateB = b.statusStartTime;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    endDate: (a, b) => {
      const dateA = a.endDate;
      const dateB = b.endDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
    },
    entryDate: (a, b) => {
      const dateA = a.entryDate;
      const dateB = b.entryDate;
      const result2 = dateA[2] < dateB[2] ? -1 : dateA[2] > dateB[2] ? 1 : 0;
      const result1 =
        dateA[1] < dateB[1] ? -1 : dateA[1] > dateB[1] ? 1 : result2;
      return dateA[0] < dateB[0] ? -1 : dateA[0] > dateB[0] ? 1 : result1;
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

export const handleFilterActive = filterInputs => {
  const compareObjWith = { ...filterInputs };

  const emptyInputs = {
    department: [],
    month: [],
    officeLocation: [],
    position: [],
    scStatus: [],
    searchEmployee: '',
    searchSupervisor: '',
    year: []
  };
  const emptyInputsFormerEmployee = {
    department: [],
    month: [],
    officeLocation: [],
    position: [],
    searchEmployee: '',
    year: []
  };
  if ('scStatus' in filterInputs) {
    return !isEqual(compareObjWith, emptyInputs);
  }
  return !isEqual(compareObjWith, emptyInputsFormerEmployee);
};

export const handleProgressFilterActive = (filterInputs, setFilterActive) => {
  const emptyInputs = {
    searchEmployee: '',
    supervisor: '',
    date: '',
    position: [],
    occasion: []
  };
  if (JSON.stringify(emptyInputs) === JSON.stringify(filterInputs)) {
    setFilterActive(false);
  } else {
    setFilterActive(true);
  }
};

export const handleScProgressFilterActive = (filterInputs, setFilterActive) => {
  const emptyInputs = {
    searchEmployee: '',
    searchSupervisor: '',
    department: [],
    position: [],
    office: [],
    status: []
  };
  if (JSON.stringify(emptyInputs) === JSON.stringify(filterInputs)) {
    setFilterActive(false);
  } else {
    setFilterActive(true);
  }
};

export const checkFilterValues = (filterData, userData) => {
  if (filterData.length > 0 && Array.isArray(filterData)) {
    const filterDataLowerCase = filterData.map(item => {
      if (typeof item === 'string') {
        return item.toLowerCase();
      } else {
        return item;
      }
    });
    if (typeof userData === 'string') {
      return filterDataLowerCase.includes(userData.toLowerCase());
    } else {
      return filterDataLowerCase.includes(userData);
    }
  } else if (filterData !== '' && typeof filterData === 'string') {
    return userData
      ? userData
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(filterData.toLowerCase())
      : false;
  } else {
    return true;
  }
};

export const years = () => {
  let years = [];
  const currentYear = moment().year();
  for (let i = currentYear; i >= 1999; i--) {
    years.push(i);
  }
  return years;
};

export const months = () => {
  let months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  return months;
};
