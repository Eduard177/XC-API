import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { RefundableInvoiceReportEntity } from './entities/refundableInvoiceReport.entity';
import { IRefundableInvoiceReport } from './interfaces/RefundableInvoiceReport.interface';
import { MinorExpensesReportEntity } from './entities/minorExpensesReport.entity';
import { IMinorExpensesReport } from './interfaces/MinorExpensesReport.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('refundable')
  async findAllRefundableReports(
    @Query('userId') userId: number,
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('status') status: string,
  ): Promise<RefundableInvoiceReportEntity[]> {
    if (userId) {
      return await this.reportsService.getRefundableInvoiceReportsByUserId(
        userId,
        start,
        end,
        status,
      );
    } else {
      return await this.reportsService.getAllRefundableInvoiceReports();
    }
  }

  @Get('refundable/:id')
  async findRefundableReportById(
    @Param() id: number,
  ): Promise<RefundableInvoiceReportEntity> {
    return await this.reportsService.getRefundableInvoiceReportsById(id);
  }

  @Post('refundable')
  async createRefundableInvoiceReport(
    @Body() refundableReport: IRefundableInvoiceReport,
  ) {
    return await this.reportsService.createRefundableInvoiceReport(
      refundableReport,
    );
  }

  @Patch('refundable/:id')
  updateRefundableInvoiceReport(
    @Param() id: number,
    @Body() refundableReport: IRefundableInvoiceReport,
  ) {
    return this.reportsService.updateRefundableInvoiceReport(
      id,
      refundableReport,
    );
  }
  @Delete('refundable/:id')
  async deleteRefundableInvoiceReport(@Param() id: number) {
    return await this.reportsService.deleteRefundableInvoiceReport(id);
  }

  @Get('minor')
  async findAllMinorExpensesReports(
    @Query('userId') userId: number,
    @Query('start') start: Date,
    @Query('end') end: Date,
    @Query('status') status: string,
  ): Promise<MinorExpensesReportEntity[]> {
    if (userId) {
      return await this.reportsService.getMinorExpensesReportByUserId(
        userId,
        start,
        end,
        status,
      );
    } else {
      return await this.reportsService.getAllMinorExpensesReports();
    }
  }

  @Get('minor/:id')
  async findMinorExpensesReportById(
    @Param() id: number,
  ): Promise<MinorExpensesReportEntity> {
    return await this.reportsService.getMinorExpensesReportsById(id);
  }

  @Post('minor')
  async createMinorExpensesReport(@Body() minorReport: IMinorExpensesReport) {
    return await this.reportsService.createMinorExpensesReport(minorReport);
  }

  @Patch('minor/:id')
  updateMinorExpensesReport(
    @Param() id: number,
    @Body() minorReport: IMinorExpensesReport,
  ) {
    return this.reportsService.updateMinorExpensesReport(id, minorReport);
  }

  @Delete('minor/:id')
  async deleteMinorExpensesReport(@Param() id: number) {
    return await this.reportsService.deleteMinorExpensesReport(id);
  }

  @Get('count')
  async getReportCount(@Query() payload: any): Promise<object> {
    return await this.reportsService.getReportCount(payload.userId);
  }
}
