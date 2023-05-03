import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './gaurds/permissions.guard';

@Module({
  controllers: [],
  providers: [
    AuthorizationService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AuthorizationModule {}
