// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   ManyToOne,
//   JoinColumn,
// } from 'typeorm';
// import { Sale } from '../sale-entity/sale.entity';
// import { Product } from '../product-entity/product.entity';

// @Entity()
// export class ProductSale {
//   @PrimaryGeneratedColumn()
//   productSaleId: number;

//   @ManyToOne(() => Sale, (sale) => sale.productSales, {
//     nullable: false,
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn()
//   sale: Sale;

//   @ManyToOne(() => Product, { nullable: false })
//   @JoinColumn()
//   product: Product;

//   @Column()
//   quantity: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   totalPrice: number;
// }
