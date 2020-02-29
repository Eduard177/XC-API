import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {

@PrimaryGeneratedColumn('increment')
  id: number;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  fullName: string;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  office: string;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  position: string;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  companyCode: string;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  cellphone: string;

@Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  imageUrl: string;

@Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  role: string;
}
