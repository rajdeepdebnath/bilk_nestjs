import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '../authorization/enums/role.enum';
import { BrokeragesService } from './brokerages.service';
import { CreateBrokerageDto } from './dto/create-brokerage.dto';
import { UpdateBrokerageDto } from './dto/update-brokerage.dto';

@ApiBearerAuth()
@ApiTags('brokerages')
@Controller('brokerages')
export class BrokeragesController {
  constructor(private readonly brokeragesService: BrokeragesService) {}

  /* Get list of all brokers */
  // @Get()
  // findAll() {
  //   return this.brokeragesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.brokeragesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateBrokerageDto: UpdateBrokerageDto,
  // ) {
  //   return this.brokeragesService.update(+id, updateBrokerageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.brokeragesService.remove(+id);
  // }
}
