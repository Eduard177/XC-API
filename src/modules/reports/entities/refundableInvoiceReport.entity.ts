import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('refundableInvoiceReport')
export class RefundableInvoiceReportEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: 'varchar', length: 255, default: 'N/A'})
  type: string;

  @Column({type: 'varchar', length: 255})
  rnc: string;

  @Column({type: 'varchar', length: 255})
  ncf: string;

  @Column({type: 'date'})
  invoiceDate: Date;

  @Column({type: 'varchar', length: 255})
  details: string;

  @Column({type: 'varchar', length: 255})
  businessType: string;

  @Column({type: 'varchar', length: 255})
  provider: string;

  @Column({type: 'varchar', length: 255})
  paymentMethod: string;

  @Column({type: 'decimal', length: 19, precision: 2})
  subTotal: number;

  @Column({type: 'decimal', length: 19, precision: 2})
  itbis: number;

  @Column({type: 'decimal', length: 19, precision: 2})
  tip: number;

  @Column({type: 'decimal', length: 19, precision: 2})
  total: number;

  @ManyToOne(type => UserEntity, user => user.refundableInvoiceReports)
  user: UserEntity;

  @Column({type: 'varchar', length: 255, default: 'Pendiente'})
  status: string;

  @Column({type: 'char', default: 'false'})
  hasTip: string;

  @Column({type: 'char', default: 'false'})
  hasItibis: string;
}
