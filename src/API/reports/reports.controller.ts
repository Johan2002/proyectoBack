import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':saleId/generate-pdf')
  @ApiResponse({
    status: 200,
    description: 'PDF generado exitosamente',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Header('Content-Type', 'application/pdf')
  async generatePdfReport(
    @Res() response: Response,
    @Param('saleId') saleId: string,
  ) {
    try {
      const docDefinition = await this.reportsService.getBillData(saleId);
      const pdfStream = await this.reportsService.generatePdf(docDefinition);

      response.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=factura.pdf',
      });
      response.send(pdfStream);
    } catch (error) {
      console.error('Error generating PDF:', error);
      response.status(500).send('Error generating PDF');
    }
  }
}
