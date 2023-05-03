import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RetailerStatusesService } from './retailer-statuses.service';
import { CreateRetailerStatusDto } from './dto/create-retailer-status.dto';
import { UpdateRetailerStatusDto } from './dto/update-retailer-status.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/modules/authorization/enums/role.enum';

@ApiBearerAuth()
@ApiTags('retailer-statuses')
@Controller('retailer-statuses')
export class RetailerStatusesController {
  constructor(
    private readonly retailerStatusesService: RetailerStatusesService,
  ) {}

  // @Post()
  // create(@Body() createRetailerStatusDto: CreateRetailerStatusDto) {
  //   return this.retailerStatusesService.create(createRetailerStatusDto);
  // }

  /* Get a list of all possible statuses a retailer itself can have */
  @Get()
  findAll() {
    return this.retailerStatusesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.retailerStatusesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRetailerStatusDto: UpdateRetailerStatusDto) {
  //   return this.retailerStatusesService.update(+id, updateRetailerStatusDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.retailerStatusesService.remove(+id);
  // }
}
