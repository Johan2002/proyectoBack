import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731940735168 implements MigrationInterface {
    name = 'Migrations1731940735168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inventory_detail" ("inventoryDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantityInicial" integer NOT NULL, "quantityFinal" integer NOT NULL, "quantitySale" integer NOT NULL, "inventoryDate" TIMESTAMP NOT NULL DEFAULT now(), "inventoryInventoryId" uuid, CONSTRAINT "PK_548aee654c67e58b157fe499be6" PRIMARY KEY ("inventoryDetailId"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("inventoryId" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "productProductId" uuid, "employeeEmployeeId" uuid, "headquarterHeadquarterId" uuid, CONSTRAINT "PK_6d13f7a580a9165402ed7978bc7" PRIMARY KEY ("inventoryId"))`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" ADD CONSTRAINT "FK_d71386f307c4507f61be1a7b012" FOREIGN KEY ("inventoryInventoryId") REFERENCES "inventory"("inventoryId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_5ef246246203f561666d031d02e" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_2022b675df47cc578c11d253d2d" FOREIGN KEY ("employeeEmployeeId") REFERENCES "employee"("employeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_801c62313f61c4cdf93a96d9b94" FOREIGN KEY ("headquarterHeadquarterId") REFERENCES "headquarter"("headquarterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_801c62313f61c4cdf93a96d9b94"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_2022b675df47cc578c11d253d2d"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_5ef246246203f561666d031d02e"`);
        await queryRunner.query(`ALTER TABLE "inventory_detail" DROP CONSTRAINT "FK_d71386f307c4507f61be1a7b012"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "inventory_detail"`);
    }

}
