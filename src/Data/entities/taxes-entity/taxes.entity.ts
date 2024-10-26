import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product-entity/product.entity';

@Entity()
export class Tax {
  @PrimaryGeneratedColumn('uuid')
  taxId: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  taxName: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  taxPorcentage: number;

  @ManyToMany(() => Product, (product) => product.tax)
  product: Array<Product>;
}
