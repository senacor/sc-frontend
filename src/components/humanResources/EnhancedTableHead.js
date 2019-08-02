import React from 'react';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const styles = {
  cell: {
    textAlign: 'left'
  }
};

const EnhancedTableHead = ({
  onRequestSort,
  columnDefinition,
  orderBy,
  order,
  classes
}) => {
  const createSortHandler = index => event => {
    onRequestSort(event, index);
  };

  return (
    <TableHead>
      <TableRow>
        {columnDefinition.map((column, index) => {
          return (
            <TableCell
              key={index}
              padding={'none'}
              sortDirection={orderBy === index ? order : false}
              variant={'head'}
              numeric={true}
              className={classes.cell}
            >
              <TableSortLabel
                active={orderBy === index}
                direction={order}
                onClick={createSortHandler(index)}
              >
                {column.filter ? column.filter : null}
                {column.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.number.isRequired,
  columnDefinition: PropTypes.array.isRequired
};

const StyledComponent = withStyles(styles)(EnhancedTableHead);
export default StyledComponent;
