import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { UserJwtInterface } from '../../modules/authentication/interfaces/user-jwt.interface';

@Injectable()
export class HasAgreedTermServiceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let user: UserJwtInterface;
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const request = ctx.getRequest();
      user = request?.user as UserJwtInterface;
    } else if (context.getType<GqlContextType>() === 'graphql') {
      user = context.getArgByIndex(2).req.user as UserJwtInterface;
    }

    if (user && !user.acceptedAt) {
      throw new UnauthorizedException(
        'Termo de serviço',
        'Não é possível utilizar o sistema sem aceitar os termos de serviço.',
      );
    }

    return next.handle();
  }
}
