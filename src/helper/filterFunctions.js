import moment from 'moment';

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

export const sortEmployeeBySortActive = (data, sortActive, sortDirection) => {
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
      return sortsForFields.byField(a, b, 'scStatus');
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
    position: (a, b) => {
      return sortsForFields.byField(a, b, 'position');
    },
    scposition: (a, b) => {
      return sortsForFields.byField(a, b, 'employeePosition');
    },
    occasion: (a, b) => {
      return sortsForFields.byField(a, b, 'occasion');
    },
    supervisor: (a, b) => {
      const aValue = a.supervisor;
      const bValue = b.supervisor;
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
    }
  };

  let sortBy = null;
  for (let key in sortActive) {
    if (sortActive[key]) {
      sortBy = key;
      break;
    }
  }
  if (sortBy) {
    data.sort(sortsForFields[sortBy]);
    if (sortDirection === 'desc') {
      data = data.reverse();
    }
  }
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
