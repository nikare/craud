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

        // if (order > 24) {

        //   incomeArray.shift();
        // }

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

        console.log(incomeArray, prevIncome);

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

    // useEffect(() => {
    //   const _tables: ITableRow[][] = [];
    //   let prevMonth = {} as Partial<ITableRow>;

    //   for (let tableEq = 0; tableEq < period; tableEq++) {
    //     _tables[tableEq] = [];

    //     for (let month = 0; month < 12; month++) {
    //       const {
    //         reinvest: prevReinvest = 0,
    //         capitaleAfter: prevCapitale = 0,
    //         profit: prevProfit = 0,
    //         totalAdding: prevTotalAdding = 0,
    //         totalMoneyBack: prevTotalMoneyBack = 0,
    //       } = prevMonth;

    //       const order = month + 1 + tableEq * 12;
    //       const deposits = order >= 24 ? 24 : order;

    //       const capitaleBefore = prevCapitale;
    //       const currentDeposit = deposit;

    //       const adding = currentDeposit - prevReinvest;

    //       const returnPart = (currentDeposit / 24) * deposits;
    //       const income = ((deposit * percent) / 12 / 100) * deposits;

    //       const isAllowMoneyBack = returnPart + income - currentDeposit > 0;
    //       const moneyBack = isAllowMoneyBack ? returnPart + income - currentDeposit : 0;
    //       const reinvest = isAllowMoneyBack ? currentDeposit : returnPart + income;

    //       const capitaleAfter = capitaleBefore + income + adding - moneyBack;
    //       const profit = prevProfit - adding + moneyBack;
    //       const totalAdding = prevTotalAdding + adding;
    //       const totalMoneyBack = prevTotalMoneyBack + moneyBack;

    //       _tables[tableEq][month] = {
    //         order,
    //         capitaleBefore,
    //         currentDeposit,
    //         adding,
    //         returnPart,
    //         income,
    //         moneyBack,
    //         reinvest,
    //         deposits,
    //         capitaleAfter,
    //         totalAdding,
    //         totalMoneyBack,
    //         profit,
    //       };

    //       prevMonth = _tables[tableEq][month];
    //     }
    //   }

    dispatch(actions.setTables(_tables));
  }, [deposit, dispatch, percent, period]);

  return (
    <React.Fragment>
      {tables.map((table, index) => {
        return <Table key={index} year={index + 1} table={table} />;
      })}
      {false && (
        <React.Fragment>
          <Table
            year={1}
            table={[
              {
                capitaleBefore: 0,
                adding: 250000,
                currentDeposit: 250000,
                returnPart: 10417, // 10417
                income: 3750, // 3750
                reinvest: 14167,
                moneyBack: 0,
                deposits: 1,
                capitaleAfter: 253750,
              }, // done
              {
                capitaleBefore: 253750,
                adding: 246250,
                currentDeposit: 260417,
                returnPart: 21268, // 10851
                income: 7656, // 3906
                reinvest: 28924,
                moneyBack: 0,
                deposits: 2,
                capitaleAfter: 507656,
              },
              {
                capitaleBefore: 507656,
                adding: 242344,
                currentDeposit: 278924,
                returnPart: 40546, // 11622
                income: 11840, // 4184
                reinvest: 52386,
                moneyBack: 0,
                deposits: 3,
                capitaleAfter: 761840,
              },
              {
                capitaleBefore: 761840,
                adding: 238160,
                currentDeposit: 302386,
                returnPart: 53145, // 12599
                income: 16376, // 4536
                reinvest: 69376,
                moneyBack: 0,
                deposits: 4,
                capitaleAfter: 1016376,
              },
              {
                capitaleBefore: 1016376,
                adding: 233624,
                currentDeposit: 319376,
                returnPart: 66452, // 13307
                income: 21167, // 4791
                reinvest: 87619,
                moneyBack: 0,
                deposits: 5,
                capitaleAfter: 1271167,
              },
              {
                capitaleBefore: 1271167,
                adding: 228833,
                currentDeposit: 337619,
                returnPart: 80519, // 14067
                income: 26231, // 5064
                reinvest: 106750,
                moneyBack: 0,
                deposits: 6,
                capitaleAfter: 1526231,
              },
              {
                capitaleBefore: 1526231,
                adding: 223769,
                currentDeposit: 356750,
                returnPart: 95384, // 14865
                income: 31582, // 5351
                reinvest: 126966,
                moneyBack: 0,
                deposits: 7,
                capitaleAfter: 1781582,
              },
              {
                capitaleBefore: 1781582,
                adding: 218418,
                currentDeposit: 376966, // 15707
                returnPart: 111091, // 5654
                income: 37236,
                reinvest: 148327,
                moneyBack: 0,
                deposits: 8,
                capitaleAfter: 2037236,
              },
              {
                capitaleBefore: 2037236,
                adding: 212764,
                currentDeposit: 398327, // 16597
                returnPart: 127688, // 5975
                income: 43211,
                reinvest: 170899,
                moneyBack: 0,
                deposits: 9,
                capitaleAfter: 2293211,
              },
              {
                capitaleBefore: 2293211,
                adding: 206789,
                currentDeposit: 420899, // 17537
                returnPart: 127688, // 6313
                income: 49524,
                reinvest: 177212,
                moneyBack: 0,
                deposits: 10,
                capitaleAfter: 2549524,
              },
              {
                capitaleBefore: 2549524,
                adding: 200476,
                currentDeposit: 427212,
                returnPart: 145489, // 17801
                income: 55932, // 6408
                reinvest: 201421,
                moneyBack: 0,
                deposits: 11,
                capitaleAfter: 2805932,
              },
              {
                capitaleBefore: 2805932,
                adding: 194068,
                currentDeposit: 451421, // 18809
                returnPart: 164298, // 6771
                income: 62703,
                reinvest: 227001,
                moneyBack: 0,
                deposits: 12,
                capitaleAfter: 3062703,
              },
            ]}
          />

          <Table
            year={2}
            table={[
              {
                capitaleBefore: 3062703,
                adding: 187297,
                currentDeposit: 477001,
                returnPart: 184173, // 19875
                income: 69858, // 7155
                reinvest: 254031,
                moneyBack: 0,
                deposits: 13,
                capitaleAfter: 3319858,
              },
              {
                capitaleBefore: 3319858,
                adding: 180142,
                currentDeposit: 504031,
                returnPart: 205174, // 21001
                income: 77418, // 7560
                reinvest: 282592,
                moneyBack: 0,
                deposits: 14,
                capitaleAfter: 3577418,
              },
              {
                capitaleBefore: 3577418,
                adding: 172582,
                currentDeposit: 532592,
                returnPart: 227365, // 22191
                income: 85407, // 7989
                reinvest: 312772,
                moneyBack: 0,
                deposits: 15,
                capitaleAfter: 3835407,
              },
              {
                capitaleBefore: 3835407,
                adding: 164593,
                currentDeposit: 562772,
                returnPart: 250814, // 23449
                income: 93849, // 8442
                reinvest: 344663,
                moneyBack: 0,
                deposits: 16,
                capitaleAfter: 4093849,
              },
              {
                capitaleBefore: 4093849,
                adding: 156151,
                currentDeposit: 594663,
                returnPart: 275592, // 24778
                income: 102769, // 8920
                reinvest: 378361,
                moneyBack: 0,
                deposits: 17,
                capitaleAfter: 4352769,
              },
              {
                capitaleBefore: 4352769,
                adding: 147231,
                currentDeposit: 628361,
                returnPart: 301774,
                income: 112194, // 26182
                reinvest: 413968, // 9525
                moneyBack: 0,
                deposits: 18,
                capitaleAfter: 4612194,
              },
              {
                capitaleBefore: 4612194,
                adding: 137806,
                currentDeposit: 663968,
                returnPart: 329439, // 27665
                income: 122154, // 9960
                reinvest: 451593,
                moneyBack: 0,
                deposits: 19,
                capitaleAfter: 4872154,
              },
              {
                capitaleBefore: 4872154,
                adding: 127846,
                currentDeposit: 701593,
                returnPart: 358672, // 29233
                income: 132678, // 10524
                reinvest: 491350,
                moneyBack: 0,
                deposits: 20,
                capitaleAfter: 5132678,
              },
              {
                capitaleBefore: 5132678,
                adding: 117322,
                currentDeposit: 741350,
                returnPart: 389562, // 30890
                income: 143798, // 11120
                reinvest: 533360,
                moneyBack: 0,
                deposits: 21,
                capitaleAfter: 5393798,
              },
              {
                capitaleBefore: 5393798,
                adding: 106202,
                currentDeposit: 783360,
                returnPart: 422202, // 32640
                income: 155548, // 11750
                reinvest: 577750,
                moneyBack: 0,
                deposits: 22,
                capitaleAfter: 5655548,
              },
              {
                capitaleBefore: 5655548,
                adding: 94452,
                currentDeposit: 827750,
                returnPart: 456692, // 34490
                income: 167964, // 12416
                reinvest: 624656,
                moneyBack: 0,
                deposits: 23,
                capitaleAfter: 5917964,
              },
              {
                capitaleBefore: 5917964,
                adding: 82036,
                currentDeposit: 874656,
                returnPart: 493136, // 36444
                income: 181084, // 13120
                reinvest: 674220,
                moneyBack: 0,
                deposits: 24,
                capitaleAfter: 6181084,
              },
            ]}
          />

          <Table
            year={3}
            table={[
              {
                capitaleBefore: 0,
                adding: 0,
                currentDeposit: 0,
                returnPart: 0,
                income: 0,
                reinvest: 0,
                moneyBack: 0,
                deposits: 24,
                capitaleAfter: 0,
              },
            ]}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
