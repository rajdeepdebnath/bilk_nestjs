import { PartialType } from '@nestjs/swagger';
import { CreateReviewScheduleDefaultDto } from './create-review-schedule-default.dto';

export class UpdateReviewScheduleDefaultDto extends PartialType(CreateReviewScheduleDefaultDto) {}
