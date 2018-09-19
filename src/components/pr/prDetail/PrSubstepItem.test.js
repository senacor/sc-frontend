import React from 'react';
import PrSubstepItem from './PrSubstepItem';
import { createShallow } from '@material-ui/core/test-utils';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

describe('PrSubstepItem Component', () => {
  let shallow = createShallow({ dive: true });

  let substep = {
    isCompleted: false,
    label: 'Terminfindung',
    rendering: {
      complete: 'Alle Teilnehmer haben abgesagt',
      incomplete: 'Nicht abgeschlossen'
    }
  };

  it('should match snapshot', () => {
    const component = shallow(<PrSubstepItem substep={substep} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the correct values', () => {
    const component = shallow(<PrSubstepItem substep={substep} />);
    expect(
      component
        .find(ListItemText)
        .find('[primary]')
        .props().primary
    ).toEqual('Terminfindung');

    expect(
      component
        .find(ListItemText)
        .find('[secondary]')
        .props().secondary
    ).toEqual('Nicht abgeschlossen');
  });
});
