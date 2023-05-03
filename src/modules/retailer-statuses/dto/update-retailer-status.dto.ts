import { PartialType } from '@nestjs/swagger';
import { CreateRetailerStatusDto } from './create-retailer-status.dto';

export class UpdateRetailerStatusDto extends PartialType(CreateRetailerStatusDto) {}
