import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import useExpenses from '../store/use-expenses';

const AllExpenses = () => {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="No registered expenses found."
    />
  );
};

export default AllExpenses;
