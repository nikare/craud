export interface IBase {
  deposit: number;
  percent: number;
  period: number;
  capitale: number;
  passiveIncome: number;
}

export interface ITableRow {
  order?: number;
  capitaleBefore: number;
  adding: number;
  currentDeposit: number;
  returnPart: number;
  income: number;
  reinvest: number;
  moneyBack: number;
  deposits: number;
  capitaleAfter: number;
  totalAdding?: number;
  totalMoneyBack?: number;
  profit?: number;
}
