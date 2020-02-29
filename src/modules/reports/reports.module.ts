import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundableInvoiceReportRepository } from './repositories/refundableInvoiceReport.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RefundableInvoiceReportRepository])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
