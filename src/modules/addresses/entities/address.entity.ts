import { Retailer } from 'src/modules/retailers/entities/retailer.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  city?: string;

  @Column()
  country?: string;

  @Column()
  regionId?: number;

  @Column()
  state?: string;

  @Column()
  street?: string;

  @Column()
  unitNumber?: string;

  @Column()
  zipCode?: string;

  @OneToOne(() => Retailer, (retailer) => retailer.address)
  public retailer?: Retailer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
