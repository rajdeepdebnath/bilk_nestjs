import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { BrandsModule } from './modules/brands/brands.module';
import { BrokeragesModule } from './modules/brokerages/brokerages.module';
import { CorpTypesModule } from './modules/corp-types/corp-types.module';
import { configService } from './config/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { RetailersModule } from './modules/retailers/retailers.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { S3UploaderModule } from './modules/s3-uploader/s3-uploader.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { CountriesModule } from './modules/countries/countries.module';
import { RegionsModule } from './modules/regions/regions.module';
import { RetailerStatusesModule } from './modules/retailer-statuses/retailer-statuses.module';
import { EnumCompanyPermissionModule } from './modules/enum-company-permission/enum-company-permission.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { ReviewScheduleDefaultModule } from './modules/review-schedule-default/review-schedule-default.module';

@Module({
  imports: [
    MulterModule.register({
      limits: { fieldSize: 20971520, fileSize: 20971520 },
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    AddressesModule,
    AuthorizationModule,
    BrandsModule,
    BrokeragesModule,
    CountriesModule,
    CorpTypesModule,
    FileUploadModule,
    RetailersModule,
    RetailerStatusesModule,
    RegionsModule,
    S3UploaderModule,
    UsersModule,
    EnumCompanyPermissionModule,
    RolesModule,
    PermissionsModule,
    ReviewScheduleDefaultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
