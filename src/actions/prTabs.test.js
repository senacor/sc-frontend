import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { prTabEnum } from '../helper/prTabEnum';
import { setPrTabs } from './prTabs';
import { SET_PR_TAB } from '../helper/dispatchTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('prTabs redux action', () => {
  it('should dispatch SET_PR_TAB', async () => {
    const store = mockStore();

    await store.dispatch(setPrTabs(prTabEnum.DETAIL_VIEW));

    expect(store.getActions()).toEqual([
      {
        type: SET_PR_TAB,
        payload: prTabEnum.DETAIL_VIEW
      }
    ]);
  });
});
