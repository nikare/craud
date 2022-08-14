export function usePluralAge() {
  const formatAge = (age: number) => {
    const primeNumber = age % 10;
    const isTens = age > 10 && age < 20;

    if (!isTens && primeNumber === 1) {
      return 'год';
    }

    if (!isTens && primeNumber > 1 && primeNumber < 5) {
      return 'года';
    }

    return 'лет';
  };

  return { formatAge };
}
