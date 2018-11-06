import React from 'react';
import { StyledComponent } from './PrState';
import { createShallow } from '@material-ui/core/test-utils';
import { prStatusEnum } from '../../../helper/prStatus';
import PrStatusActionButton from './PrStatusActionButton';
import PrStateStepper from './PrStateStepper';

describe('PrState Component for reviewer', () => {
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
            complete: 'Abgeschlossen',
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
    const prById = {
      statuses: prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      id: 1,
      employee: {
        login: 'test.pr.mitarbeiter1'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter'
      },
      reviewer: {
        login: 'test.pr.beurteiler'
      }
    };

    const addPrStatusMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const prById = {
      statuses: prStatusEnum.RELEASED_SHEET_EMPLOYEE
    };

    const component = shallow(
      <StyledComponent prById={prById} userinfo={userinfo} />
    );

    expect(
      component.find(PrStateStepper).map(field => field.get(0))[0].props
        .stepStructure
    ).toHaveLength(3);
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
    const checkRequiredMock = jest.fn();
    const mockedEvent = { disabled: false };
    const prById = {
      id: 1
    };

    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
        checkRequired={checkRequiredMock}
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

describe('PrState Component for employee', () => {
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
          isCurrentUserActionPerformer: true,
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
          isCurrentUserActionPerformer: false,
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
          isCurrentUserActionPerformer: false,
          label: 'Beurteiler: ',
          rendering: {
            complete: 'Abgeschlossen',
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
          isCurrentUserActionPerformer: true,
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
    userPrincipalName: 'test.pr.mitarbeiter1'
  };

  it('should match snapshot', () => {
    const prById = {
      statuses: prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      id: 1,
      employee: {
        login: 'test.pr.mitarbeiter1'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter'
      },
      reviewer: {
        login: 'test.pr.beurteiler'
      }
    };

    const addPrStatusMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
      />
    );
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
        login: 'test.pr.mitarbeiter1'
      },
      supervisor: {
        login: 'ttran'
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
    let checkRequiredMock = jest.fn();
    const mockedEvent = { disabled: false };
    let employeeContributionRole = 'test';
    let employeeContributionLeader = 'test';
    const prById = {
      id: 1
    };

    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
        checkRequired={checkRequiredMock}
        employeeContributionRole={employeeContributionRole}
        employeeContributionLeader={employeeContributionLeader}
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

describe('PrState Component for HR', () => {
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
          isCurrentUserActionPerformer: false,
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
          isCurrentUserActionPerformer: false,
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
          isCurrentUserActionPerformer: false,
          label: 'Beurteiler: ',
          rendering: {
            complete: 'Abgeschlossen',
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

  const prStatuses = [prStatusEnum.RELEASED_SHEET_EMPLOYEE];

  const userinfo = {
    userPrincipalName: 'test.pr.hr'
  };

  const userroles = ['PR_HR'];

  it('should match snapshot', () => {
    const prById = {
      statuses: prStatusEnum.RELEASED_SHEET_EMPLOYEE,
      id: 1,
      employee: {
        login: 'test.pr.mitarbeiter1'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter'
      },
      reviewer: {
        login: 'test.pr.beurteiler'
      }
    };

    const addPrStatusMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
        userroles={userroles}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should match snapshot when button for HR is present', () => {
    const prById = {
      statuses: [
        prStatusEnum.RELEASED_SHEET_EMPLOYEE,
        prStatusEnum.RELEASED_SHEET_REVIEWER,
        prStatusEnum.FIXED_DATE,
        prStatusEnum.FINALIZED_REVIEWER,
        prStatusEnum.FINALIZED_EMPLOYEE
      ],
      id: 1,
      employee: {
        login: 'test.pr.mitarbeiter1'
      },
      supervisor: {
        login: 'test.pr.vorgesetzter'
      },
      reviewer: {
        login: 'test.pr.beurteiler'
      }
    };

    const addPrStatusMock = jest.fn();
    const component = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        userinfo={userinfo}
        userroles={userroles}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const prById = {
      statuses: prStatusEnum.RELEASED_SHEET_EMPLOYEE
    };

    const component = shallow(
      <StyledComponent
        prById={prById}
        userinfo={userinfo}
        userroles={userroles}
      />
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
});

describe('functions that check required fields', () => {
  let shallow = createShallow({ dive: true });
  const component = shallow(<StyledComponent />);
  const instance = component.instance();
  const addPrStatusMock = jest.fn();
  const checkRequiredMock = jest.fn();
  const mockedEvent = { disabled: false };
  const addPrStatusMock2 = jest.fn();
  const checkRequiredMock2 = jest.fn();
  const mockedEvent2 = { disabled: false };
  const prById = {
    id: 1
  };
  let role = 'Junior';
  let leader = 'helpful';
  let comment = 'Good worker';
  let statusEmployee = prStatusEnum.RELEASED_SHEET_EMPLOYEE;
  let statusReviewer = prStatusEnum.RELEASED_SHEET_REVIEWER;
  let statusHr = prStatusEnum.ARCHIVED_HR;
  it('should check the textfield inputs of the employee and return true if required fields are filled', () => {
    let requiredFields1 = instance.checkRequiredFields(
      role,
      leader,
      comment,
      statusEmployee
    );
    expect(requiredFields1).toEqual({ employee: true, reviewer: true });
  });

  it('should return true if the state is not one of these where there are required fields', () => {
    let requiredFields2 = instance.checkRequiredFields(
      role,
      leader,
      comment,
      statusHr
    );
    expect(requiredFields2).toEqual({ employee: true, reviewer: true });
  });

  it('should check the employee fields and return false for the employee if one of these fields is not filled', () => {
    let requiredFields3 = instance.checkRequiredFields(
      role,
      null,
      comment,
      statusEmployee
    );
    expect(requiredFields3).toEqual({ employee: false, reviewer: true });
  });

  it('should check the reviewer fields and return false for the reviewer if one of these fields is not filled', () => {
    let requiredFields4 = instance.checkRequiredFields(
      role,
      null,
      null,
      statusReviewer
    );
    expect(requiredFields4).toEqual({ employee: true, reviewer: false });
  });

  it('should not return anything if the employee tries to hit the button without filling all required fields', () => {
    const componentEmployee = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        checkRequired={checkRequiredMock}
        userinfo={{
          userPrincipalName: 'test.pr.mitarbeiter1'
        }}
        employeeContributionRole={null}
        employeeContributionLeader={null}
      />
    );
    const instanceEmployee = componentEmployee.instance();
    let checkEmployeeCanRelease = instanceEmployee.releaseButtonClick(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    checkEmployeeCanRelease(mockedEvent);

    expect(addPrStatusMock.mock.calls.length).toBe(0);
  });

  it('should trigger the addStatus Action if all required fields are filled and the employee than hits the release button', () => {
    const componentEmployee = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock}
        checkRequired={checkRequiredMock}
        userinfo={{
          userPrincipalName: 'test.pr.mitarbeiter1'
        }}
        employeeContributionRole={role}
        employeeContributionLeader={leader}
      />
    );
    const instanceEmployee = componentEmployee.instance();
    let checkEmployeeCanRelease = instanceEmployee.releaseButtonClick(
      prStatusEnum.RELEASED_SHEET_EMPLOYEE
    );
    checkEmployeeCanRelease(mockedEvent);

    expect(addPrStatusMock.mock.calls.length).toBe(1);
    expect(addPrStatusMock.mock.calls[0][1]).toEqual('FILLED_SHEET_EMPLOYEE');
  });

  it('should not return anything if the reviewer tries to hit the button without filling all required fields', () => {
    const componentReviewer = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock2}
        checkRequired={checkRequiredMock2}
        userinfo={{
          userPrincipalName: 'test.pr.vorgesetzter'
        }}
        overallComment={null}
      />
    );
    const instanceReviewer = componentReviewer.instance();
    let checkReviewerCanRelease = instanceReviewer.releaseButtonClick(
      prStatusEnum.RELEASED_SHEET_REVIEWER
    );
    checkReviewerCanRelease(mockedEvent2);

    expect(addPrStatusMock2.mock.calls.length).toBe(0);
  });

  it('should trigger the addStatus Action if all required fields are filled and the reviewer than hits the release button', () => {
    const componentReviewer = shallow(
      <StyledComponent
        prById={prById}
        addPrStatus={addPrStatusMock2}
        checkRequired={checkRequiredMock2}
        userinfo={{
          userPrincipalName: 'test.pr.vorgesetzter'
        }}
        overallComment={comment}
      />
    );
    const instanceReviewer = componentReviewer.instance();
    let checkReviewerCanRelease = instanceReviewer.releaseButtonClick(
      prStatusEnum.RELEASED_SHEET_REVIEWER
    );
    checkReviewerCanRelease(mockedEvent2);

    expect(addPrStatusMock2.mock.calls.length).toBe(1);
    expect(addPrStatusMock2.mock.calls[0][1]).toEqual('FILLED_SHEET_REVIEWER');
  });
});