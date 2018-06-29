import { hasRole, isEmployee, isSupervisor } from './checkRole';
import ROLES from './roles';

describe('checkRole', () => {
  it('should be able to tell if a user has a specified role', () => {
    let userroles = [ROLES.PR_CST_LEITER, ROLES.PR_MITARBEITER];

    let userIsSupervisor = hasRole(ROLES.PR_CST_LEITER, userroles);
    let userIsEmployee = hasRole(ROLES.PR_MITARBEITER, userroles);
    let userIsSomethingElse = hasRole('Captain America', userroles);

    expect(userIsSupervisor).toBe(true);
    expect(userIsEmployee).toBe(true);
    expect(userIsSomethingElse).toBe(false);
  });

  it('should recognize whether the logged in user is an employee', () => {
    let userroles = [ROLES.PR_MITARBEITER];
    let result_positive = isEmployee(userroles);
    let result_negative = isEmployee([ROLES.PR_CST_LEITER]);

    expect(result_positive).toBe(true);
    expect(result_negative).toBe(false);
  });

  it('should recognize whether the logged in user is a supervisor', () => {
    let userroles = [ROLES.PR_CST_LEITER];
    let result_positive = isSupervisor(userroles);
    let result_negative = isSupervisor([ROLES.PR_MITARBEITER]);

    expect(result_positive).toBe(true);
    expect(result_negative).toBe(false);
  });
});
