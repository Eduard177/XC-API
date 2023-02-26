import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RefundableInvoiceReportEntity } from '../../reports/entities/refundableInvoiceReport.entity';
import { MinorExpensesReportEntity } from '../../reports/entities/minorExpensesReport.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  fullName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  office: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  position: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  companyCode: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  cellphone: string;

  @Column({ type: 'varchar', length: 255 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 25, nullable: false })
  role: string;

  @OneToMany(
    (type) => RefundableInvoiceReportEntity,
    (refundableInvoice) => refundableInvoice.user,
    { onDelete: 'CASCADE' },
  )
  refundableInvoiceReports: RefundableInvoiceReportEntity[];

  @OneToMany(
    (type) => MinorExpensesReportEntity,
    (minorExpensesReportEntity) => minorExpensesReportEntity.user,
    { onDelete: 'CASCADE' },
  )
  minorExpensesReport: MinorExpensesReportEntity[];
}
