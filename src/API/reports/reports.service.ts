import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import PdfPrinter from 'pdfmake/src/printer';
import { SaleView } from 'src/Data/entities/view/sale-view.entity';
import { billReport } from './documents/bill.report';
import { PdfFile } from 'src/Data/entities/pdf-entity/pdf.entity';

@Injectable()
export class ReportsService {
  @InjectRepository(SaleView)
  private saleViewRepository: Repository<SaleView>;
  @InjectRepository(PdfFile)
  private pdfFileRepository: Repository<PdfFile>;

  async generatePdf(docDefinition: TDocumentDefinitions): Promise<Buffer> {
    const fonts = {
      Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf',
      },
    };

    const printer = new PdfPrinter(fonts);
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });

    await this.savePdfToDatabase(pdfBuffer);

    return pdfBuffer;
  }

  async getPdfFileById(id: string): Promise<Buffer> {
    const pdfFile = await this.pdfFileRepository.findOne({ where: { id } });
    if (!pdfFile) {
      throw new NotFoundException('PDF file not found');
    }
    return pdfFile.fileData;
  }

  async getBillData(saleId: string): Promise<TDocumentDefinitions> {
    try {
      const saleData = await this.saleViewRepository.findOne({
        where: { saleId },
      });
      if (!saleData) {
        throw new Error('Sale data not found');
      }

      return billReport(saleData);
    } catch (error) {
      console.error('Error when bringing sales data: ', error);
      throw new Error('No sales data found.');
    }
  }

  private async savePdfToDatabase(pdfBuffer: Buffer): Promise<void> {
    const pdfFile = new PdfFile();
    pdfFile.fileData = pdfBuffer;

    await this.pdfFileRepository.save(pdfFile);
  }
}
