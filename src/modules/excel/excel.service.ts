import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { Workbook } from 'exceljs';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class ExcelService {
  constructor(
    private readonly userServices: UserService,
    private readonly reportService: ReportsService,
  ) {}

  async generateExcel(
    payload: { status: any; start: any; end: any },
    userId: number,
  ) {
    const user = await this.userServices.get(userId);
    const workbook = new Workbook();
    const file = await workbook.xlsx.readFile(
      __dirname.replace('/dist', '') + '/template.xlsx',
    );

    await this.generateExcelAllReemborsables(payload, file, user);
    await this.generateExcelAllMinorExpenses(payload, file, user);
    return file.xlsx.writeBuffer({ useStyles: true });
  }
  async generateExcelAllReemborsables(
    payload: {
      status: any;
      start: any;
      end: any;
    },
    file: Workbook,
    user: UserEntity,
  ) {
    const sheet = file.getWorksheet('REEMBORSABLES');

    const reports =
      user.role === 'Administrator'
        ? await this.reportService.getAllRefundableInvoiceReportsByDate(payload)
        : await this.reportService.getRefundableInvoiceReportsByUserId(
            user.id,
            payload,
          );

    for (const report of reports) {
      sheet.addRow([
        '',
        report.rnc,
        report.provider,
        '',
        report.businessType,
        report.ncf,
        '',
        report.invoiceDate,
        report.invoiceDate[2],
        report.invoiceDate,
        report.invoiceDate[2],
        report.subTotal,
        '',
        report.total,
        report.itbis,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        report.tip,
        report.paymentMethod,
      ]);
    }
  }

  async generateExcelAllMinorExpenses(
    payload: {
      status: any;
      start: any;
      end: any;
    },
    file: Workbook,
    user: UserEntity,
  ) {
    const sheet = file.getWorksheet('MENORES');

    const reports =
      user.role === 'Administrator'
        ? await this.reportService.getAllMinorExpensesReportsByDate(payload)
        : await this.reportService.getMinorExpensesReportByUserId(
            user.id,
            payload,
          );

    for (const report of reports) {
      sheet.addRow([
        report.invoiceDate,
        report.description,
        report.total,
        report.comment,
      ]);
    }
  }

  downloadExcel(
    payload: { status: any; start: any; end: any },
    userId: number,
  ): Promise<any> {
    return this.generateExcel(payload, userId);
  }
}
