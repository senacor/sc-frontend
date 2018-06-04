import { cstMembers } from './cstMembers';

describe('userinfo reducer', () => {
  it('should set cstmembers on FETCHED_CSTMEMBERS', () => {
    const stateBefore = [];
    const action = {
      type: 'FETCHED_CSTMEMBERS',
      cstMembers: {
        _embedded: {
          employeeResponseList: [
            {
              id: 2,
              firstName: 'Saskia',
              lastName: 'Kunze',
              dateOfLastPr: '2018-03-14'
            },
            {
              id: 3,
              firstName: 'Martin',
              lastName: 'Müller',
              dateOfLastPr: '2018-04-28'
            }
          ]
        }
      }
    };

    const stateAfter = cstMembers(stateBefore, action);

    expect(stateAfter).toEqual([
      {
        id: 2,
        firstName: 'Saskia',
        lastName: 'Kunze',
        dateOfLastPr: '2018-03-14'
      },
      {
        id: 3,
        firstName: 'Martin',
        lastName: 'Müller',
        dateOfLastPr: '2018-04-28'
      }
    ]);
  });

  it('should return empty array if no user was found', () => {
    const stateBefore = [];
    const action = {
      type: 'FETCHED_CSTMEMBERS',
      cstMembers: {
        link: {
          href: 'something'
        }
      }
    };

    const stateAfter = cstMembers(stateBefore, action);

    expect(stateAfter).toEqual([]);
  });
});
