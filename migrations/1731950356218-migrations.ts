import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731950356218 implements MigrationInterface {
    name = 'Migrations1731950356218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory_detail" DROP CONSTRAINT "FK_d71386f307c4507f61be1a7b012"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_5ef246246203f561666d031d02e"`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" RENAME COLUMN "inventoryInventoryId" TO "productProductId"`);
        await queryRunner.query(`ALTER TABLE "inventory" RENAME COLUMN "productProductId" TO "inventoryDetailInventoryDetailId"`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" ADD CONSTRAINT "FK_e29b783e10ae7394b96974d26aa" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_2ec07a7f225465d7f265d37dee1" FOREIGN KEY ("inventoryDetailInventoryDetailId") REFERENCES "inventory_detail"("inventoryDetailId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_2ec07a7f225465d7f265d37dee1"`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" DROP CONSTRAINT "FK_e29b783e10ae7394b96974d26aa"`);
        await queryRunner.query(`ALTER TABLE "inventory" RENAME COLUMN "inventoryDetailInventoryDetailId" TO "productProductId"`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" RENAME COLUMN "productProductId" TO "inventoryInventoryId"`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_5ef246246203f561666d031d02e" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" ADD CONSTRAINT "FK_d71386f307c4507f61be1a7b012" FOREIGN KEY ("inventoryInventoryId") REFERENCES "inventory"("inventoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
