import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepo: Repository<Country>,
  ) {}

  // create(createCountryDto: CreateCountryDto) {
  //   return 'This action adds a new country';
  // }

  async findAll() {
    const countries = await this.countryRepo.find({ order: { name: 'DESC' } });
    return { countries };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} country`;
  // }

  // update(id: number, updateCountryDto: UpdateCountryDto) {
  //   return `This action updates a #${id} country`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} country`;
  // }
}
