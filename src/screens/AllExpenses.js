import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import useExpenses from '../store/use-expenses';

const AllExpenses = () => {
  const { expenses } = useExpenses();

  return <ExpensesOutput expensesPeriod="Total" expenses={expenses} />;
};

export default AllExpenses;
