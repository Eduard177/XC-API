import { Controller, Get, Header, Param, Query } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}
  @Get('download')
  @Header(
    'Content-Disposition',
    `attachment; filename=Reporte-606-${Date.now()}.xlsx`,
  )
  @Header('Content-type', 'text/xlsx')
  async downloadExcel(
    @Query() query: { status: any; start: any; end: any },
    @Query('userId') userId,
  ) {
    return this.excelService.downloadExcel(query, userId);
  }

  @Get('generate')
  async generateExcel(
    @Query('userId') userId,
    @Query() query: { status: any; start: any; end: any },
  ) {
    return this.excelService.generateExcel(query, userId);
  }
}
