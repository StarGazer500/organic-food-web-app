import { CanActivate, ExecutionContext, Logger, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class SuperUserAdminGuard implements CanActivate {
  private readonly logger = new Logger(SuperUserAdminGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.logger.log("Admin guard reached");
    this.logger.log("User object:", JSON.stringify(user));

    // Check if user exists
    if (!user) {
      this.logger.error("No user found in request");
      throw new UnauthorizedException('User not authenticated');
    }

    // Check if user has the required role
    if (!user.role) {
      this.logger.error("No role found in user object");
      throw new UnauthorizedException('User role not found');
    }

    this.logger.log("User role:", user.role);
    
    // Check if user has superuser role
    const hasRequiredRole = user.role === 'superuser';
    
    if (!hasRequiredRole) {
      this.logger.error(`Access denied. Required role: superuser, User role: ${user.role}`);
      throw new UnauthorizedException('Insufficient permissions');
    }

    this.logger.log("Access granted for superuser");
    return true;
  }
}