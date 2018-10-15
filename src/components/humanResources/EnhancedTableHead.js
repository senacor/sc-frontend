import HR_ELEMENTS from './hrElements';
import React from 'react';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel/TableSortLabel';
import PropTypes from 'prop-types';

const rows = [
  {
    id: HR_ELEMENTS.EMPLOYEE,
    numeric: false,
    disablePadding: false,
    label: 'Mitarbeiter'
  },
  {
    id: HR_ELEMENTS.DEADLINE,
    numeric: false,
    disablePadding: true,
    label: 'Fälligkeit'
  },
  {
    id: HR_ELEMENTS.PR_OCCASION,
    numeric: false,
    disablePadding: false,
    label: 'Grund'
  },
  {
    id: HR_ELEMENTS.CST,
    numeric: false,
    disablePadding: false,
    label: 'Projektkst'
  },
  { id: 'competence', numeric: false, disablePadding: true, label: 'Dev/Con' },
  {
    id: HR_ELEMENTS.LEVEL,
    numeric: false,
    disablePadding: true,
    label: 'level'
  },
  {
    id: HR_ELEMENTS.SUPERVISOR,
    numeric: false,
    disablePadding: true,
    label: 'Vorgesetzte/r'
  },
  {
    id: HR_ELEMENTS.REVIEWER,
    numeric: false,
    disablePadding: true,
    label: 'Bewerter'
  },
  {
    id: HR_ELEMENTS.RESULT,
    numeric: false,
    disablePadding: true,
    label: 'Bewertung'
  },
  {
    id: HR_ELEMENTS.EMPLOYEE_PREPARATION_DONE,
    numeric: false,
    disablePadding: true,
    label: 'MA ausgefüllt'
  },
  {
    id: HR_ELEMENTS.REVIEWER_PREPARATION_DONE,
    numeric: false,
    disablePadding: false,
    label: 'Beurteiler ausgefüllt'
  },
  {
    id: HR_ELEMENTS.APPOINTMENT,
    numeric: false,
    disablePadding: true,
    label: 'Termin'
  },
  {
    id: HR_ELEMENTS.IN_PROGRESS,
    numeric: false,
    disablePadding: true,
    label: 'Finaler Status'
  },
  {
    id: HR_ELEMENTS.HR_PROCESSING_DONE,
    numeric: false,
    disablePadding: true,
    label: 'HR verarbeitet'
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  className={row.id}
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
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
  orderBy: PropTypes.string.isRequired
};

export default EnhancedTableHead;
