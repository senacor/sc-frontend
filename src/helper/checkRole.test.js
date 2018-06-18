import { isEmployee } from './checkRole';

describe('checkRole', () => {
  it('recognizes whether the logged in user is an employee', () => {
    let userroles = ['PR_Mitarbeiter'];
    let result = isEmployee(userroles);
    expect(result).toBe(true);
  });
});
