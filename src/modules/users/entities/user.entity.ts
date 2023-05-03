import { Role } from 'src/modules/roles/entities/role.entity';
import { PasswordService } from 'src/shared/password.service';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  public id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
    unique: false,
  })
  public firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
    unique: false,
  })
  public lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public email: string;

  @Column({
    name: 'job_title',
    type: 'varchar',
    nullable: true,
    unique: false,
  })
  public jobTitle?: string;

  @Column({
    select: false,
    name: 'password',
    type: 'varchar',
    nullable: false,
    unique: false,
  })
  public password: string;

  @Column({
    name: 'contact_number',
    type: 'varchar',
    nullable: true,
    unique: false,
  })
  public contactNumber?: string;

  @Column({
    name: 'photo_url',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  public photoUrl?: string;

  @Column({ default: true })
  public isActive: boolean;

  @Column({
    name: 'email_confirmed_at',
    type: 'timestamptz',
    nullable: true,
  })
  public emailConfirmedAt?: Date;

  @Column({
    name: 'brokerage_id',
    type: 'int',
    nullable: true,
    unique: false,
  })
  public brokerageId?: number;

  @Column({
    name: 'brand_id',
    type: 'int',
    nullable: true,
    unique: false,
  })
  public brandId?: number;

  @Column()
  public companyPermission?: string;

  @Column({
    nullable: false,
    default: false,
  })
  isAdmin: boolean;

  @Column()
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

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

  // @DeleteDateColumn({
  //   name: 'deleted_at',
  //   type: 'timestamptz',
  //   nullable: true,
  // })
  // public deletedAt?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await new PasswordService().hashPassword(this.password);
  }
}
