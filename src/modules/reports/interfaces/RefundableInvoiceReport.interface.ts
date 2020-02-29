export interface IRefundableInvoiceReport {
  id?: number;
  type: string;
  rnc: string;
  ncf: string;
  invoiceDate: string;
  details: string;
  businessType: string;
  provider: string;
  paymentMethod: string;
  subTotal: number;
  itbis: number;
  tip: number;
  total: number;
  userId: number;
  status: string;
  hasTip: boolean;
  hasItbis: boolean;
}
