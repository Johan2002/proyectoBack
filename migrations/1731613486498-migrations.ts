import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731613486498 implements MigrationInterface {
    name = 'Migrations1731613486498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("permissionId" uuid NOT NULL DEFAULT uuid_generate_v4(), "permissionName" character varying NOT NULL, CONSTRAINT "UQ_d89e1dadfa403bfefa4d49f7ecf" UNIQUE ("permissionName"), CONSTRAINT "PK_86b314be9c1be5c62b3a9d97ae4" PRIMARY KEY ("permissionId"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("rolId" uuid NOT NULL DEFAULT uuid_generate_v4(), "rolName" character varying NOT NULL, "rolDescription" character varying NOT NULL, "rolStatus" boolean NOT NULL, CONSTRAINT "UQ_5ba1e853e4f23d5d81090717b09" UNIQUE ("rolName"), CONSTRAINT "PK_facc3d8a3785a82fbae5b77ed01" PRIMARY KEY ("rolId"))`);
        await queryRunner.query(`CREATE TABLE "sale_detail" ("saleDetailId" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "unitPrice" numeric(10,2) NOT NULL, "subtotal" numeric(10,2) NOT NULL, "totalTaxes" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "saleSaleId" uuid, "productProductId" uuid NOT NULL, CONSTRAINT "PK_d508e7c5bb31f30b0bbbca121d5" PRIMARY KEY ("saleDetailId"))`);
        await queryRunner.query(`CREATE TABLE "tax" ("taxId" uuid NOT NULL DEFAULT uuid_generate_v4(), "taxName" character varying(255) NOT NULL, "taxPorcentage" numeric(5,2) NOT NULL, CONSTRAINT "UQ_6899fb8bf11455512430a85701e" UNIQUE ("taxName"), CONSTRAINT "PK_0434ce9598f6667b9b6cde56c92" PRIMARY KEY ("taxId"))`);
        await queryRunner.query(`CREATE TABLE "product" ("productId" uuid NOT NULL DEFAULT uuid_generate_v4(), "productCode" character varying NOT NULL, "productName" character varying NOT NULL, "productPrice" numeric NOT NULL, "productUnitValue" numeric(10,2) NOT NULL, "productAmount" integer NOT NULL, "productDescription" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierSupplierId" uuid NOT NULL, CONSTRAINT "UQ_a3aead4d2b7d774d4b7e6a6c7b2" UNIQUE ("productCode"), CONSTRAINT "UQ_faeabc94d0778daea8ed0a8a3c5" UNIQUE ("productName"), CONSTRAINT "UQ_f08935a9e692a104c40cf36749a" UNIQUE ("productCode", "productName", "supplierSupplierId"), CONSTRAINT "PK_429540a50a9f1fbf87efd047f35" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("supplierId" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplierNit" character varying NOT NULL, "supplierName" character varying NOT NULL, "supplierAddress" character varying NOT NULL, "supplierPhone" character varying NOT NULL, "supplierEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "companyCompanyId" uuid NOT NULL, CONSTRAINT "UQ_12a4a94a87501ef460e1379bcb9" UNIQUE ("supplierNit"), CONSTRAINT "UQ_4ad95bc491940d0f8ec0cb3d8c4" UNIQUE ("supplierName"), CONSTRAINT "UQ_8ea4465b420ebf556be80e75c0f" UNIQUE ("supplierPhone"), CONSTRAINT "UQ_46337fcd5d6b4e6905e83c03018" UNIQUE ("supplierEmail"), CONSTRAINT "UQ_e795a857e310ad2704f49c1d227" UNIQUE ("supplierNit", "supplierName", "supplierAddress", "supplierPhone", "supplierEmail", "companyCompanyId"), CONSTRAINT "PK_6929210b20fd777238ad043fc21" PRIMARY KEY ("supplierId"))`);
        await queryRunner.query(`CREATE TABLE "headquarter" ("headquarterId" uuid NOT NULL DEFAULT uuid_generate_v4(), "headquarterName" character varying NOT NULL, "headquarterAddress" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "companyCompanyId" uuid NOT NULL, CONSTRAINT "UQ_1b9ba2c7f8d1a487539e7c14452" UNIQUE ("headquarterName"), CONSTRAINT "UQ_3758ed7a4ccb6fc7675298fb0d9" UNIQUE ("headquarterAddress"), CONSTRAINT "PK_eef42eabb0258e6a3d0aea4a971" PRIMARY KEY ("headquarterId"))`);
        await queryRunner.query(`CREATE TABLE "company" ("companyId" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyNit" character varying NOT NULL, "companyName" character varying NOT NULL, "companyAddress" character varying NOT NULL, "companyPhone" character varying NOT NULL, "companyEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d60aed68186c02527f702b1210a" UNIQUE ("companyNit"), CONSTRAINT "UQ_a7018eb2ac7b827608ba6856ca7" UNIQUE ("companyName"), CONSTRAINT "UQ_0a71962dcc93edc46331ed5b774" UNIQUE ("companyAddress"), CONSTRAINT "UQ_a3e0ceaf09a57cffdfe25f3333a" UNIQUE ("companyPhone"), CONSTRAINT "UQ_f0641328989fcb4a92496a07c11" UNIQUE ("companyEmail"), CONSTRAINT "PK_81611e86d930483997273420166" PRIMARY KEY ("companyId"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("customerId" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerIdentity" character varying NOT NULL, "customerName" character varying NOT NULL, "customerLastname" character varying NOT NULL, "customerAddress" character varying NOT NULL, "customerPhone" character varying NOT NULL, "customerEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "companyCompanyId" uuid, CONSTRAINT "UQ_c90ef372576cce10feebd245064" UNIQUE ("customerIdentity"), CONSTRAINT "UQ_f7c35b063bdff0e2b2fd1e08fcb" UNIQUE ("customerPhone"), CONSTRAINT "UQ_fbeb14502d4d7af4335187350f2" UNIQUE ("customerEmail"), CONSTRAINT "UQ_4e47fef5f7067a6913b9d28c477" UNIQUE ("customerIdentity", "customerName", "customerLastname", "customerEmail", "customerPhone", "companyCompanyId"), CONSTRAINT "PK_71302d30c27acbf513b3d74f81c" PRIMARY KEY ("customerId"))`);
        await queryRunner.query(`CREATE TABLE "sale" ("saleId" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" numeric(10,2) NOT NULL, "totalTaxes" numeric(10,2) NOT NULL, "saleTotalPrice" numeric(10,2), "salePaymentMethod" character varying NOT NULL, "saleDate" TIMESTAMP NOT NULL DEFAULT now(), "employeeEmployeeId" uuid NOT NULL, "customerCustomerId" uuid NOT NULL, "headquarterHeadquarterId" uuid NOT NULL, CONSTRAINT "PK_61e9fc39f22df5682850ea649f2" PRIMARY KEY ("saleId"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("employeeId" uuid NOT NULL DEFAULT uuid_generate_v4(), "employeeIdentity" character varying NOT NULL, "employeeName" character varying NOT NULL, "employeeLastname" character varying NOT NULL, "employeeAddress" character varying NOT NULL, "employeePhone" character varying NOT NULL, "employeeEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "headquarterHeadquarterId" uuid NOT NULL, CONSTRAINT "UQ_b754d86da377847dab57d1a0ee4" UNIQUE ("employeeIdentity"), CONSTRAINT "UQ_0f9bb021c4d80d89e23a1daaf14" UNIQUE ("employeePhone"), CONSTRAINT "UQ_8d0b30f80c3b943a34eccaebc18" UNIQUE ("employeeEmail"), CONSTRAINT "PK_cd21151b14974c7a24e8c24df28" PRIMARY KEY ("employeeId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "userEmail" character varying NOT NULL, "userPassword" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "employeeEmployeeId" uuid, "rolRolId" uuid NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_85432bb369f1a54116c4e4d2ee2" UNIQUE ("userEmail"), CONSTRAINT "REL_112bf253789ceb9200b8b874b5" UNIQUE ("employeeEmployeeId"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "pdf_file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileData" bytea NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_755efe31cd4ebf040dc679c3d26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_rol" ("rolRolId" uuid NOT NULL, "permissionPermissionId" uuid NOT NULL, CONSTRAINT "PK_81c982d39af103eb76bbb7d71fd" PRIMARY KEY ("rolRolId", "permissionPermissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_09dd5ff578b95b8f302263d1d6" ON "permission_rol" ("rolRolId") `);
        await queryRunner.query(`CREATE INDEX "IDX_12acb0ce2f8509b1802d19c0e2" ON "permission_rol" ("permissionPermissionId") `);
        await queryRunner.query(`CREATE TABLE "product_tax" ("productProductId" uuid NOT NULL, "taxTaxId" uuid NOT NULL, CONSTRAINT "PK_9719f8fab9ae2a0a35ca27e513f" PRIMARY KEY ("productProductId", "taxTaxId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0703beddc1b20f2812d56516cf" ON "product_tax" ("productProductId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0e349177fe408d8390320e4f93" ON "product_tax" ("taxTaxId") `);
        await queryRunner.query(`ALTER TABLE "sale_detail" ADD CONSTRAINT "FK_5577177eb9ed86f21c841e04b0c" FOREIGN KEY ("saleSaleId") REFERENCES "sale"("saleId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_detail" ADD CONSTRAINT "FK_c58161fdb7d682ef0e3fdd275ce" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660" FOREIGN KEY ("supplierSupplierId") REFERENCES "supplier"("supplierId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD CONSTRAINT "FK_0b9eb7611d8e89ce117ea7c5d2a" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "headquarter" ADD CONSTRAINT "FK_24d6599e32aeb98784a9f28adb0" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_b79d86139a9bc3f552bcc8f5509" FOREIGN KEY ("companyCompanyId") REFERENCES "company"("companyId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_99b0e8173f6b390ed5fd549016a" FOREIGN KEY ("employeeEmployeeId") REFERENCES "employee"("employeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_dad84e2c29484e4c07d07529e44" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customerId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_37754f6f704a2500ed4882d90bf" FOREIGN KEY ("headquarterHeadquarterId") REFERENCES "headquarter"("headquarterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_ded048330ab60e923b61eec5fcc" FOREIGN KEY ("headquarterHeadquarterId") REFERENCES "headquarter"("headquarterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_112bf253789ceb9200b8b874b58" FOREIGN KEY ("employeeEmployeeId") REFERENCES "employee"("employeeId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_80bc4680c00f296e3eebba5e402" FOREIGN KEY ("rolRolId") REFERENCES "rol"("rolId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_rol" ADD CONSTRAINT "FK_09dd5ff578b95b8f302263d1d65" FOREIGN KEY ("rolRolId") REFERENCES "rol"("rolId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_rol" ADD CONSTRAINT "FK_12acb0ce2f8509b1802d19c0e20" FOREIGN KEY ("permissionPermissionId") REFERENCES "permission"("permissionId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_tax" ADD CONSTRAINT "FK_0703beddc1b20f2812d56516cf3" FOREIGN KEY ("productProductId") REFERENCES "product"("productId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_tax" ADD CONSTRAINT "FK_0e349177fe408d8390320e4f93e" FOREIGN KEY ("taxTaxId") REFERENCES "tax"("taxId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE VIEW "sale_view" AS 
    SELECT
      s."saleId" AS "saleId",
      jsonb_build_object(
        'customerName', cl."customerName",
        'customerLastname', cl."customerLastname",
        'customerIdentity', cl."customerIdentity",
        'customerEmail', cl."customerEmail",
        'customerPhone', cl."customerPhone"
      ) AS customer,
      jsonb_build_object(
        'employeeName', em."employeeName",
        'employeeLastname', em."employeeLastname",
        'employeeEmail', em."employeeEmail",
        'employeePhone', em."employeePhone",
        'employeeIdentity', em."employeeIdentity"
      ) AS employee,
      jsonb_build_object(
        'headquarterName', hq."headquarterName",
        'headquarterAddress', hq."headquarterAddress",
        'companyNit', co."companyNit",
        'companyName', co."companyName",
        'companyAddress', co."companyAddress",
        'companyPhone', co."companyPhone",
        'companyEmail', co."companyEmail"
      ) AS headquarter,
      jsonb_agg(DISTINCT jsonb_build_object(
        'saleDetailId', sd."saleDetailId",
        'quantity', sd."quantity",
        'unitPrice', sd."unitPrice",
        'subtotal', sd."subtotal",
        'totalTaxes', sd."totalTaxes",
        'total', sd."total",
        'productCode', p."productCode",
        'productName', p."productName"
      )) AS sale_detail,
      jsonb_build_object(
        'saleDate', s."saleDate",
        'saleTotalPrice', s."saleTotalPrice",
        'subtotal', s."subtotal",
        'totalTaxes', s."totalTaxes",
        'salePaymentMethod', s."salePaymentMethod"
      ) AS sale
    FROM
      "sale" s
    INNER JOIN
      "customer" cl ON s."customerCustomerId" = cl."customerId"
    INNER JOIN
      "headquarter" hq ON s."headquarterHeadquarterId" = hq."headquarterId"
    INNER JOIN
      "company" co ON hq."companyCompanyId" = co."companyId"
    INNER JOIN
      "employee" em ON s."employeeEmployeeId" = em."employeeId"
    INNER JOIN
      "sale_detail" sd ON s."saleId" = sd."saleSaleId"
    INNER JOIN
      "product" p ON sd."productProductId" = p."productId"
    GROUP BY
      s."saleId",
      cl."customerName", cl."customerLastname", cl."customerIdentity",
      cl."customerEmail", cl."customerPhone",
      em."employeeName", em."employeeLastname", em."employeeEmail",
      em."employeePhone", em."employeeIdentity",
      hq."headquarterName", hq."headquarterAddress",
      co."companyNit", co."companyName", co."companyAddress",
      co."companyPhone", co."companyEmail",
      s."saleDate", s."saleTotalPrice", s."subtotal",
      s."totalTaxes", s."salePaymentMethod"
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public","VIEW","sale_view","SELECT\n      s.\"saleId\" AS \"saleId\",\n      jsonb_build_object(\n        'customerName', cl.\"customerName\",\n        'customerLastname', cl.\"customerLastname\",\n        'customerIdentity', cl.\"customerIdentity\",\n        'customerEmail', cl.\"customerEmail\",\n        'customerPhone', cl.\"customerPhone\"\n      ) AS customer,\n      jsonb_build_object(\n        'employeeName', em.\"employeeName\",\n        'employeeLastname', em.\"employeeLastname\",\n        'employeeEmail', em.\"employeeEmail\",\n        'employeePhone', em.\"employeePhone\",\n        'employeeIdentity', em.\"employeeIdentity\"\n      ) AS employee,\n      jsonb_build_object(\n        'headquarterName', hq.\"headquarterName\",\n        'headquarterAddress', hq.\"headquarterAddress\",\n        'companyNit', co.\"companyNit\",\n        'companyName', co.\"companyName\",\n        'companyAddress', co.\"companyAddress\",\n        'companyPhone', co.\"companyPhone\",\n        'companyEmail', co.\"companyEmail\"\n      ) AS headquarter,\n      jsonb_agg(DISTINCT jsonb_build_object(\n        'saleDetailId', sd.\"saleDetailId\",\n        'quantity', sd.\"quantity\",\n        'unitPrice', sd.\"unitPrice\",\n        'subtotal', sd.\"subtotal\",\n        'totalTaxes', sd.\"totalTaxes\",\n        'total', sd.\"total\",\n        'productCode', p.\"productCode\",\n        'productName', p.\"productName\"\n      )) AS sale_detail,\n      jsonb_build_object(\n        'saleDate', s.\"saleDate\",\n        'saleTotalPrice', s.\"saleTotalPrice\",\n        'subtotal', s.\"subtotal\",\n        'totalTaxes', s.\"totalTaxes\",\n        'salePaymentMethod', s.\"salePaymentMethod\"\n      ) AS sale\n    FROM\n      \"sale\" s\n    INNER JOIN\n      \"customer\" cl ON s.\"customerCustomerId\" = cl.\"customerId\"\n    INNER JOIN\n      \"headquarter\" hq ON s.\"headquarterHeadquarterId\" = hq.\"headquarterId\"\n    INNER JOIN\n      \"company\" co ON hq.\"companyCompanyId\" = co.\"companyId\"\n    INNER JOIN\n      \"employee\" em ON s.\"employeeEmployeeId\" = em.\"employeeId\"\n    INNER JOIN\n      \"sale_detail\" sd ON s.\"saleId\" = sd.\"saleSaleId\"\n    INNER JOIN\n      \"product\" p ON sd.\"productProductId\" = p.\"productId\"\n    GROUP BY\n      s.\"saleId\",\n      cl.\"customerName\", cl.\"customerLastname\", cl.\"customerIdentity\",\n      cl.\"customerEmail\", cl.\"customerPhone\",\n      em.\"employeeName\", em.\"employeeLastname\", em.\"employeeEmail\",\n      em.\"employeePhone\", em.\"employeeIdentity\",\n      hq.\"headquarterName\", hq.\"headquarterAddress\",\n      co.\"companyNit\", co.\"companyName\", co.\"companyAddress\",\n      co.\"companyPhone\", co.\"companyEmail\",\n      s.\"saleDate\", s.\"saleTotalPrice\", s.\"subtotal\",\n      s.\"totalTaxes\", s.\"salePaymentMethod\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["VIEW","sale_view","public"]);
        await queryRunner.query(`DROP VIEW "sale_view"`);
        await queryRunner.query(`ALTER TABLE "product_tax" DROP CONSTRAINT "FK_0e349177fe408d8390320e4f93e"`);
        await queryRunner.query(`ALTER TABLE "product_tax" DROP CONSTRAINT "FK_0703beddc1b20f2812d56516cf3"`);
        await queryRunner.query(`ALTER TABLE "permission_rol" DROP CONSTRAINT "FK_12acb0ce2f8509b1802d19c0e20"`);
        await queryRunner.query(`ALTER TABLE "permission_rol" DROP CONSTRAINT "FK_09dd5ff578b95b8f302263d1d65"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_80bc4680c00f296e3eebba5e402"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_112bf253789ceb9200b8b874b58"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_ded048330ab60e923b61eec5fcc"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_37754f6f704a2500ed4882d90bf"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_dad84e2c29484e4c07d07529e44"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_99b0e8173f6b390ed5fd549016a"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_b79d86139a9bc3f552bcc8f5509"`);
        await queryRunner.query(`ALTER TABLE "headquarter" DROP CONSTRAINT "FK_24d6599e32aeb98784a9f28adb0"`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP CONSTRAINT "FK_0b9eb7611d8e89ce117ea7c5d2a"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660"`);
        await queryRunner.query(`ALTER TABLE "sale_detail" DROP CONSTRAINT "FK_c58161fdb7d682ef0e3fdd275ce"`);
        await queryRunner.query(`ALTER TABLE "sale_detail" DROP CONSTRAINT "FK_5577177eb9ed86f21c841e04b0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e349177fe408d8390320e4f93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0703beddc1b20f2812d56516cf"`);
        await queryRunner.query(`DROP TABLE "product_tax"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12acb0ce2f8509b1802d19c0e2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_09dd5ff578b95b8f302263d1d6"`);
        await queryRunner.query(`DROP TABLE "permission_rol"`);
        await queryRunner.query(`DROP TABLE "pdf_file"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "headquarter"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "tax"`);
        await queryRunner.query(`DROP TABLE "sale_detail"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
