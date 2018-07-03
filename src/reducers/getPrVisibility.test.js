import { prVisibility } from './getPrVisibility';
import { FETCHED_PR_VISIBILITY } from '../helper/dispatchTypes';
import { VISIBLE } from '../helper/prVisibility';

describe('prVisibility', () => {
  it('should return proper visibility for supervisor and employee', () => {
    let prevState = { toEmployee: false, toSupervisor: true };
    let action = {
      type: FETCHED_PR_VISIBILITY,
      prVisibilityById: {
        visibilityToEmployee: VISIBLE,
        visibilityToReviewer: VISIBLE
      }
    };

    const nextState = prVisibility(prevState, action);

    expect(nextState).toEqual({ toEmployee: true, toSupervisor: true });
  });
});
