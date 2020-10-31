import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundableInvoiceReportRepository } from './repositories/refundableInvoiceReport.repository';
import { MinorExpensesReportRepository } from './repositories/minorExpensesReport.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RefundableInvoiceReportRepository, MinorExpensesReportRepository])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
