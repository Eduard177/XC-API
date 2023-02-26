import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefundableInvoiceReportEntity } from './entities/refundableInvoiceReport.entity';
import { IRefundableInvoiceReport } from './interfaces/RefundableInvoiceReport.interface';
import { UserEntity } from '../user/entities/user.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { MinorExpensesReportEntity } from './entities/minorExpensesReport.entity';
import { IMinorExpensesReport } from './interfaces/MinorExpensesReport.interface';
import { Between, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(RefundableInvoiceReportEntity)
    private readonly refundableInvoiceReportRepository: Repository<RefundableInvoiceReportEntity>,
    @InjectRepository(MinorExpensesReportEntity)
    private readonly minorExpensesReportRepository: Repository<MinorExpensesReportEntity>,
  ) {}

  async getAllRefundableInvoiceReports(): Promise<
    RefundableInvoiceReportEntity[]
  > {
    try {
      let reports: RefundableInvoiceReportEntity[];
      reports = await this.refundableInvoiceReportRepository.find();
      return reports;
    } catch (e) {
      throw e;
    }
  }

  async getRefundableInvoiceReportsById(
    id: number,
  ): Promise<RefundableInvoiceReportEntity> {
    try {
      if (!id) {
        throw new BadRequestException('AN ID MUST BE SENT');
      }
      let refundableInvoiceReport: RefundableInvoiceReportEntity;

      refundableInvoiceReport =
        await this.refundableInvoiceReportRepository.findOne({
          where: {
            id,
          },
        });

      if (!refundableInvoiceReport) {
        throw new NotFoundException('REPORT NOT FOUND');
      }

      return refundableInvoiceReport;
    } catch (e) {
      throw e;
    }
  }

  async createRefundableInvoiceReport(
    payload: IRefundableInvoiceReport,
  ): Promise<RefundableInvoiceReportEntity> {
    if (!payload) {
      throw new BadRequestException('REPORT SHOULD NOT BE EMPTY');
    }
    const user = new UserEntity();
    user.id = payload.userId;
    return await this.refundableInvoiceReportRepository.save({
      ...payload,
      user,
    });
  }

  async updateRefundableInvoiceReport(
    id: number,
    refundable: IRefundableInvoiceReport,
  ): Promise<UpdateResult> {
    const getReport = this.getRefundableInvoiceReportsById(id);
    if (!getReport) {
      throw new NotFoundException('Report dont exist');
    }
    return this.refundableInvoiceReportRepository.update(id, {
      ...refundable,
    });
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
      return await this.minorExpensesReportRepository.find();
    } catch (e) {
      throw e;
    }
  }

  async getMinorExpensesReportsById(
    id: number,
  ): Promise<MinorExpensesReportEntity> {
    if (!id) {
      throw new BadRequestException('AN ID MUST BE SENT');
    }
    let minorReport: MinorExpensesReportEntity;
    minorReport = await this.minorExpensesReportRepository.findOne({
      where: {
        id,
      },
    });

    if (!minorReport) {
      throw new NotFoundException('REPORT NOT FOUND');
    }
    return minorReport;
  }

  async createMinorExpensesReport(
    payload: IMinorExpensesReport,
  ): Promise<MinorExpensesReportEntity> {
    if (!payload) {
      throw new BadRequestException('REPORT SHOULD NOT BE EMPTY');
    }
    const user = new UserEntity();
    user.id = payload.userId;
    return await this.minorExpensesReportRepository.save({
      ...payload,
      user,
    });
  }

  async updateMinorExpensesReport(
    id: number,
    minorReport: IMinorExpensesReport,
  ): Promise<UpdateResult> {
    const getReport = this.getMinorExpensesReportsById(id);
    if (!getReport) {
      throw new NotFoundException('Report dont exist');
    }
    return this.minorExpensesReportRepository.update(id, {
      ...minorReport,
    });
  }

  async deleteMinorExpensesReport(reportId: number): Promise<DeleteResult> {
    try {
      return await this.minorExpensesReportRepository.delete(reportId);
    } catch (e) {
      throw e;
    }
  }

  async getRefundableInvoiceReportsByUserId(
    userId: number,
    startDate: Date,
    endDate: Date,
    status: string,
  ): Promise<RefundableInvoiceReportEntity[]> {
    if (!userId) {
      throw new BadRequestException('AN ID MUST BE SENT');
    }
    // @ts-ignore
    return await this.refundableInvoiceReportRepository.find({
      where: [
        {
          user: { id: userId },
          invoiceDate: Between(startDate, endDate),
          status,
        },
      ],
    });
  }

  async getMinorExpensesReportByUserId(
    userId: number,
    startDate: Date,
    endDate: Date,
    status: string,
  ): Promise<MinorExpensesReportEntity[]> {
    if (!userId) {
      throw new BadRequestException('AN ID MUST BE SENT');
    }
    return await this.minorExpensesReportRepository.find({
      where: [
        {
          user: { id: userId },
          invoiceDate: Between(startDate, endDate),
          status,
        },
      ],
    });
  }

  async getReportCount(userId): Promise<object> {
    const minorExpensesReports = await this.minorExpensesReportRepository.count(
      { where: { user: { id: userId } } },
    );
    const refundableReports =
      await this.refundableInvoiceReportRepository.count({
        where: { user: { id: userId } },
      });
    return {
      pending: 0,
      approved: 0,
      total: minorExpensesReports + refundableReports,
    };
  }
}
