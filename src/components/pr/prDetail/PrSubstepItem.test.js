import React from 'react';
import PrSubstepItem from './PrSubstepItem';
import { createShallow } from '@material-ui/core/test-utils';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import PrStatusActionButton from './PrStatusActionButton';
import { prStatusEnum } from '../../../helper/prStatus';

describe('PrSubstepItem Component', () => {
  let shallow = createShallow({ dive: true });

  const releaseButtonClickMock = jest.fn();

  const renderSubstep = {
    isCompleted: true,
    isCurrentUserActionPerformer: false,
    label: 'Mitarbeiter:',
    rendering: {
      complete: 'Abgeschlossen',
      incompleteForNonActionPerformer: 'Nicht abgeschlossen',
      incompleteForActionPerformer: (
        <PrStatusActionButton
          label={'Freigabe'}
          releaseButtonClick={releaseButtonClickMock(
            prStatusEnum.RELEASED_SHEET_EMPLOYEE
          )}
        />
      )
    }
  };

  it('should match snapshot', () => {
    const component = shallow(<PrSubstepItem substep={renderSubstep} />);
    expect(component).toMatchSnapshot();
  });

  it('should display the correct values for a NonActionPerformer', () => {
    const component = shallow(<PrSubstepItem substep={renderSubstep} />);
    expect(
      component
        .find(ListItemText)
        .find('[primary]')
        .props().primary
    ).toEqual('Mitarbeiter:');

    expect(
      component
        .find(ListItemText)
        .find('[secondary]')
        .props().secondary
    ).toEqual('Abgeschlossen');
  });

  it('should display the correct values for an ActionPerformer', () => {
    let substep = {
      isCompleted: false,
      isCurrentUserActionPerformer: true,
      label: 'Mitarbeiter:',
      rendering: {
        complete: 'Abgeschlossen',
        incompleteForNonActionPerformer: 'Nicht abgeschlossen',
        incompleteForActionPerformer: (
          <PrStatusActionButton
            label={'Freigabe'}
            releaseButtonClick={releaseButtonClickMock(
              prStatusEnum.RELEASED_SHEET_EMPLOYEE
            )}
          />
        )
      }
    };

    const component = shallow(<PrSubstepItem substep={substep} />);
    expect(
      component
        .find(ListItemText)
        .find('[primary]')
        .props().primary
    ).toEqual('Mitarbeiter:');

    expect(
      component
        .find(ListItemText)
        .find('[secondary]')
        .props().secondary
    ).toEqual(
      <PrStatusActionButton label={'Freigabe'} releaseButtonClick={undefined} />
    );
  });
});
