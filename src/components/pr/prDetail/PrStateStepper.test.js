import React from 'react';
import PrStateStepper from './PrStateStepper';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrSubstepItem from './PrSubstepItem';

describe('PerformanceReviewDetail Component', () => {
  let shallow = createShallow({ dive: true });

  const mockReleaseButtonClick = jest.fn();
  const activeStep = 1;
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
                releaseButtonClick={mockReleaseButtonClick(
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
                releaseButtonClick={mockReleaseButtonClick(
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
            complete: <div>Alle Teilnehmer haben zugesagt</div>,
            incomplete: <div>Nicht abgeschlossen</div>
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
                releaseButtonClick={mockReleaseButtonClick(
                  prStatusEnum.FINALIZED_REVIEWER
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
    expect(component.find('WithStyles(Step)')).toHaveLength(2);
    expect(component.find('WithStyles(StepLabel)')).toHaveLength(2);
    expect(component.find(PrSubstepItem)).toHaveLength(4);
  });
});
