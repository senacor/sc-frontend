import React from 'react';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';

class EnhancedTableHead extends React.Component {
  createSortHandler = index => event => {
    this.props.onRequestSort(event, index);
  };

  render() {
    const { order, orderBy, columnDefinition } = this.props;

    return (
      <TableHead>
        <TableRow>
          {columnDefinition.map((column, index) => {
            return (
              <TableCell
                key={index}
                numeric={false}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === index ? order : false}
              >
                <List>
                  <ListItem>
                    {column.filter ? column.filter : null}
                    <TableSortLabel
                      active={orderBy === index}
                      direction={order}
                      onClick={this.createSortHandler(index)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </ListItem>
                </List>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.number.isRequired,
  columnDefinition: PropTypes.array.isRequired
};

export default EnhancedTableHead;
