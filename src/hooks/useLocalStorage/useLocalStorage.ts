import { useStore } from 'hooks';
import { IBase } from 'store';

export function useLocalStorage() {
  const { deposit, percent, period } = useStore();

  const saveLocalStorage = (props: Partial<IBase>) => {
    const data = JSON.stringify({
      deposit,
      percent,
      period,
      ...props,
    });
    localStorage.setItem('jetlend', data);
  };

  return { saveLocalStorage };
}
