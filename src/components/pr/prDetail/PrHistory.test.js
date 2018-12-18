import React from 'react';
import { PrHistory } from './PrHistory';
import { shallow } from 'enzyme';

describe('PrHistory Component', () => {
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
    const component = shallow(<PrHistory archivedFiles={archivedFiles} />);
    expect(component).toMatchSnapshot();
  });
});
