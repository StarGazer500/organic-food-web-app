import { AdminGuardGuard } from '../jwtauth/admin-guard.guard';

describe('AdminGuardGuard', () => {
  it('should be defined', () => {
    expect(new AdminGuardGuard()).toBeDefined();
  });
});
