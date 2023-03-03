import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { UserModule } from '../user/user.module';
import { ReportsModule } from '../reports/reports.module';

@Module({
  imports: [UserModule, ReportsModule],
  providers: [ExcelService],
  controllers: [ExcelController],
})
export class ExcelModule {}
