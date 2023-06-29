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
  findAllRefundableReports(
    @Query('userId') userId: number,
    @Query() payload: any,
  ): Promise<RefundableInvoiceReportEntity[]> {
    if (userId) {
      return this.reportsService.getRefundableInvoiceReportsByUserId(
        userId,
        payload,
      );
    } else {
      return this.reportsService.getAllRefundableInvoiceReportsByDate(payload);
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
  findAllMinorExpensesReports(
    @Query('userId') userId: number,
    @Query() payload: any,
  ): Promise<MinorExpensesReportEntity[]> {
    if (userId) {
      return this.reportsService.getMinorExpensesReportByUserId(
        userId,
        payload,
      );
    } else {
      return this.reportsService.getAllMinorExpensesReportsByDate(payload);
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
    @Param() id: any,
    @Body() minorReport: any,
  ) {
    return this.reportsService.updateMinorExpensesReport(id.id, minorReport);
  }
  @Patch('minor/status/:id')
  async patchMinorExpensesReport(
    @Param() id: any,
    @Body() payload: any
  ) {
    return this.reportsService.patchMinorExpenseReport(id.id, payload.status);
  }

  @Patch('refundable/status/:id')
  async patchRefundableExpensesReport(
    @Param() id: any,
    @Body() payload: any
  ) {
    return this.reportsService.patchRefundableExpenseReport(id.id, payload.status);
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
