import React from 'react';
import { injectIntl } from 'react-intl';
import TextField from '@material-ui/core/TextField/TextField';
import Icon from '@material-ui/core/Icon/Icon';
import IconButton from '@material-ui/core/IconButton/IconButton';

import EmployeeSearch from '../employeeSearch/EmployeeSearch';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';
import cloneDeep from '../../helper/cloneDeep';

export const EmployeeFilter = ({
  filter,
  setFilter,
  filterBy,
  closeFilter,
  intl
}) => {
  const defaultFilter = Object.assign(
    {},
    { searchString: '', values: '' },
    filter[filterBy]
  );
  const employeeName = defaultFilter.values;

  const selectEmployee = employee => {
    if (employee) {
      const newFilter = cloneDeep(filter);
      newFilter[filterBy] = {
        searchString: `${filterBy}=${employee.id}`,
        values: `${employee.firstName} ${employee.lastName}`
      };
      setFilter(newFilter);
      closeFilter();
    }
  };

  const onDelete = () => {
    const newFilter = cloneDeep(filter);
    delete newFilter[filterBy];
    setFilter(newFilter);
    closeFilter();
  };

  return (
    <EmployeeSearch
      employeeSearchValue={employeeName}
      selectEmployee={selectEmployee}
      inputElement={(value, onChange) => (
        <TextField
          id="outlined-adornment-filter"
          variant="outlined"
          label={intl.formatMessage({
            id: 'employeefilter.name'
          })}
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onDelete}>
                  <Icon id="adornmentIcon">clear</Icon>
                </IconButton>
              </InputAdornment>
            ),
            name: 'employeeSearchValue'
          }}
        />
      )}
    />
  );
};

export default injectIntl(EmployeeFilter);
