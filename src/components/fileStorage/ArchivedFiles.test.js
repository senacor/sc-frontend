import { createShallow } from '@material-ui/core/test-utils';
import React from 'react';
import { ArchivedFiles } from './ArchivedFiles';

describe('ArchivedFiles Component', () => {
  let shallow = createShallow({ dive: false });

  it('should match snapshot', () => {
    let archivedFiles = [
      {
        date: '2017-11-11',
        fileName: '20171111_test.pr.mitarbeiter1.xlsx',
        firstName: 'Michaela',
        id: 15,
        lastName: 'Mitarbeiterin',
        url: 'https://url_15.com'
      },
      {
        date: '2017-02-10',
        fileName: '20170210_fmartin.xlsx',
        firstName: 'Frederik',
        id: 24,
        lastName: 'Martin',
        url: 'https://url_24.com'
      }
    ];
    let component = shallow(
      <ArchivedFiles archivedFiles={archivedFiles} downloadFiles={jest.fn()} />
    );

    expect(component).toMatchSnapshot();
  });
});
