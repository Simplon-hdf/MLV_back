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
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.cookie.split('=')[1];
    if (!authHeader) {
      return false;
    }
    console.log('authHeader', authHeader);
    const user = this.jwtService.verify(authHeader, {
      secret: jwtConstants.secret,
    });

    console.log('token', user);
    console.log(user.role);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
