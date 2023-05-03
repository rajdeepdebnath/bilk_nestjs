import { JwtStrategy } from './jwt.strategy';
import { EntityManager } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { PasswordService } from 'src/shared/password.service';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './gaurds/jwt.auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: configService.getValue('JWT_SECRET_KEY'),
      signOptions: {
        expiresIn: configService.getValue('JWT_EXPIRY_TIME'),
      },
    }),
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [
    EntityManager,
    AuthService,
    PasswordService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
