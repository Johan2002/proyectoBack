import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730842479508 implements MigrationInterface {
  name = 'Migrations1730842479508';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_d921dad2016acbaeaaa7abc58a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" RENAME COLUMN "companyCompanyId" TO "headquarterHeadquarterId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_37754f6f704a2500ed4882d90bf" FOREIGN KEY ("headquarterHeadquarterId") REFERENCES "headquarter"("headquarterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_37754f6f704a2500ed4882d90bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" RENAME COLUMN "headquarterHeadquarterId" TO "companyCompanyId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_d921dad2016acbaeaaa7abc58a0" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
