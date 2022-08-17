import React, { useState } from 'react';
import './StockInput.css';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export const StockInput = () => {
  const [price, setPrice] = useState('1000');
  const [percent, setPercent] = useState('2.5');

  const priceValue = parseFloat(price);
  const percentValue = parseFloat(percent) * 0.01;
  const tarif = 0.00025;

  const buyFee = Math.round(priceValue * tarif * 100) / 100;
  const saldo = Math.round(priceValue * percentValue * 100) / 100;
  const sellFee = Math.round(priceValue * tarif * 100) / 100;
  const taxFee = saldo * 0.13;

  const blankPrice = Math.round((priceValue + buyFee + sellFee + taxFee) * 10000) / 10000;
  const newPrice = Math.round((blankPrice + saldo) * 10000) / 10000;

  const onChange = (event: ChangeEvent, callback: (value: string) => void) => {
    const value = event.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
    callback(value || '0');
  };

  return (
    <React.Fragment>
      <table className="stock pure-table">
        <caption>Расчёт цены акции на продажу</caption>
        <thead>
          <tr>
            <th>Цена покупки</th>
            <th>Процент</th>
            <th>Сальдо</th>
            <th>Минимальная цена</th>
            <th>Рекомендуемая цена</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                className="stock-price"
                value={price}
                maxLength={9}
                onChange={(event) => onChange(event, setPrice)}
                onFocus={({ target }) => target.select()}
              />
              <span> руб.</span>
            </td>
            <td>
              <input
                className="stock-percent"
                value={percent}
                maxLength={3}
                onChange={(event) => onChange(event, setPercent)}
                onFocus={({ target }) => target.select()}
              />
              <span> %</span>
            </td>
            <td>
              <input className="stock-saldo" value={saldo} disabled />
              <span> руб.</span>
            </td>
            <td>
              <input className="stock-price" value={blankPrice} disabled />
              <span> руб.</span>
            </td>
            <td>
              <input className="stock-price" value={newPrice} disabled />
              <span> руб.</span>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>&nbsp;</td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};
