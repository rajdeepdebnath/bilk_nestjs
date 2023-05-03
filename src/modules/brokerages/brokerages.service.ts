import { Injectable } from '@nestjs/common';
import { UpdateBrokerageDto } from './dto/update-brokerage.dto';
import { Brokerage } from './entities/brokerage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BrokeragesService {
  constructor(
    @InjectRepository(Brokerage)
    private brokerageRepo: Repository<Brokerage>,
  ) {}
  async createBrokerageName(name: string) {
    return await this.brokerageRepo.save({ name });
  }

  // findAll() {
  //   return `This action returns all brokerages`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} brokerage`;
  // }

  async findOneByName(name: string) {
    return await this.brokerageRepo.findOneBy({ name });
  }

  // update(id: number, updateBrokerageDto: UpdateBrokerageDto) {
  //   return `This action updates a #${id} brokerage`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} brokerage`;
  // }
}
