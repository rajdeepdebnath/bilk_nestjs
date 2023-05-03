import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ReviewScheduleDefault {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  retailerId: number;

  @Column()
  productCategoryName?: string;

  @Column()
  productCategoryCustomText?: string;

  @Column()
  subcategory?: string;

  @Column()
  meetingStartDate?: Date;

  @Column()
  meetingEndDate?: Date;

  @Column()
  pogReleaseDate?: Date;

  @Column()
  storeResetDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
