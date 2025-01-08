import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const roles: string[] = this.reflector.get<string[]>(
      '',
      context.getHandler(),
    );

    if (
      err ||
      !user ||
      (roles && !user.privileges.some((el: any) => roles.includes(el.key)))
    ) {
      throw (
        err ||
        new UnauthorizedException(
          'É necessário estar logado para poder realizar essa ação!',
        )
      );
    }
    return user;
  }
}
