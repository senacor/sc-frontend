import {
  ADD_PR_RESPONSE,
  ADD_TEXT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import { prEmployeeContributions } from './employeeContributions';

describe('employee contribution', () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      1: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 11'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 12'
        }
      }
    };
  });

  it('should add the employee contributions for ADD_TEXT_RESPONSE to the store', () => {
    let payload = {
      prReflectionSet: [
        {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      ],
      prId: 5
    };

    const action = {
      type: ADD_TEXT_RESPONSE,
      payload
    };

    const stateAfter = prEmployeeContributions(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 11'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 12'
        }
      },
      5: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      }
    });
  });

  it('should override the employee contributions for ADD_TEXT_RESPONSE to the store', () => {
    let payload = {
      prReflectionSet: [
        {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 111'
        },
        {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 121'
        }
      ],
      prId: 1
    };

    const action = {
      type: ADD_TEXT_RESPONSE,
      payload
    };

    const stateAfter = prEmployeeContributions(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 111'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 121'
        }
      }
    });
  });

  it('should add all employee contributions for FETCH_PRS_RESPONSE to the store', () => {
    let prs = [
      {
        id: 5,
        prReflectionSet: [
          {
            id: 51,
            prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
            text: 'Comment 51'
          },
          {
            id: 52,
            prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
            text: 'Comment 52'
          }
        ]
      },
      {
        id: 8,
        prReflectionSet: [
          {
            id: 81,
            prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
            text: 'Comment 81'
          },
          {
            id: 82,
            prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
            text: 'Comment 82'
          }
        ]
      }
    ];

    const action = {
      type: FETCH_PRS_RESPONSE,
      prs
    };

    const stateAfter = prEmployeeContributions(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 11'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 12'
        }
      },
      5: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      },
      8: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 81,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 81'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 82,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 82'
        }
      }
    });
  });

  it('should add the employee contributions for FETCH_PR_BY_ID_RESPONSE to the store', () => {
    let prById = {
      id: 5,
      prReflectionSet: [
        {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      ]
    };

    const action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById
    };

    const stateAfter = prEmployeeContributions(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 11'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 12'
        }
      },
      5: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      }
    });
  });

  it('should add the employee contributions for ADD_PR_RESPONSE to the store', () => {
    let pr = {
      id: 5,
      prReflectionSet: [
        {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      ]
    };

    const action = {
      type: ADD_PR_RESPONSE,
      pr
    };

    const stateAfter = prEmployeeContributions(initialState, action);

    expect(stateAfter).toEqual({
      1: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 11,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 11'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 12,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 12'
        }
      },
      5: {
        INFLUENCE_OF_LEADER_AND_ENVIRONMENT: {
          id: 51,
          prReflectionField: 'INFLUENCE_OF_LEADER_AND_ENVIRONMENT',
          text: 'Comment 51'
        },
        ROLE_AND_PROJECT_ENVIRONMENT: {
          id: 52,
          prReflectionField: 'ROLE_AND_PROJECT_ENVIRONMENT',
          text: 'Comment 52'
        }
      }
    });
  });
});
