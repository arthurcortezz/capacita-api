import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const contextHost = new ExecutionContextHost([req], null, ctx.getHandler());
    return super.canActivate(contextHost);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): any {
    const roles: string[] = this.reflector.get<string[]>(
      '',
      context.getHandler(),
    );
    if (
      err ||
      !user ||
      (roles && !user.privileges.some((el: any) => roles.includes(el.key)))
    ) {
      throw err || new UnauthorizedException('Não autorizado.');
    }
    return user;
  }
}
