import {
  getAllPrs,
  getPrDetail,
  getUserroles
} from './selector';

describe('getAllPrs', () => {
  let storeState;

  beforeEach(() => {
    storeState = {
      prs: {
        1: { id: 1 },
        2: { id: 2 }
      }
    };
  });

  it('should return all PRs', () => {
    let result = getAllPrs(storeState);

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });
});

describe('getUserroles', () => {
  let storeState;

  beforeEach(() => {
    storeState = {
      userroles: ['PR_MITARBEITER']
    };
  });

  it('should return the userroles', () => {
    let result = getUserroles(storeState);

    expect(result).toEqual(['PR_MITARBEITER']);
  });
});

describe('getPrDetail', () => {
  let storeState;

  beforeEach(() => {
    storeState = {
      prs: {
        1: { id: 1, deadline: '2018-01-01' },
        2: { id: 2, deadline: '2017-01-01' }
      },
      prDetailId: 2
    };
  });

  it('should return PR with id stored in prDetailId', () => {
    let result = getPrDetail()(storeState);

    expect(result).toEqual({ id: 2, deadline: '2017-01-01' });
  });
});
