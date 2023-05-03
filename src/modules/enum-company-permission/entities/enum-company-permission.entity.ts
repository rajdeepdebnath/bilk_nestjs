import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class EnumCompanyPermission {
  @PrimaryColumn()
  name: string;
}
