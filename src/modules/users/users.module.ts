import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EnumCorpTypes } from '../corp-types/entities/enum-corp-types.entity';
import { BrandsModule } from '../brands/brands.module';
import { BrokeragesModule } from '../brokerages/brokerages.module';
import { PasswordService } from 'src/shared/password.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([EnumCorpTypes]),
    BrandsModule,
    BrokeragesModule,
    AuthModule,
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
