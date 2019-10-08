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

export const checkFilterValues = (filterData, userData) => {
  if (filterData.length > 0 && Array.isArray(filterData)) {
    const filterDataLowerCase = filterData.map(item => item.toLowerCase());
    return filterDataLowerCase.includes(userData.toLowerCase());
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