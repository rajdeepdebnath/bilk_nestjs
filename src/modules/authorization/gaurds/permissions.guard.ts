import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/modules/users/entities/user.entity';
// import { CustomRequest } from '../typing/permission-user.typing';
import { Permissions_KEY } from '../decorators/require-permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // @Inject(forwardRef(() => UsersService)) // private usersService: UsersService, // @Inject(forwardRef(() => AdminsService)) // private adminsService: AdminsService, // @Inject(forwardRef(() => CompanyAdminsService)) // private companyAdminsService: CompanyAdminsService, // private translateService: TranslateService, // private memberService: CompaniesMembersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissionsRequired = this.reflector.get<string[]>(
      Permissions_KEY,
      context.getHandler(),
    );

    // activate route if there are no permissions required
    if (!permissionsRequired?.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    // Admin is allowed to access everything
    if (user.isAdmin) {
      return true;
    }
    const userPermissions = user?.role?.permissions;

    // Consider checking the required permission with a db call
    const hasPermission = permissionsRequired?.some((permissionReq) =>
      userPermissions?.some((userPermission) => {
        const userPermissionString = `${userPermission.subjectName}.${userPermission.action}`;
        return userPermissionString === permissionReq;
      }),
    );

    if (hasPermission) {
      return !!user;
    }
    throw new ForbiddenException('User does not have required permission');
  }
}
