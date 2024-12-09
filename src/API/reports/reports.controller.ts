import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/Data/decorators/permission.decorator';
import { EPermission } from 'src/Data/constants/permission.enum';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':saleId/generate-pdf')
  @Permissions(EPermission.ADMIN_ALL)
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

  @Get('pdf/:id')
  async getPdfFile(@Param('id') id: string, @Res() res: Response) {
    const pdfData = await this.reportsService.getPdfFileById(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="report-${id}.pdf"`,
    });
    res.status(200).send(pdfData);
  }
}
