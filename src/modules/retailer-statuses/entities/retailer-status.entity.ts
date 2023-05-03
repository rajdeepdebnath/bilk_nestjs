import { Entity, PrimaryColumn } from 'typeorm';

@Entity('enum_retailer_status')
export class RetailerStatus {
  @PrimaryColumn()
  name: string;
}
