import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
    const token = request.cookies.jwt;
    console.log(token);
    if (!token) {
      return false;
    }

    const decoded = this.jwtService.verify(token, {
      secret: jwtConstants.secret,
    });
    const user = decoded;
    console.log(user);
    return requiredRoles.some((role) => user.role === role);
  }
}
