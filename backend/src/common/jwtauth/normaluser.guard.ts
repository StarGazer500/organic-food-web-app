import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';


@Injectable()
export class NormaluserGuard implements CanActivate {
 canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user?.role === 'normaluser';
  }
}
