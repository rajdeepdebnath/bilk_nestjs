import { Module } from '@nestjs/common';
import { RetailerStatusesService } from './retailer-statuses.service';
import { RetailerStatusesController } from './retailer-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetailerStatus } from './entities/retailer-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RetailerStatus])],
  controllers: [RetailerStatusesController],
  providers: [RetailerStatusesService],
})
export class RetailerStatusesModule {}
