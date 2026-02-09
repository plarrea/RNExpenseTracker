import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import useExpenses from '../store/use-expenses';
import { getDateMinusDay } from '../utils/date';

const RecentExpenses = () => {
  const { expenses } = useExpenses();

  const recent = expenses.filter((expense) => {
    const sevenDaysAgo = getDateMinusDay(new Date(), 7);
    return expense.date > sevenDaysAgo;
  });

  return <ExpensesOutput expensesPeriod="Last 7 Days" expenses={recent} />;
};

export default RecentExpenses;
