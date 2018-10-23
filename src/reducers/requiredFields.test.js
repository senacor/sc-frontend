import { requiredFields } from './requiredFields';
import {
  FETCH_PR_BY_ID_RESPONSE,
  REQUIRED_FIELDS
} from '../helper/dispatchTypes';

const prevState = {
  employee: true,
  reviewer: true
};

describe('requiredFields', () => {
  it('should return the previous state if the action is not of type REQUIRED_FIELDS', () => {
    let action = {
      type: FETCH_PR_BY_ID_RESPONSE,
      prById: {
        id: 1
      }
    };

    const secondState = requiredFields(prevState, action);

    expect(secondState).toEqual({
      employee: true,
      reviewer: true
    });
  });

  it('should change the state if the action is of type REQUIRED_FIELDS', () => {
    let action = {
      type: REQUIRED_FIELDS,
      payload: {
        employee: true,
        reviewer: false
      }
    };

    const nextState = requiredFields(prevState, action);

    expect(nextState).toEqual({
      employee: true,
      reviewer: false
    });
  });
});
