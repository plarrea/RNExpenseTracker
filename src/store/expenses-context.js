import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  /* eslint-disable no-unused-vars */
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, description, amount, date) => {},
  /* eslint-enable no-unused-vars */
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.payload.reverse();
    }
    case 'ADD': {
      return [action.payload, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses });
  };

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
    setExpenses,
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
