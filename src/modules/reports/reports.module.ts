import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundableInvoiceReportEntity } from './entities/refundableInvoiceReport.entity';
import { MinorExpensesReportEntity } from './entities/minorExpensesReport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RefundableInvoiceReportEntity, MinorExpensesReportEntity])],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
