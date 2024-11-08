import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730927391415 implements MigrationInterface {
  name = 'Migrations1730927391415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sale_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sale_view"`);
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
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'sale_view',
        'SELECT\n      s."saleId" AS "saleId",\n      jsonb_build_object(\n        \'customerName\', cl."customerName",\n        \'customerLastname\', cl."customerLastname",\n        \'customerIdentity\', cl."customerIdentity",\n        \'customerEmail\', cl."customerEmail",\n        \'customerPhone\', cl."customerPhone"\n      ) AS customer,\n      jsonb_build_object(\n        \'employeeName\', em."employeeName",\n        \'employeeLastname\', em."employeeLastname",\n        \'employeeEmail\', em."employeeEmail",\n        \'employeePhone\', em."employeePhone",\n        \'employeeIdentity\', em."employeeIdentity"\n      ) AS employee,\n      jsonb_build_object(\n        \'headquarterName\', hq."headquarterName",\n        \'headquarterAddress\', hq."headquarterAddress",\n        \'companyNit\', co."companyNit",\n        \'companyName\', co."companyName",\n        \'companyAddress\', co."companyAddress",\n        \'companyPhone\', co."companyPhone",\n        \'companyEmail\', co."companyEmail"\n      ) AS headquarter,\n      jsonb_agg(DISTINCT jsonb_build_object(\n        \'saleDetailId\', sd."saleDetailId",\n        \'quantity\', sd."quantity",\n        \'unitPrice\', sd."unitPrice",\n        \'subtotal\', sd."subtotal",\n        \'totalTaxes\', sd."totalTaxes",\n        \'total\', sd."total",\n        \'productCode\', p."productCode",\n        \'productName\', p."productName"\n      )) AS sale_detail,\n      jsonb_build_object(\n        \'saleDate\', s."saleDate",\n        \'saleTotalPrice\', s."saleTotalPrice",\n        \'subtotal\', s."subtotal",\n        \'totalTaxes\', s."totalTaxes",\n        \'salePaymentMethod\', s."salePaymentMethod"\n      ) AS sale\n    FROM\n      "sale" s\n    INNER JOIN\n      "customer" cl ON s."customerCustomerId" = cl."customerId"\n    INNER JOIN\n      "headquarter" hq ON s."headquarterHeadquarterId" = hq."headquarterId"\n    INNER JOIN\n      "company" co ON hq."companyCompanyId" = co."companyId"\n    INNER JOIN\n      "employee" em ON s."employeeEmployeeId" = em."employeeId"\n    INNER JOIN\n      "sale_detail" sd ON s."saleId" = sd."saleSaleId"\n    INNER JOIN\n      "product" p ON sd."productProductId" = p."productId"\n    GROUP BY\n      s."saleId",\n      cl."customerName", cl."customerLastname", cl."customerIdentity",\n      cl."customerEmail", cl."customerPhone",\n      em."employeeName", em."employeeLastname", em."employeeEmail",\n      em."employeePhone", em."employeeIdentity",\n      hq."headquarterName", hq."headquarterAddress",\n      co."companyNit", co."companyName", co."companyAddress",\n      co."companyPhone", co."companyEmail",\n      s."saleDate", s."saleTotalPrice", s."subtotal",\n      s."totalTaxes", s."salePaymentMethod"',
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`,
      ['VIEW', 'sale_view', 'public'],
    );
    await queryRunner.query(`DROP VIEW "sale_view"`);
    await queryRunner.query(`CREATE VIEW "sale_view" AS SELECT
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
      jsonb_agg(DISTINCT jsonb_build_object(
        'headquarterName', hq."headquarterName",
        'headquarterAddress', hq."headquarterAddress",
        'companyNit', co."companyNit",
        'companyName', co."companyName",
        'companyAddress', co."companyAddress",
        'companyPhone', co."companyPhone",
        'companyEmail', co."companyEmail"
      )) AS "headquarter",
      jsonb_agg(DISTINCT jsonb_build_object(
        'saleDetailId', sd."saleDetailId",
        'quantity', sd."quantity",
        'unitPrice', sd."unitPrice",
        'subtotal', sd."subtotal",
        'totalTaxes', sd."totalTaxes",
        'total', sd."total",
        'productCode', p."productCode",
        'productName', p."productName"
      )) AS "sale_detail",
      jsonb_build_object(
        'saleDate', s."saleDate",
        'saleTotalPrice', s."saleTotalPrice",
        'subtotal' , s."subtotal",
        'totalTaxes' , s."totalTaxes", 
        'salePaymentMethod', s."salePaymentMethod"
      ) AS sale
    FROM
      "sale" s
    INNER JOIN
      "customer" cl ON s."customerCustomerId" = cl."customerId"
    INNER JOIN
      "headquarter" hq ON hq."headquarterId" = s."headquarterHeadquarterId"  
    INNER JOIN
      "company" co ON hq."companyCompanyId" = co."companyId"   
    INNER JOIN
      "employee" em ON s."employeeEmployeeId" = em."employeeId"  
    INNER JOIN
      "sale_detail" sd ON s."saleId" = sd."saleSaleId"
    INNER JOIN
      "product" p ON sd."productProductId" = p."productId"
    LEFT JOIN
      "product_tax" pt ON p."productId" = pt."productProductId"
    LEFT JOIN
      "tax" t ON pt."taxTaxId" = t."taxId"
    GROUP BY
      s."saleId",
      cl."customerName",
      cl."customerLastname",
      cl."customerIdentity",
      cl."customerEmail",
      cl."customerPhone",
      em."employeeName",
      em."employeeLastname",
      em."employeeEmail",
      em."employeePhone",
      em."employeeIdentity",
      s."saleDate",
      s."saleTotalPrice",
      s."salePaymentMethod"`);
    await queryRunner.query(
      `INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`,
      [
        'public',
        'VIEW',
        'sale_view',
        'SELECT\n      s."saleId" AS "saleId",\n      jsonb_build_object(\n        \'customerName\', cl."customerName",\n        \'customerLastname\', cl."customerLastname",\n        \'customerIdentity\', cl."customerIdentity",\n        \'customerEmail\', cl."customerEmail",\n        \'customerPhone\', cl."customerPhone"\n      ) AS customer,\n      jsonb_build_object(\n        \'employeeName\', em."employeeName",\n        \'employeeLastname\', em."employeeLastname",\n        \'employeeEmail\', em."employeeEmail",\n        \'employeePhone\', em."employeePhone",\n        \'employeeIdentity\', em."employeeIdentity"\n      ) AS employee,\n      jsonb_agg(DISTINCT jsonb_build_object(\n        \'headquarterName\', hq."headquarterName",\n        \'headquarterAddress\', hq."headquarterAddress",\n        \'companyNit\', co."companyNit",\n        \'companyName\', co."companyName",\n        \'companyAddress\', co."companyAddress",\n        \'companyPhone\', co."companyPhone",\n        \'companyEmail\', co."companyEmail"\n      )) AS "headquarter",\n      jsonb_agg(DISTINCT jsonb_build_object(\n        \'saleDetailId\', sd."saleDetailId",\n        \'quantity\', sd."quantity",\n        \'unitPrice\', sd."unitPrice",\n        \'subtotal\', sd."subtotal",\n        \'totalTaxes\', sd."totalTaxes",\n        \'total\', sd."total",\n        \'productCode\', p."productCode",\n        \'productName\', p."productName"\n      )) AS "sale_detail",\n      jsonb_build_object(\n        \'saleDate\', s."saleDate",\n        \'saleTotalPrice\', s."saleTotalPrice",\n        \'subtotal\' , s."subtotal",\n        \'totalTaxes\' , s."totalTaxes", \n        \'salePaymentMethod\', s."salePaymentMethod"\n      ) AS sale\n    FROM\n      "sale" s\n    INNER JOIN\n      "customer" cl ON s."customerCustomerId" = cl."customerId"\n    INNER JOIN\n      "headquarter" hq ON hq."headquarterId" = s."headquarterHeadquarterId"  \n    INNER JOIN\n      "company" co ON hq."companyCompanyId" = co."companyId"   \n    INNER JOIN\n      "employee" em ON s."employeeEmployeeId" = em."employeeId"  \n    INNER JOIN\n      "sale_detail" sd ON s."saleId" = sd."saleSaleId"\n    INNER JOIN\n      "product" p ON sd."productProductId" = p."productId"\n    LEFT JOIN\n      "product_tax" pt ON p."productId" = pt."productProductId"\n    LEFT JOIN\n      "tax" t ON pt."taxTaxId" = t."taxId"\n    GROUP BY\n      s."saleId",\n      cl."customerName",\n      cl."customerLastname",\n      cl."customerIdentity",\n      cl."customerEmail",\n      cl."customerPhone",\n      em."employeeName",\n      em."employeeLastname",\n      em."employeeEmail",\n      em."employeePhone",\n      em."employeeIdentity",\n      s."saleDate",\n      s."saleTotalPrice",\n      s."salePaymentMethod"',
      ],
    );
  }
}
