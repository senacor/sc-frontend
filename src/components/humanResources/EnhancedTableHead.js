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

const EnhancedTableHead = props => {
  const createSortHandler = index => event => {
    props.onRequestSort(event, index);
  };

  return (
    <TableHead>
      <TableRow>
        {props.columnDefinition.map((column, index) => {
          return (
            <TableCell
              key={index}
              padding={'none'}
              sortDirection={props.orderBy === index ? props.order : false}
              variant={'head'}
              numeric={true}
              className={props.classes.cell}
            >
              <TableSortLabel
                active={props.orderBy === index}
                direction={props.order}
                onClick={createSortHandler(index)}
              >
                {column.filter ? column.filter : null}
                {column.label}
              </TableSortLabel>
            </TableCell>
          );
        }, this)}
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
