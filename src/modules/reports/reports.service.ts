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

  async getAllRefundableInvoiceReportsByDate(payload: {
    status: any;
    start: any;
    end: any;
  }): Promise<RefundableInvoiceReportEntity[]> {
    try {
      let reports: RefundableInvoiceReportEntity[];
      reports = await this.refundableInvoiceReportRepository.find({
        where: {
          status: payload.status,
          invoiceDate: Between(payload.start, payload.end),
        },
        relations: ['user'],
      });
      return reports;
    } catch (e) {
      throw new BadRequestException('SERVER ERROR');
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
          relations: ['user'],
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

  async getAllMinorExpensesReportsByDate(payload: {
    status: any;
    start: any;
    end: any;
  }): Promise<MinorExpensesReportEntity[]> {
    try {
      let reports: MinorExpensesReportEntity[];
      reports = await this.minorExpensesReportRepository.find({
        where: {
          status: payload.status,
          invoiceDate: Between(payload.start, payload.end),
        },
        relations: ['user'],
      });
      return reports;
    } catch (e) {
      throw new BadRequestException('SERVER ERROR');
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
      relations: ['user'],
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
    minorReport: any,
  ): Promise<UpdateResult> {
    const getReport = await this.getMinorExpensesReportsById(id);
    if (!getReport) {
      throw new NotFoundException('Report dont exist');
    }
    return this.minorExpensesReportRepository.save({
      id,
      ...minorReport,
    });
  }

  async patchRefundableExpenseReport(id: any, status: any) {
    const getReport = await this.getRefundableInvoiceReportsById(id);
    if (!getReport) {
      throw new NotFoundException('Report dont exist');
    }
    getReport.status = status;
    return await getReport.save();
  }
  async patchMinorExpenseReport(id: any, status: any) {
    const getReport = await this.getMinorExpensesReportsById(id);
    if (!getReport) {
      throw new NotFoundException('Report dont exist');
    }
    getReport.status = status;
    return await getReport.save();
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
    payload: {
      start: Date;
      end: Date;
      status: string;
    },
  ): Promise<RefundableInvoiceReportEntity[]> {
    if (!userId) {
      throw new BadRequestException('AN ID MUST BE SENT');
    }
    // @ts-ignore
    return await this.refundableInvoiceReportRepository.find({
      where: [
        {
          user: { id: userId },
          invoiceDate: Between(payload.start, payload.end),
          status: payload.status,
        },
      ],
    });
  }

  async getMinorExpensesReportByUserId(
    userId: number,
    payload: {
      start: Date;
      end: Date;
      status: string;
    },
  ): Promise<MinorExpensesReportEntity[]> {
    if (!userId) {
      throw new BadRequestException('AN ID MUST BE SENT');
    }
    return await this.minorExpensesReportRepository.find({
      where: [
        {
          user: { id: userId },
          invoiceDate: Between(payload.start, payload.end),
          status: payload.status,
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
