import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'brokerage' })
export class Brokerage {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  public id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public name: string;

  @Column({
    name: 'contact_number',
    type: 'varchar',
    nullable: true,
    unique: false,
  })
  public contactNumber: string;

  @Column({
    name: 'logo_url',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  public logoUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: 'now()',
    nullable: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: 'now()',
    nullable: false,
  })
  public updatedAt: Date;
}
