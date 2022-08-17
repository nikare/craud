import { ITableRow } from 'store';
import './Table.css';

interface IProps {
  year: number;
  table: ITableRow[];
}

export const Table = (props: IProps) => {
  const { year, table } = props;

  if (table.length < 1) {
    return null;
  }

  const totalCapitale = Math.round(table[table.length - 1].capitaleAfter);
  const totalAdding = Math.round(table[table.length - 1].totalAdding || 0);
  const totalMoneyBack = Math.round(table[table.length - 1].totalMoneyBack || 0);
  const profit = Math.round(table[table.length - 1].profit || 0);

  return (
    <table className="pure-table">
      <caption>Результаты за {year}-й год инвестирования (займы по 2 года)</caption>
      <thead>
        <tr>
          <th>№</th>
          <th>Капитал на 1-е число</th>
          <th>Внести</th>
          <th>В займы пойдёт</th>
          <th>Депозитов</th>
          <th>Возврат части депозита</th>
          <th>Прибыль</th>
          <th>В реинвест</th>
          <th>Вывести</th>
          <th>Капитал на последнее число месяца</th>
        </tr>
      </thead>
      <tbody>
        {table.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.order}</td>
              <td>{Math.round(data.capitaleBefore).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.adding).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.currentDeposit).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.deposits)} шт.</td>
              <td>{Math.round(data.returnPart).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.income).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.reinvest).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.moneyBack).toLocaleString('ru-RU')} руб.</td>
              <td>{Math.round(data.capitaleAfter).toLocaleString('ru-RU')} руб.</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={11}>
            <span>За всё время инвестиций было – </span>
            <span>Внесено: {totalAdding.toLocaleString('ru-RU')} руб. | </span>
            <span>Выведено: {totalMoneyBack.toLocaleString('ru-RU')} руб. | </span>
            <span>Накоплено: {totalCapitale.toLocaleString('ru-RU')} руб. | </span>
            <span>Сальдо: {profit.toLocaleString('ru-RU')} руб.</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
