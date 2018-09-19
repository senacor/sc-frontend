import React from 'react';
import { StyledComponent } from './PrState';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';

describe('PerformanceReviewDetail Component', () => {
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
          label: 'Mitarbeiter: ',
          rendering: {
            complete: 'Abgeschlossen',
            incomplete: (
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
          label: 'Beurteiler: ',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: (
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
          label: 'Terminfindung',
          rendering: {
            complete: 'Alle Teilnehmer haben zugesagt',
            incomplete: 'Nicht abgeschlossen'
          }
        }
      }
    },
    {
      mainStepLabel: 'Gespräch',
      substeps: {
        [prStatusEnum.FINALIZED_REVIEWER]: {
          isCompleted: false,
          label: 'Beurteiler: ',
          rendering: {
            complete: <div>Abgeschlossen</div>,
            incomplete: (
              <PrStatusActionButton
                label={'Abschließen'}
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
          label: 'Mitarbeiter:',
          rendering: {
            complete: 'Abgeschlossen',
            incomplete: '>Nicht abgeschlossen'
          }
        }
      }
    },
    {
      mainStepLabel: 'Archivieren (HR)',
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          isCompleted: false,
          label: 'HR: ',
          rendering: {
            complete: 'Archiviert',
            incomplete: 'Nicht archiviert'
          }
        }
      }
    }
  ];

  const prStatuses = [prStatusEnum.RELEASED_SHEET_EMPLOYEE];

  it('should match snapshot', () => {
    const component = shallow(<StyledComponent />);
    expect(component).toMatchSnapshot();
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
    const component = shallow(<StyledComponent />);
    const instance = component.instance();

    const result = instance.updateStepStructure(
      prStatusesDone,
      releaseButtonClickMock
    );
    expect(result).toEqual(stepStructure);
  });

  it('should call releaseButtonClick which triggers the the addPrStatus action', () => {
    const addPrStatusMock = jest.fn();

    const prById = {
      id: 1,
      supervisor: 'ttran',
      occasion: 'ON_DEMAND',
      status: 'PREPARATION',
      deadline: '2018-03-14'
    };
    const component = shallow(
      <StyledComponent prById={prById} addPrStatus={addPrStatusMock} />
    );
    const instance = component.instance();

    let result = instance.releaseButtonClick(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );

    expect(result).toEqual(expect.any(Function));
    // console.log(result.toString());
    // result = instance.releaseButtonClick(mockedEvent);
    // console.log(result.toString());
  });
});
