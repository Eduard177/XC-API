import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefundableInvoiceReportRepository } from './repositories/refundableInvoiceReport.repository';
import { RefundableInvoiceReportEntity } from './entities/refundableInvoiceReport.entity';
import { IRefundableInvoiceReport } from './interfaces/RefundableInvoiceReport.interface';
import { UserEntity } from '../user/entities/user.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { MinorExpensesReportRepository } from './repositories/minorExpensesReport.repository';
import { MinorExpensesReportEntity } from './entities/minorExpensesReport.entity';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(RefundableInvoiceReportRepository)
    private readonly refundableInvoiceReportRepository: RefundableInvoiceReportRepository,
    @InjectRepository(MinorExpensesReportRepository)
    private readonly minorExpensesReportRepository: MinorExpensesReportRepository,
  ) {}

  async getAllRefundableInvoiceReports(): Promise<RefundableInvoiceReportEntity[]> {
    try {
      let reports: RefundableInvoiceReportEntity[];
      reports = await this.refundableInvoiceReportRepository.find();
      return reports;
    } catch (e) {
      throw e;
    }
  }

  async getRefundableInvoiceReportsById(id: number): Promise<RefundableInvoiceReportEntity> {
    try {
      if (!id) {
        throw new BadRequestException('AN ID MUST BE SENT');
      }
      let refundableInvoiceReport: RefundableInvoiceReportEntity;
      refundableInvoiceReport = await this.refundableInvoiceReportRepository.findOne(id);

      if (!refundableInvoiceReport) {
        throw new NotFoundException('REPORT NOT FOUND');
      }

      return refundableInvoiceReport;
    } catch (e) {
      throw e;
    }
  }

  async createRefundableInvoiceReport(payload: IRefundableInvoiceReport): Promise<RefundableInvoiceReportEntity> {
    try {
        if (!payload) {
          throw new BadRequestException('REPORT SHOULD NOT BE EMPTY');
        }
        const user = new UserEntity();
        user.id = payload.userId;
        return await this.refundableInvoiceReportRepository.save({
          id: payload.id,
          type: payload.type,
          rnc: payload.rnc,
          ncf: payload.ncf,
          invoiceDate: payload.invoiceDate,
          details: payload.details,
          businessType: payload.businessType,
          provider: payload.provider,
          paymentMethod: payload.paymentMethod,
          subTotal: payload.subTotal,
          itbis: payload.itbis,
          tip: payload.tip,
          total: payload.total,
          status: payload.status,
          hasTip: payload.hasTip,
          hasItbis: payload.hasTip,
          user,
        });
    } catch (e) {
      throw e;
    }
  }

  async deleteRefundableInvoiceReport(reportId: number): Promise<DeleteResult> {
    try {
      return await this.refundableInvoiceReportRepository.delete(reportId);
    } catch (e) {
      throw e;
    }
  }

  async getAllMinorExpensesReports(): Promise<MinorExpensesReportEntity[]> {
    try {
      let reports: MinorExpensesReportEntity[];
      reports = await this.minorExpensesReportRepository.find();
      return reports;
    } catch (e) {
      throw e;
    }
  }
}
