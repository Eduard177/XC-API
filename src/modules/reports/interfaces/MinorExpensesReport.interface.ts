export interface IMinorExpensesReport {
  id?: number;
  invoiceDate: string;
  description: string;
  place: string;
  comment: string;
  witnesses: string;
  total: number;
  status: string;
  userId?: number;
}
