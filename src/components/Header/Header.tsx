import { useDispatch } from 'react-redux';

import { useLocalStorage, usePluralAge, useStore } from 'hooks';
// import { StockInput } from './StockInput';
import { actions } from 'store';
import './Header.css';

export const Header = () => {
  const { deposit, percent, period } = useStore();
  const { saveLocalStorage } = useLocalStorage();
  const { formatAge } = usePluralAge();
  const dispatch = useDispatch();

  const onChangeDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    dispatch(actions.setDeposit(value));
    saveLocalStorage({ deposit: value });
  };

  const onChangePercent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    dispatch(actions.setPercent(value));
    saveLocalStorage({ percent: value });
  };

  const onChangePeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    dispatch(actions.setPeriod(value));
    saveLocalStorage({ period: value });
  };

  return (
    <div className="header">
      {/* <StockInput /> */}
      <h1>Капитализация</h1>
      <h2>
        <span>Ежемесячное инвестирование </span>
        <input
          className="deposit"
          name="deposit"
          value={deposit}
          maxLength={6}
          onChange={onChangeDeposit}
          onFocus={({ target }) => target.select()}
        />
        <span> руб. в </span>
        краудлендинг
        <span> под </span>
        <input
          className="percent"
          name="percent"
          value={percent}
          maxLength={2}
          onChange={onChangePercent}
          onFocus={({ target }) => target.select()}
        />
        <span>% годовых </span>
        <span>сроком </span>
        <input
          className="period"
          name="period"
          value={period}
          maxLength={2}
          onChange={onChangePeriod}
          onFocus={({ target }) => target.select()}
        />
        <span className="period-text"> {formatAge(period)}</span>
      </h2>
    </div>
  );
};
