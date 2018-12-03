import React from 'react';
import { StyledComponent as PlotEmployeeSearchList } from './PlotEmployeeSearchList';
import { createShallow } from '@material-ui/core/test-utils/index';

describe('PlotEmployeeSearchList Component', () => {
  let searchResults = [
    {
      id: 502,
      firstName: 'Michaela',
      lastName: 'Mitarbeiterin'
    },
    {
      id: 503,
      firstName: 'Martin',
      lastName: 'Mitarbeiter'
    },
    {
      id: 501,
      firstName: 'Manuela',
      lastName: 'Vorgesetzter'
    }
  ];

  it('should display the Results', () => {
    let shallow = createShallow({ dive: true });
    let selectEmployeeMock = jest.fn();

    const component = shallow(
      <PlotEmployeeSearchList
        searchResults={searchResults}
        selectEmployee={selectEmployeeMock}
        excludeList={[]}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should display the Results without excludes', () => {
    let shallow = createShallow({ dive: true });
    let selectEmployeeMock = jest.fn();

    const component = shallow(
      <PlotEmployeeSearchList
        searchResults={searchResults}
        selectEmployee={selectEmployeeMock}
        excludeList={[502]}
      />
    );

    expect(component.find('WithStyles(ListItemText)')).toHaveLength(2);
  });
});
