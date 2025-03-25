/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // ✅ Usa Reflector de NestJS, no de '@meisjs/core'
import { UserRoleEnum } from '../../users/entities/user.entity'; // Asegúrate de importar tu enum de roles

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // ✅ Reflector es provisto por NestJS

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Usuario del token JWT

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Acceso denegado: Rol no autorizado');
    }
    return true;
  }
}