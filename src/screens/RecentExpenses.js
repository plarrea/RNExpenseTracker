import { useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import useExpenses from '../store/use-expenses';
import { getDateMinusDay } from '../utils/date';
import { fetchExpenses } from '../utils/http';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const { expenses, setExpenses } = useExpenses();

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      if (expenses) {
        setExpenses(expenses);
      } else {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
    };
    getExpenses();
  }, []);

  const recent = expenses.filter((expense) => {
    const sevenDaysAgo = getDateMinusDay(new Date(), 7);
    return expense.date > sevenDaysAgo;
  });

  const errorHandler = () => {
    setError(null);
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recent}
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
