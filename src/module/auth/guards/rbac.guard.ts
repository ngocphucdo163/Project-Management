import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    // Check for permissions
    if (requiredPermissions && requiredPermissions.length > 0) {
      if (!user || !user.role || !user.role.permissions) {
        throw new ForbiddenException(
          'You do not have permission to access this resource'
        );
      }

      // Check for permissions
      const hasPermission = requiredPermissions.every((permission) =>
        user.role.permissions.some(
          (userPermission) => userPermission.name === permission
        )
      );

      if (!hasPermission) {
        throw new ForbiddenException(
          'You do not have permission to access this resource'
        );
      }
    }

    return true;
  }
}
