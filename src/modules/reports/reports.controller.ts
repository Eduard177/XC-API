import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RefundableInvoiceReportEntity } from './entities/refundableInvoiceReport.entity';
import { IRefundableInvoiceReport } from './interfaces/RefundableInvoiceReport.interface';

@Controller('reports')
export class ReportsController {

  constructor(private readonly reportsService: ReportsService) {}

  @Get('refundable')
  async findAllReports(): Promise<RefundableInvoiceReportEntity[]> {
    return await this.reportsService.getAllRefundableInvoiceReports();
  }

  @Get('refundable/:id')
  async findReportById(@Param() id: number): Promise<RefundableInvoiceReportEntity> {
    return await this.reportsService.getRefundableInvoiceReportsById(id);
  }

  @Post('refundable')
  async createRefundableInvoiceReport(@Body() refundableReport: IRefundableInvoiceReport) {
    return await this.reportsService.createRefundableInvoiceReport(refundableReport);
  }

  @Put('refundable')
  async updateRefundableInvoiceReport(@Body() refundableReport: IRefundableInvoiceReport) {
    return await this.reportsService.createRefundableInvoiceReport(refundableReport);
  }

  @Delete('refundable/:id')
  async deleteRefundableInvoiceReport(@Param() id: number) {
    return await this.reportsService.deleteRefundableInvoiceReport(id);
  }
}
