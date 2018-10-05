import React from 'react';
import { StyledComponent } from './PrState';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStateStepper from './PrStateStepper';

describe('PrState Component', () => {
  let shallow = createShallow({ dive: true });

  const releaseButtonClickMock = jest.fn();

  const prStatusesDone = {
    [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: true,
    [prStatusEnum.RELEASED_SHEET_REVIEWER]: false,
    [prStatusEnum.FIXED_DATE]: false,
    [prStatusEnum.FINALIZED_REVIEWER]: false,
    [prStatusEnum.FINALIZED_EMPLOYEE]: false,
    [prStatusEnum.ARCHIVED_HR]: false
  };

  const stepStructure = [
    {
      mainStepLabel: 'Vorbereitung',
      substeps: {
        [prStatusEnum.RELEASED_SHEET_EMPLOYEE]: {
          isCompleted: true,
          isCurrentUserActionPerformer: false,
          label: 'Mitarbeiter: ',
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
        },
        [prStatusEnum.RELEASED_SHEET_REVIEWER]: {
          isCompleted: false,
          isCurrentUserActionPerformer: true,
          label: 'Beurteiler: ',
          rendering: {
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClickMock(
                  prStatusEnum.RELEASED_SHEET_REVIEWER
                )}
              />
            )
          }
        },
        [prStatusEnum.FIXED_DATE]: {
          isCompleted: false,
          isCurrentUserActionPerformer: true,
          label: 'Terminfindung',
          rendering: {
            complete: 'Alle Teilnehmer haben zugesagt',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: 'Nicht abgeschlossen'
          }
        }
      }
    },
    {
      mainStepLabel: 'Gespräch',
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          isCompleted: false,
          isCurrentUserActionPerformer: true,
          label: 'Beurteiler: ',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClickMock(
                  prStatusEnum.FINALIZED_REVIEWER
                )}
              />
            )
          }
        }
      }
    },
    {
      mainStepLabel: 'Abschluss',
      substeps: {
        [prStatusEnum.FINALIZED_EMPLOYEE]: {
          isCompleted: false,
          isCurrentUserActionPerformer: false,
          label: 'Mitarbeiter:',
          rendering: {
            complete: 'Abgeschlossen',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClickMock(
                  prStatusEnum.FINALIZED_EMPLOYEE
                )}
              />
            )
          }
        }
      }
    }
  ];

  const prStatuses = [prStatusEnum.RELEASED_SHEET_EMPLOYEE];

  const userinfo = {
    userPrincipalName: 'test.pr.vorgesetzter'
  };

  it('should match snapshot', () => {
    const component = shallow(<StyledComponent />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const prById = {
      statuses: prStatusEnum.RELEASED_SHEET_EMPLOYEE
    };

    const component = shallow(
      <StyledComponent prById={prById} userinfo={userinfo} />
    );

    expect(component.find(PrStateStepper)).toHaveLength(1);
    expect(component.find(PrStateStepper).props().activeStep).toEqual(0);
    expect(
      component.find(PrStateStepper).props().stepStructure[0].mainStepLabel
    ).toEqual('Vorbereitung');
  });

  it('should call mainStepIsDone which returns the complete status of the mainStep', () => {
    const component = shallow(<StyledComponent />);
    const instance = component.instance();

    const result = instance.mainStepIsDone(prStatusesDone, 1, stepStructure);
    expect(result).toBeFalsy();
  });

  it('should call calculateActiveStep which calculates the active step', () => {
    const component = shallow(<StyledComponent />);
    const instance = component.instance();

    const result = instance.calculateActiveStep(prStatusesDone, stepStructure);
    expect(result).toBe(0);
  });

  it('should call getCompletedSubsteps which returns an object with the status substeps', () => {
    const component = shallow(<StyledComponent />);
    const instance = component.instance();

    const result = instance.getCompletedSubsteps(prStatuses);
    expect(result).toEqual(prStatusesDone);
  });

  it('should call isDone which checks for a single status whether it is completed', () => {
    const component = shallow(<StyledComponent />);
    const instance = component.instance();

    const result = instance.isDone(prStatuses, [
      prStatusEnum.FINALIZED_EMPLOYEE
    ]);
    expect(result).toBeFalsy();
  });

  it('should call updateStepStructure which returns the updated stepStructure', () => {
    const prById = {
      id: 1,
      employee: {
        login: 'ttran'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter'
      },
      reviewer: {
        login: 'test.pr.beurteiler'
      }
    };

    const component = shallow(<StyledComponent />);
    const instance = component.instance();

    const result = instance.updateStepStructure(
      prById,
      userinfo,
      prStatusesDone,
      releaseButtonClickMock
    );
    expect(result).toEqual(stepStructure);
  });

  it('should call releaseButtonClick which triggers the the addPrStatus action', () => {
    const addPrStatusMock = jest.fn();
    const mockedEvent = { disabled: false };
    const prById = {
      id: 1
    };

    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
      />
    );
    const instance = component.instance();

    let result = instance.releaseButtonClick(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    result(mockedEvent);

    expect(addPrStatusMock.mock.calls.length).toBe(1);
    expect(addPrStatusMock.mock.calls[0][0]).toBe(prById);
  });
});
