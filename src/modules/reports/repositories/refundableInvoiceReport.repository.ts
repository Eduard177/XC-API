import { EntityRepository, Repository } from 'typeorm';
import {RefundableInvoiceReportEntity} from '../entities/refundableInvoiceReport.entity';

@EntityRepository(RefundableInvoiceReportEntity)
export class RefundableInvoiceReportRepository extends Repository<RefundableInvoiceReportEntity> {}
