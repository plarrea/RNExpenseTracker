import { useContext } from 'react';
import { ExpensesContext } from './expenses-context';

const useExpenses = () => {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses must be used within ExpensesContext');
  }

  return context;
};

export default useExpenses;
