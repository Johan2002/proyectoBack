import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730470060119 implements MigrationInterface {
  name = 'Migrations1730470060119';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_112bf253789ceb9200b8b874b58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "employeeEmployeeId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_112bf253789ceb9200b8b874b58" FOREIGN KEY ("employeeEmployeeId") REFERENCES "employee"("employeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_112bf253789ceb9200b8b874b58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "employeeEmployeeId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_112bf253789ceb9200b8b874b58" FOREIGN KEY ("employeeEmployeeId") REFERENCES "employee"("employeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
