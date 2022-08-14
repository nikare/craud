import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBase, ITableRow } from './interfaces';

const localData = localStorage.getItem('jetlend');
const data: Partial<IBase> = localData ? JSON.parse(localData) : {};
const { deposit, percent, period } = data;

const initialState: IBase & { tables: ITableRow[][] } = {
  deposit: deposit || 100000,
  percent: percent || 15,
  period: period || 5,
  capitale: 0,
  passiveIncome: 0,
  tables: [],
};

export type RootState = typeof initialState;

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setDataLs(state, action: PayloadAction<IBase>) {
      const { deposit, percent, period } = action.payload;
      if (deposit) state.deposit = deposit;
      if (percent) state.percent = percent;
      if (period) state.period = period;
    },
    setDeposit(state, action: PayloadAction<IBase['deposit']>) {
      state.deposit = action.payload;
    },
    setPercent(state, action: PayloadAction<IBase['percent']>) {
      state.percent = action.payload;
    },
    setPeriod(state, action: PayloadAction<IBase['period']>) {
      state.period = action.payload;
    },
    setTables(state, action: PayloadAction<ITableRow[][]>) {
      state.tables = action.payload;
    },
  },
});

export const store = configureStore({ reducer: storeSlice.reducer });
export const actions = storeSlice.actions;
export type { IBase, ITableRow };
