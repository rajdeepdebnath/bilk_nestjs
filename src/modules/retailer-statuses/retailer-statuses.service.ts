import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRetailerStatusDto } from './dto/create-retailer-status.dto';
import { UpdateRetailerStatusDto } from './dto/update-retailer-status.dto';
import { RetailerStatus } from './entities/retailer-status.entity';

@Injectable()
export class RetailerStatusesService {
  constructor(
    @InjectRepository(RetailerStatus)
    private retailerStatusRepo: Repository<RetailerStatus>,
  ) {}
  // create(createRetailerStatusDto: CreateRetailerStatusDto) {
  //   return 'This action adds a new retailerStatus';
  // }

  async findAll() {
    let retailerStatuses: RetailerStatus[] = [];
    retailerStatuses = await this.retailerStatusRepo.find({
      order: { name: 'asc' },
    });
    return { retailerStatuses };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} retailerStatus`;
  // }

  // update(id: number, updateRetailerStatusDto: UpdateRetailerStatusDto) {
  //   return `This action updates a #${id} retailerStatus`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} retailerStatus`;
  // }
}
