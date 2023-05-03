import { Address } from 'src/modules/addresses/entities/address.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Retailer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bio: string;

  @Column()
  founded: string;

  @Column()
  logoUrl: string;

  @Column()
  name: string;

  @Column()
  revenue: string;

  @Column()
  employeeCount: number;

  @Column()
  storeCount: number;

  @Column()
  website: string;

  @Column()
  exclusiveAccessBrokerId: number;

  @Column()
  status: string;

  @Column()
  regionId: number;

  @Column()
  country: string;

  @Column()
  addressId: number;

  @OneToOne(() => Address, (address) => address.retailer, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'address_id' })
  public address?: Address;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
