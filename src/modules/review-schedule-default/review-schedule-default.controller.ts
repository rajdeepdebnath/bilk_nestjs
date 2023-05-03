import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReviewScheduleDefaultService } from './review-schedule-default.service';
import { CreateReviewScheduleDefaultDto } from './dto/create-review-schedule-default.dto';
import { UpdateReviewScheduleDefaultDto } from './dto/update-review-schedule-default.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllReviewScheduleDefaultQueryDto } from './dto/get-all-review-schedule-default-query.dto';

@ApiBearerAuth()
@ApiTags('review-schedule-default')
@Controller('review-schedule-default')
export class ReviewScheduleDefaultController {
  constructor(
    private readonly reviewScheduleDefaultService: ReviewScheduleDefaultService,
  ) {}

  /* Create a default review schedule. For admin portal only. This can be used to populate review schedules */
  @Post()
  create(
    @Body() createReviewScheduleDefaultDto: CreateReviewScheduleDefaultDto,
  ) {
    return this.reviewScheduleDefaultService.create(
      createReviewScheduleDefaultDto,
    );
  }

  @Get()
  findAll(@Query() getAllReviewScheduleDefaultQueryDto:GetAllReviewScheduleDefaultQueryDto) {
    return this.reviewScheduleDefaultService.findAll(getAllReviewScheduleDefaultQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewScheduleDefaultService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReviewScheduleDefaultDto: UpdateReviewScheduleDefaultDto,
  ) {
    return this.reviewScheduleDefaultService.update(
      +id,
      updateReviewScheduleDefaultDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewScheduleDefaultService.remove(+id);
  }
}
