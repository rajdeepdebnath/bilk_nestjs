import { Injectable } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { Brand } from "./entities/brand.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { query } from "express";

@Injectable()
export class BrandsService {
  constructor (
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>
  ) {}

  createBrandName (name: string) {
    return this.brandRepo.save({ name });
  }

  findAll () {
    return `This action returns all brands`;
  }

  findOne (id: number) {
    return `This action returns a #${id} brand`;
  }

  async isValidBrand (name: string) {
    const query = this.brandRepo.createQueryBuilder("brand");
    const user = await query
      .where("brand.name = :name", { name })
      .getOne();
    return !!user;
  }

  async findOneByName (name: string) {
    return await this.brandRepo.findOneBy({ name });
  }

  update (id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove (id: number) {
    return `This action removes a #${id} brand`;
  }
}
