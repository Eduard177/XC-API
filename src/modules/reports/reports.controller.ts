import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RefundableInvoiceReportEntity } from './entities/refundableInvoiceReport.entity';
import { IRefundableInvoiceReport } from './interfaces/RefundableInvoiceReport.interface';
import { MinorExpensesReportEntity } from './entities/minorExpensesReport.entity';
import { IMinorExpensesReport } from './interfaces/MinorExpensesReport.interface';

@Controller('reports')
export class ReportsController {

  constructor(private readonly reportsService: ReportsService) {}

  @Get('refundable')
  async findAllRefundableReports(@Body('userId') userId: number): Promise<RefundableInvoiceReportEntity[]> {
    if (userId) {
      return await this.reportsService.getRefundableInvoiceReportsByUserId(userId);
    } else {
      return await this.reportsService.getAllRefundableInvoiceReports();
    }
  }

  @Get('refundable/:id')
  async findRefundableReportById(@Param() id: number): Promise<RefundableInvoiceReportEntity> {
    return await this.reportsService.getRefundableInvoiceReportsById(id);
  }

  @Post('refundable')
  async createRefundableInvoiceReport(@Body() refundableReport: IRefundableInvoiceReport) {
    return await this.reportsService.createRefundableInvoiceReport(refundableReport);
  }

  @Delete('refundable/:id')
  async deleteRefundableInvoiceReport(@Param() id: number) {
    return await this.reportsService.deleteRefundableInvoiceReport(id);
  }

  @Get('minor')
  async findAllMinorExpensesReports(@Body('userId') userId: number): Promise<MinorExpensesReportEntity[]> {
    if (userId) {
      return await this.reportsService.getMinorExpensesReportByUserId(userId);
    } else {
      return await this.reportsService.getAllMinorExpensesReports();
    }
  }

  @Get('minor/:id')
  async findMinorExpensesReportById(@Param() id: number): Promise<MinorExpensesReportEntity> {
    return await this.reportsService.getMinorExpensesReportsById(id);
  }

  @Post('minor')
  async createMinorExpensesReport(@Body() minorReport: IMinorExpensesReport) {
    return await this.reportsService.createMinorExpensesReport(minorReport);
  }

  @Delete('minor/:id')
  async deleteMinorExpensesReport(@Param() id: number) {
    return await this.reportsService.deleteMinorExpensesReport(id);
  }
}
