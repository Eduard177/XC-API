import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('refundableInvoiceReport')
export class RefundableInvoiceReportEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'N/A', nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255 })
  rnc: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  ncf: string;

  @Column({ type: 'date', nullable: false })
  invoiceDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  details: string;

  @Column({ type: 'varchar', length: 255 })
  businessType: string;

  @Column({ type: 'varchar', length: 255 })
  provider: string;

  @Column({ type: 'varchar', length: 255 })
  paymentMethod: string;

  @Column({ type: 'decimal', precision: 19, scale: 2, nullable: false })
  subTotal: number;

  @Column({ type: 'decimal', precision: 19, scale: 2 })
  itbis: number;

  @Column({ type: 'decimal', precision: 19, scale: 2 })
  tip: number;

  @Column({ type: 'decimal', precision: 19, scale: 2, nullable: false })
  total: number;

  @ManyToOne((type) => UserEntity, (user) => user.refundableInvoiceReports, {
    nullable: false,
  })
  user: UserEntity;

  @Column({ type: 'varchar', length: 255, default: 'Pendiente' })
  status: string;

  @Column({ type: 'varchar', default: 'false' })
  hasTip: boolean;

  @Column({ type: 'varchar', default: 'false' })
  hasItbis: boolean;
}
