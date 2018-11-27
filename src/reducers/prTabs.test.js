import { SET_PR_TAB } from '../helper/dispatchTypes';
import { prTabs } from './prTabs';
import { prTabEnum } from '../helper/prTabEnum';

describe('prTabs reducer', () => {
  it('should add the prTab name', () => {
    const initialState = prTabEnum.DETAIL_VIEW;

    const action = {
      type: SET_PR_TAB,
      payload: prTabEnum.SCHEDULE_VIEW
    };

    const stateAfter = prTabs(initialState, action);

    expect(stateAfter).toEqual(prTabEnum.SCHEDULE_VIEW);
  });
});
