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
    status: (a, b) => {
      return sortsForFields.byField(a, b, 'inProgress');
    },
    employee: (a, b) => {
      return sortsForFields.byField(a, b, 'employeeLastName');
    },
    position: (a, b) => {
      return sortsForFields.byField(a, b, 'currentPosition');
    },
    scposition: (a, b) => {
      return sortsForFields.byField(a, b, 'employeePosition');
    },
    occasion: (a, b) => {
      return sortsForFields.byField(a, b, 'occasion');
    },
    supervisor: (a, b) => {
      const aValue = a.supervisor.split(' ')[1];
      const bValue = b.supervisor.split(' ')[1];
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    },
    date: (a, b) => {
      const dateA = a.startDate;
      const dateB = b.startDate;
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

//TODO BACKUP - remove if upper function works correctly
// export const sortBySortActive = (data, sortActive, sortDirection) => {
//   if (sortDirection === 'asc') {
//     if (sortActive.employee) {
//       data.sort((a, b) => {
//         const lastNameA = a.employeeLastName;
//         const lastNameB = b.employeeLastName;
//         if (lastNameA < lastNameB) {
//           return -1;
//         } else if (lastNameA > lastNameB) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//     } else if (sortActive.position) {
//       data.sort((a, b) => {
//         const positionA = a.currentPosition;
//         const positionB = b.currentPosition;
//         if (positionA < positionB) {
//           return -1;
//         } else if (positionA > positionB) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//     } else if (sortActive.supervisor) {
//       data.sort((a, b) => {
//         const supervisorLastNameA = a.supervisor.split(' ')[1];
//         const supervisorLastNameB = b.supervisor.split(' ')[1];
//         if (supervisorLastNameA < supervisorLastNameB) {
//           return -1;
//         } else if (supervisorLastNameA > supervisorLastNameB) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//     } else if (sortActive.date) {
//       data.sort((a, b) => {
//         const dateA = a.startDate;
//         const dateB = b.startDate;
//         if (dateA[0] < dateB[0]) {
//           return -1;
//         } else if (dateA[0] > dateB[0]) {
//           return 1;
//         } else {
//           if (dateA[1] < dateB[1]) {
//             return -1;
//           } else if (dateA[1] > dateB[1]) {
//             return 1;
//           } else {
//             if (dateA[2] < dateB[2]) {
//               return -1;
//             } else if (dateA[2] > dateB[2]) {
//               return 1;
//             } else {
//               return 0;
//             }
//           }
//         }
//       });
//     } else if (sortActive.occasion) {
//       data.sort((a, b) => {
//         const occasionA = a.occasion;
//         const occasionB = b.occasion;
//         if (occasionA < occasionB) {
//           return -1;
//         } else if (occasionA > occasionB) {
//           return 1;
//         } else {
//           return 0;
//         }
//       });
//     }
//   } else if (sortDirection === 'desc') {
//     if (sortActive.employee) {
//       data.sort((a, b) => {
//         const lastNameA = a.employeeLastName;
//         const lastNameB = b.employeeLastName;
//         if (lastNameA < lastNameB) {
//           return 1;
//         } else if (lastNameA > lastNameB) {
//           return -1;
//         } else {
//           return 0;
//         }
//       });
//     } else if (sortActive.position) {
//       data.sort((a, b) => {
//         const positionA = a.currentPosition;
//         const positionB = b.currentPosition;
//         if (positionA < positionB) {
//           return 1;
//         } else if (positionA > positionB) {
//           return -1;
//         } else {
//           return 0;
//         }
//       });
//     } else if (sortActive.supervisor) {
//       data.sort((a, b) => {
//         const supervisorLastNameA = a.supervisor.split(' ')[1];
//         const supervisorLastNameB = b.supervisor.split(' ')[1];
//         if (supervisorLastNameA < supervisorLastNameB) {
//           return 1;
//         } else if (supervisorLastNameA > supervisorLastNameB) {
//           return -1;
//         } else {
//           return 0;
//         }
//       });
//     } else if (sortActive.date) {
//       data.sort((a, b) => {
//         const dateA = a.startDate;
//         const dateB = b.startDate;
//         if (dateA[0] < dateB[0]) {
//           return 1;
//         } else if (dateA[0] > dateB[0]) {
//           return -1;
//         } else {
//           if (dateA[1] < dateB[1]) {
//             return 1;
//           } else if (dateA[1] > dateB[1]) {
//             return -1;
//           } else {
//             if (dateA[2] < dateB[2]) {
//               return 1;
//             } else if (dateA[2] > dateB[2]) {
//               return -1;
//             } else {
//               return 0;
//             }
//           }
//         }
//       });
//     } else if (sortActive.occasion) {
//       data.sort((a, b) => {
//         const occasionA = a.prOccasion;
//         const occasionB = b.prOccasion;
//         if (occasionA < occasionB) {
//           return 1;
//         } else if (occasionA > occasionB) {
//           return -1;
//         } else {
//           return 0;
//         }
//       });
//     }
//   }
// };

export const handleFilterActive = (filterInputs, setFilterActive) => {
  const emptyInputs = {
    searchEmployee: '',
    position: [],
    cc: [],
    cst: [],
    officeLocation: []
  };
  if (JSON.stringify(emptyInputs) === JSON.stringify(filterInputs)) {
    setFilterActive(false);
  } else {
    setFilterActive(true);
  }
};

export const handleFormerFilterActive = (filterInputs, setFilterActive) => {
  const emptyInputs = {
    searchEmployee: '',
    year: [],
    month: [],
    position: [],
    cc: [],
    cst: [],
    officeLocation: []
  };
  if (JSON.stringify(emptyInputs) === JSON.stringify(filterInputs)) {
    setFilterActive(false);
  } else {
    setFilterActive(true);
  }
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
