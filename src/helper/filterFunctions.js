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
  if (sortDirection === 'asc') {
    if (sortActive.employee) {
      data.sort((a, b) => {
        const lastNameA = a.employeeLastName;
        const lastNameB = b.employeeLastName;
        if (lastNameA < lastNameB) {
          return -1;
        } else if (lastNameA > lastNameB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortActive.position) {
      data.sort((a, b) => {
        const positionA = a.currentPosition;
        const positionB = b.currentPosition;
        if (positionA < positionB) {
          return -1;
        } else if (positionA > positionB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortActive.supervisor) {
      data.sort((a, b) => {
        const supervisorLastNameA = a.supervisor.split(' ')[1];
        const supervisorLastNameB = b.supervisor.split(' ')[1];
        if (supervisorLastNameA < supervisorLastNameB) {
          return -1;
        } else if (supervisorLastNameA > supervisorLastNameB) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (sortActive.date) {
      data.sort((a, b) => {
        const dateA = a.startDate;
        const dateB = b.startDate;
        if (dateA[0] < dateB[0]) {
          return -1;
        } else if (dateA[0] > dateB[0]) {
          return 1;
        } else {
          if (dateA[1] < dateB[1]) {
            return -1;
          } else if (dateA[1] > dateB[1]) {
            return 1;
          } else {
            if (dateA[2] < dateB[2]) {
              return -1;
            } else if (dateA[2] > dateB[2]) {
              return 1;
            } else {
              return 0;
            }
          }
        }
      });
    } else if (sortActive.occasion) {
      data.sort((a, b) => {
        const occasionA = a.occasion;
        const occasionB = b.occasion;
        if (occasionA < occasionB) {
          return -1;
        } else if (occasionA > occasionB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  } else if (sortDirection === 'desc') {
    if (sortActive.employee) {
      data.sort((a, b) => {
        const lastNameA = a.employeeLastName;
        const lastNameB = b.employeeLastName;
        if (lastNameA < lastNameB) {
          return 1;
        } else if (lastNameA > lastNameB) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortActive.position) {
      data.sort((a, b) => {
        const positionA = a.currentPosition;
        const positionB = b.currentPosition;
        if (positionA < positionB) {
          return 1;
        } else if (positionA > positionB) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortActive.supervisor) {
      data.sort((a, b) => {
        const supervisorLastNameA = a.supervisor.split(' ')[1];
        const supervisorLastNameB = b.supervisor.split(' ')[1];
        if (supervisorLastNameA < supervisorLastNameB) {
          return 1;
        } else if (supervisorLastNameA > supervisorLastNameB) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortActive.date) {
      data.sort((a, b) => {
        const dateA = a.startDate;
        const dateB = b.startDate;
        if (dateA[0] < dateB[0]) {
          return 1;
        } else if (dateA[0] > dateB[0]) {
          return -1;
        } else {
          if (dateA[1] < dateB[1]) {
            return 1;
          } else if (dateA[1] > dateB[1]) {
            return -1;
          } else {
            if (dateA[2] < dateB[2]) {
              return 1;
            } else if (dateA[2] > dateB[2]) {
              return -1;
            } else {
              return 0;
            }
          }
        }
      });
    } else if (sortActive.occasion) {
      data.sort((a, b) => {
        const occasionA = a.prOccasion;
        const occasionB = b.prOccasion;
        if (occasionA < occasionB) {
          return 1;
        } else if (occasionA > occasionB) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }
};

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
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .includes(filterData.toLowerCase());
  } else {
    return true;
  }
};
