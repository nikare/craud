import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Tables.css';

import { actions, ITableRow } from 'store';
import { useStore } from 'hooks';
import { Table } from './Table';

export const Tables = () => {
  const { tables, period, deposit, percent } = useStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const _tables: ITableRow[][] = [];
    let prevMonth = {} as Partial<ITableRow>;
    const returnPartArray: number[] = [];
    const incomeArray: number[] = [];

    for (let tableEq = 0; tableEq < period; tableEq++) {
      _tables[tableEq] = [];

      for (let month = 0; month < 12; month++) {
        const {
          reinvest: prevReinvest = 0,
          capitaleAfter: prevCapitale = 0,
          profit: prevProfit = 0,
          totalAdding: prevTotalAdding = 0,
          totalMoneyBack: prevTotalMoneyBack = 0,
        } = prevMonth;

        const order = month + 1 + tableEq * 12;
        const deposits = order >= 24 ? 24 : order;

        const capitaleBefore = prevCapitale;
        const currentDeposit = deposit + prevReinvest;

        const fallbackReturnPart = order >= 24 ? returnPartArray.shift() || 0 : 0;
        const prevReturnPart = returnPartArray.reduce((accum, value) => accum + value, 0);
        const returnPartSelf = currentDeposit / 24;
        const returnPart = returnPartSelf + prevReturnPart - fallbackReturnPart;

        const fallbackIncome = order >= 24 ? incomeArray.shift() || 0 : 0;
        const prevIncome = incomeArray.reduce((accum, value) => accum + value, 0);
        const incomeSelf = (currentDeposit * percent) / 12 / 100;
        const income = incomeSelf + prevIncome - fallbackIncome;

        const isAllowMoneyBack = income - deposit > 0;
        const adding = isAllowMoneyBack ? 0 : deposit - prevIncome;

        const moneyBack = isAllowMoneyBack ? income - deposit : 0;
        const reinvest = isAllowMoneyBack ? returnPart : returnPart + income;

        const capitaleAfter = capitaleBefore + income + adding - moneyBack;
        const profit = prevProfit - adding + moneyBack;
        const totalAdding = prevTotalAdding + adding;
        const totalMoneyBack = prevTotalMoneyBack + moneyBack;

        returnPartArray.push(returnPartSelf);
        incomeArray.push(incomeSelf);

        _tables[tableEq][month] = {
          order,
          capitaleBefore,
          currentDeposit,
          adding,
          returnPart,
          income,
          moneyBack,
          reinvest,
          deposits,
          capitaleAfter,
          totalAdding,
          totalMoneyBack,
          profit,
        };

        prevMonth = _tables[tableEq][month];
      }
    }

    dispatch(actions.setTables(_tables));
  }, [deposit, dispatch, percent, period]);

  return (
    <React.Fragment>
      {tables.map((table, index) => {
        return <Table key={index} year={index + 1} table={table} />;
      })}
    </React.Fragment>
  );
};
