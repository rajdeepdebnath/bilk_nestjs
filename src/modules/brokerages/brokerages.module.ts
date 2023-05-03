import { Module } from '@nestjs/common';
import { BrokeragesService } from './brokerages.service';
import { BrokeragesController } from './brokerages.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Brokerage } from "./entities/brokerage.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Brokerage])],
  controllers: [BrokeragesController],
  providers: [BrokeragesService],
  exports: [BrokeragesService],
})
export class BrokeragesModule {}
