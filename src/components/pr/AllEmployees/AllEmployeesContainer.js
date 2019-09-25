import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Button, withStyles } from '@material-ui/core';
// Components
import AllEmployeesFilter from './AllEmployeesFilter';
// Material UI
import EmployeesGrid from './AllEmployeesGrid';
import { requestPrForEmployees } from '../../../actions/calls/pr';
import { ErrorContext, InfoContext } from '../../App';
import { getAllEmployees } from '../../../actions/calls/employees';

const styles = theme => ({
  container: {
    margin: 3 * theme.spacing.unit
  },
  gridContainer: {
    height: '77vh',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  containerMenu: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const AllEmployeesContainer = ({ classes }) => {
  const [searchEmployeesValue, setSearchEmployeesValue] = useState('');
  const errorContext = useContext(ErrorContext.context);
  const infoContext = useContext(InfoContext.context);
  const [selection, setSelection] = useState(false);
  const [selected, setSelected] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllEmployees(setEmployees, setIsLoading, errorContext);
  }, []);

  const toggleSelected = employeeId => {
    if (selected[employeeId]) {
      delete selected[employeeId];
    } else {
      selected[employeeId] = true;
    }
    setSelected({ ...selected });
  };

  const requestPr = () => {
    const afterPrRequested = () => {
      setSelection(false);
      setSelected({});
      getAllEmployees(setEmployees, setIsLoading, errorContext);
    };

    if (Object.keys(selected).length > 0) {
      const onSuccessHandler = () => {};
      requestPrForEmployees(
        Object.keys(selected),
        afterPrRequested,
        infoContext,
        errorContext
      );
    }
  };

  const selectionMenu = () => {
    return selection ? (
      <div>
        <Button
          onClick={() => {
            setSelected({});
            setSelection(false);
          }}
        >
          Cancel
        </Button>{' '}
        <Button onClick={requestPr}>Request PR</Button>
      </div>
    ) : (
      <Button
        onClick={() => {
          setSelected({});
          setSelection(true);
        }}
      >
        Select employees for PR
      </Button>
    );
  };

  const handleSearchChange = event => {
    setSearchEmployeesValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerMenu}>
        <AllEmployeesFilter
          searchValue={searchEmployeesValue}
          searchChange={handleSearchChange}
        />
        {se§lectionMenu()}
      </div>
      <EmployeesGrid
        searchEmployeesValue={searchEmployeesValue}
        selection={selection}
        selected={selected}
        toggleSelected={toggleSelected}
        employees={employees}
        isLoading={isLoading}
      />
    </div>
  );
};

export default injectIntl(withStyles(styles)(AllEmployeesContainer));
