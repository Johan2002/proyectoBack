import { ViewEntity, ViewColumn } from 'typeorm';

interface Employee {
  employeeName: string;
  employeeLastname: string;
  employeeEmail: string;
  employeePhone: string;
  employeeIdentity: string;
}

interface Customer {
  customerName: string;
  customerLastname: string;
  customerIdentity: string;
  customerEmail: string;
  customerPhone: string;
}

interface Headquarter {
  headquarterName: string;
  headquarterAddress: string;
  companyNit: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
}

interface Sale {
  saleDate: string;
  saleTotalPrice: number;
  subtotal: number;
  totalTaxes: number;
  salePaymentMethod: string;
}

interface SaleDetail {
  productCode: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  totalTaxes: number;
  total: number;
}

@ViewEntity({
  expression: `
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
  `,
})
export class SaleView {
  @ViewColumn()
  saleId: string;

  @ViewColumn()
  customer: Customer;

  @ViewColumn()
  headquarter: Headquarter;

  @ViewColumn()
  sale_detail: Array<SaleDetail>;

  @ViewColumn()
  sale: Sale;

  @ViewColumn()
  employee: Employee;
}
