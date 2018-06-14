import React from 'react';
import MyPRListItem from './MyPRListItem';
import { createShallow } from '@material-ui/core/test-utils';

describe('MyPRListItem Component', () => {
  let shallow = createShallow({ dive: true });

  it('displays the MyPRListItem', () => {
    const component = shallow(
      <MyPRListItem
        reviewer={'VVorgesetzter'}
        deadline={'2018-06-13'}
        occasion={'Auf Anfrage'}
        status={'Abgeschlossen'}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
