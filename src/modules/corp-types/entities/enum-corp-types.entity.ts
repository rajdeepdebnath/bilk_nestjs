import { DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('enum_corp_types')
export class EnumCorpTypes {
  @PrimaryColumn({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  public name: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
  })
  public deletedAt?: Date;
}
