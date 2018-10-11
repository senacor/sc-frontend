import React, { Component } from 'react';

import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import Table from '@material-ui/core/Table/Table';

class PrHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prHistory: [
        { id: 5, appointment: '2018-01-01', occassion: 'ON_DEMAND' },
        {
          id: 6,
          isExcel: true,
          filename: '20170101_Michaela_Mitarbeiterin.xls'
        },
        {
          id: 7,
          isExcel: true,
          filename: '20160101_Michaela_Mitarbeiterin.xls'
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <Table padding={'none'}>
          <TableHead>
            <TableRow>
              <TableCell padding={'none'}>Datum</TableCell>
              <TableCell padding={'none'}>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.prHistory.map(row => {
              return (
                <TableRow key={row.id}>
                  <TableCell padding={'none'}>
                    {row.appointment ? row.appointment : 'Excel'}
                  </TableCell>
                  <TableCell padding={'none'}>
                    {row.occassion
                      ? row.occassion
                      : `Download Excel ${row.filename}`}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default PrHistory;
