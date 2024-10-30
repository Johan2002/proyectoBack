import { ViewEntity, ViewColumn } from 'typeorm';

interface Employee {
  employeeName: string;
  employeeLastname: string;
  employeeEmail: string;
}

interface Company {
  companyName: string;
  companyNit: string;
  companyPhone: string;
  companyAdress: string;
}

interface Customer {
  customerName: string;
  customerLastname: string;
  customerIdentity: string;
  customerEmail: string;
}

interface Sale {
  saleDate: string;
  saleTotalPrice: number;
  subtotal: number;
  totalTaxes: number;
  salePaymentMethod: string;
}

@ViewEntity({
  expression: `
    SELECT
      s."saleId" AS "saleId",
      jsonb_build_object(
        'customerName', cl."customerName",
        'customerLastname', cl."customerLastname",
        'customerIdentity', cl."customerIdentity",
        'customerEmail', cl."customerEmail"
      ) AS customer,
      jsonb_build_object(
        'employeeName', em."employeeName",
        'employeeLastname', em."employeeLastname",
        'employeeEmail', em."employeeEmail"
      ) AS employee,
      (
        SELECT jsonb_build_object(
          'companyName', co."companyName",
          'companyNit', co."companyNit",
          'companyPhone', co."companyPhone",
          'companyAdress', co."companyAddress"
        )
        FROM "company" co
        LIMIT 1
      ) AS company,
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
      em."employeeName",
      em."employeeLastname",
      em."employeeEmail",
      s."saleDate",
      s."saleTotalPrice",
      s."salePaymentMethod"
  `,
})
export class SaleView {
  @ViewColumn()
  saleId: string;

  @ViewColumn()
  customer: Customer;

  @ViewColumn()
  sale_detail: Array<{
    saleDetailId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    totalTaxes: number;
    total: number;
    productCode: string;
    productName: string;
  }>;

  @ViewColumn()
  sale: Sale;

  @ViewColumn()
  employee: Employee;

  @ViewColumn()
  company: Company;
}
