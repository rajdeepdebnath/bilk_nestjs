import { Module } from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { RetailersController } from './retailers.controller';
import { Retailer } from './entities/retailer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Retailer])],
  controllers: [RetailersController],
  providers: [RetailersService],
})
export class RetailersModule {}
