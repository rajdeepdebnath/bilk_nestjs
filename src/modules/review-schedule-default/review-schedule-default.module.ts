import { Module } from '@nestjs/common';
import { ReviewScheduleDefaultService } from './review-schedule-default.service';
import { ReviewScheduleDefaultController } from './review-schedule-default.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewScheduleDefault } from './entities/review-schedule-default.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewScheduleDefault])],
  controllers: [ReviewScheduleDefaultController],
  providers: [ReviewScheduleDefaultService],
})
export class ReviewScheduleDefaultModule {}
