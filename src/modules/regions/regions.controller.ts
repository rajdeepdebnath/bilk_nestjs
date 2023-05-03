import { Controller, Get, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { Role } from '../authorization/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetRegionsQueryDto } from './dto/get-regions-query.dto';

@ApiTags('regions')
@ApiBearerAuth()
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  /* Get a list of all supported regions filterable by country */
  @Get()
  findAll(@Query() body: GetRegionsQueryDto) {
    return this.regionsService.findAll(body);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.regionsService.findOne(+id);
  // }
}
