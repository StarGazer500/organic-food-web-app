import { SuperUserAdminGuardGuard } from '../jwtauth/admin-guard.guard';

describe('SuperUserAdminGuardGuard', () => {
  it('should be defined', () => {
    expect(new SuperUserAdminGuardGuard()).toBeDefined();
  });
});
