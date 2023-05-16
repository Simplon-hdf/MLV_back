import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../../enum/roles.enum';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth.constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      return false;
    }

    const user = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    return requiredRoles.some((role) => user.role === role);
  }
}
