import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RetailersService } from './retailers.service';
import { CreateRetailerDto } from './dto/create-retailer.dto';
import { UpdateRetailerDto } from './dto/update-retailer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAllRetailersQueryDto } from './dto/get-all-retailers-query.dto';
import { RequirePermissions } from '../authorization/decorators/require-permissions.decorator';

@ApiTags('retailers')
@ApiBearerAuth()
@Controller('retailers')
export class RetailersController {
  constructor(private readonly retailersService: RetailersService) {}

  /*
  Create a new retailer
 */
  @RequirePermissions('Retailer.create')
  @Post()
  create(@Body() createRetailerDto: CreateRetailerDto) {
    return this.retailersService.create(createRetailerDto);
  }

  /* Get a filtered list of all the retailers. */
  @RequirePermissions('Retailer.read')
  @Get()
  findAll(@Query() getAllRetailersQueryDto: GetAllRetailersQueryDto) {
    return this.retailersService.findAll(getAllRetailersQueryDto);
  }

  /* Fetch an existing retailer */
  @RequirePermissions('Retailer.read')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.retailersService.findOne(+id);
  }

  /*
  Update an existing retailer
   */
  @RequirePermissions('Retailer.update')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRetailerDto: UpdateRetailerDto,
  ) {
    return this.retailersService.update(+id, updateRetailerDto);
  }

  /* Soft deletes a retailer */
  @RequirePermissions('Retailer.delete')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.retailersService.remove(id);
  }
}
