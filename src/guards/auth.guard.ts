import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SimpleAuthGuard implements CanActivate {
  constructor(
      private configSvc: ConfigService
  ) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    if (request.headers.authorization && request.headers.authorization.toString().split(' ')[0] === 'Bearer') {
      const token: string = request.headers.authorization.toString().split(' ')[1];
      const mdwToken = this.configSvc.get<string>('MDW_TOKEN')
      if (token === mdwToken)
        return true
    }
    throw new UnauthorizedException()
  }
}
