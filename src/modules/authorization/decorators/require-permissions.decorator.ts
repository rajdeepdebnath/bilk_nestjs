import { SetMetadata } from '@nestjs/common';

export const Permissions_KEY = 'permissions';
export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(Permissions_KEY, permissions);
