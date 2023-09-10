import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../utils/decorators/roles.decorator';
import { PUBLIC_KEY } from '../../utils/decorators/public.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.some((role) => user.role === role);
  }
}
