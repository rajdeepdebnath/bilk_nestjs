import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';

export const LoggedInUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
