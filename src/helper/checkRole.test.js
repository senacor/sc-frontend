import { isEmployee } from './checkRole';

describe('checkRole', () => {
  it('should recognize whether the logged in user is an employee', () => {
    let userroles = [];
    let result = isEmployee(userroles);
    expect(result).toBe(false);
  });
});
