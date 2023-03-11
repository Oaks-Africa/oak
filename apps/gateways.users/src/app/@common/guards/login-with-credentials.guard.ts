import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoginWithCredentialsGuard extends AuthGuard('ccc') {
  constructor(private readonly variableName: string) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    await super.logIn(req);
    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const args = ctx.getArgs();
    req.body = { ...args, ...(args?.[this.variableName] ?? {}) };
    return req;
  }
}
