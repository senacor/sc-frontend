import React from 'react';
import PrStateStepper from './PrStateStepper';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrSubstepItem from './PrSubstepItem';

describe('PerformanceReviewDetail Component', () => {
  let shallow = createShallow({ dive: true });

  const releaseButtonClickMock = jest.fn();
  const activeStep = 1;
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
    },
    {
      mainStepLabel: 'Archivieren',
      substeps: {
        [prStatusEnum.ARCHIVED_HR]: {
          isCompleted: false,
          label: 'HR: ',
          rendering: {
            complete: 'Archiviert',
            incompleteForNonActionPerformer: 'Nicht abgeschlossen',
            incompleteForActionPerformer: (
              <PrStatusActionButton
                label={'Freigabe'}
                releaseButtonClick={releaseButtonClickMock(
                  prStatusEnum.ARCHIVED_HR
                )}
              />
            )
          }
        }
      }
    }
  ];

  it('should match snapshot', () => {
    const component = shallow(
      <PrStateStepper stepStructure={stepStructure} activeStep={activeStep} />
    );
    expect(component).toMatchSnapshot();
  });

  it('should call getExtraStepContent which returns the correct number of substeps', () => {
    const component = shallow(
      <PrStateStepper stepStructure={stepStructure} activeStep={activeStep} />
    );

    const result = component
      .instance()
      .getExtraStepContent(stepStructure[0].substeps);

    expect(result).toHaveLength(3);
  });

  it('renders correctly', () => {
    const component = shallow(
      <PrStateStepper stepStructure={stepStructure} activeStep={activeStep} />
    );

    expect(component.props().activeStep).toBe(1);
    expect(component.find('WithStyles(Stepper)')).toHaveLength(1);
    expect(component.find('WithStyles(Step)')).toHaveLength(4);
    expect(component.find('WithStyles(StepLabel)')).toHaveLength(4);
    expect(component.find(PrSubstepItem)).toHaveLength(4);
  });

  it('renders the correct amount of substeps', () => {
    const component = shallow(
      <PrStateStepper stepStructure={stepStructure} activeStep={0} />
    );
    expect(component.find(PrSubstepItem)).toHaveLength(3);
  });
});
