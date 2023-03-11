import { Controller, Get, Header, Query, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}
  @Get('download')
  @Header(
    'Content-Disposition',
    `attachment; filename=Reporte-606-${Date.now()}.xlsx`,
  )
  @Header(
    'Content-type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  async downloadExcel(
    @Query() query: { status: any; start: any; end: any },
    @Query('userId') userId,
    @Res() response: Response,
  ) {
    return response.send(await this.excelService.downloadExcel(query, userId));
  }

  @Get('generate')
  async generateExcel(
    @Query('userId') userId,
    @Query() query: { status: any; start: any; end: any },
  ) {
    return this.excelService.generateExcel(query, userId);
  }
}
