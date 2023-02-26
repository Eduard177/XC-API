import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('minorExpensesReport')
export class MinorExpensesReportEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date', nullable: false })
  invoiceDate: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  place: string;

  @Column({ type: 'varchar', length: 255, default: 'N/A' })
  comment: string;

  @Column({ type: 'varchar', length: 255 })
  witnesses: string;

  @Column({ type: 'decimal', precision: 19, scale: 2, nullable: false })
  total: number;

  @Column({ type: 'varchar', length: 255, default: 'Pendiente' })
  status: string;

  @ManyToOne((type) => UserEntity, (user) => user.minorExpensesReport, {
    nullable: false,
  })
  user: UserEntity;
}
