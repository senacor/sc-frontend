import moment from 'moment';

const isEqual = require('lodash/isEqual');

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
