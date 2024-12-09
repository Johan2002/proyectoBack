import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EPermission } from '../constants/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permission.decorator';
import { IPayload } from '../interfaces/api/auth-interface/auth.interface';

@Injectable()
export class RolesAndPermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<EPermission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user as IPayload;
    if (!user || !user.permissions) {
      throw new UnauthorizedException('User or permissions not found');
    }

    const hasPermission =
      requiredPermissions.every((perm) => user.permissions.includes(perm)) ||
      user.permissions.includes(EPermission.ADMIN_ALL);

    if (!hasPermission) {
      throw new UnauthorizedException('Insufficient permissions');
    }

    return true;
  }
}
