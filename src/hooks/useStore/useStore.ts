import { useSelector } from 'react-redux';
import { RootState } from 'store';

export function useStore() {
  return useSelector((state: RootState) => state);
}
