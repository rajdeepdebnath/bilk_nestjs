import { Injectable } from '@nestjs/common';
import { CreateReviewScheduleDefaultDto } from './dto/create-review-schedule-default.dto';
import { UpdateReviewScheduleDefaultDto } from './dto/update-review-schedule-default.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewScheduleDefault } from './entities/review-schedule-default.entity';
import { Repository } from 'typeorm';
import { GetAllReviewScheduleDefaultQueryDto } from './dto/get-all-review-schedule-default-query.dto';

@Injectable()
export class ReviewScheduleDefaultService {
  constructor(
    @InjectRepository(ReviewScheduleDefault)
    private reviewScheduleDefaultRepo: Repository<ReviewScheduleDefault>,
  ) {}
  
  async create(createReviewScheduleDefaultDto: CreateReviewScheduleDefaultDto) {
    return await this.reviewScheduleDefaultRepo.save(createReviewScheduleDefaultDto);
  }

  async findAll(getAllReviewScheduleDefaultQueryDto: GetAllReviewScheduleDefaultQueryDto) {
    const reviewScheduleDefaultRespQuery = this.reviewScheduleDefaultRepo.createQueryBuilder('review_schedule_default');

    if (getAllReviewScheduleDefaultQueryDto?.categoryName) {
      reviewScheduleDefaultRespQuery.andWhere('review_schedule_default.product_category_name ILIKE :name', {
        name: `%${getAllReviewScheduleDefaultQueryDto.categoryName.trim()}%`,
      });
    }

    if (getAllReviewScheduleDefaultQueryDto?.retailerId) {
      reviewScheduleDefaultRespQuery.andWhere('review_schedule_default.retailerId = :value', {
        value: getAllReviewScheduleDefaultQueryDto.retailerId,
      });
    }

    if (getAllReviewScheduleDefaultQueryDto?.categoryId) {
      reviewScheduleDefaultRespQuery.andWhere('review_schedule_default.categoryId = :value', {
        value: getAllReviewScheduleDefaultQueryDto.categoryId,
      });
    }

    const reviewScheduleDefaultQueryResp = await reviewScheduleDefaultRespQuery
      .take(getAllReviewScheduleDefaultQueryDto.limit)
      .skip(
        (getAllReviewScheduleDefaultQueryDto.pageNo - 1) * getAllReviewScheduleDefaultQueryDto.limit,
      )
      .getManyAndCount();

    const reviewScheduleDefault = reviewScheduleDefaultQueryResp[0];
    const totalCount = reviewScheduleDefaultQueryResp[1];

    return {
      reviewScheduleDefault,
      totalCount,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewScheduleDefault`;
  }

  update(id: number, updateReviewScheduleDefaultDto: UpdateReviewScheduleDefaultDto) {
    return `This action updates a #${id} reviewScheduleDefault`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewScheduleDefault`;
  }
}
