import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-12-10'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2025-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2025-12-05'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2025-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.99,
    date: new Date('2025-02-20'),
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2025-12-10'),
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2026-01-05'),
  },
  {
    id: 'e8',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2026-12-05'),
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 14.99,
    date: new Date('2026-02-19'),
  },
  {
    id: 'e10',
    description: 'Another book',
    amount: 18.99,
    date: new Date('2026-02-20'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  /* eslint-disable no-unused-vars */
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, description, amount, date) => {},
  /* eslint-enable no-unused-vars */
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];
    }
    case 'UPDATE': {
      const foundIdx = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      if (foundIdx === -1) return state;
      const foundExpense = state[foundIdx];
      const updatedItem = { ...foundExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[foundIdx] = updatedItem;
      return updatedExpenses;
    }
    case 'DELETE': {
      return state.filter((expense) => expense.id !== action.payload);
    }
    default:
      return state;
  }
};

const ExpensesProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesProvider;
