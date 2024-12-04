import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PdfFile } from 'src/Data/entities/pdf-entity/pdf.entity';
import { Product } from 'src/Data/entities/product-entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  @InjectRepository(PdfFile)
  private readonly pdfFileRepository: Repository<PdfFile>;
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  private readonly logger = new Logger(TasksService.name);

  @Cron('0 0 * * 0')
  async DataCleanupPdf() {
    const count = await this.pdfFileRepository.count();
    if (count > 0) {
      await this.pdfFileRepository.clear();
      this.logger.debug('Registros eliminados.');
    } else {
      this.logger.debug('No hay registros en esta tabla.');
    }
  }

  @Cron('0 0 * * 0')
  async stockRefill() {
    const products = await this.productRepository.find({
      select: ['productAmount', 'productName'],
    });

    products.forEach((product) => {
      if (product.productAmount <= 100) {
        this.logger.debug(
          `Solo quedan ${product.productAmount} unidades de ${product.productName}`,
        );
      }
    });
  }
}
