import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_FIRE_BASE_URL;

export const storeExpense = async (expenseData) => {
  const url = `${BASE_URL}/expenses.json`;
  try {
    const response = await axios.post(url, expenseData);
    const id = response.data.name;
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchExpenses = async () => {
  const url = `${BASE_URL}/expenses.json`;
  try {
    const response = await axios.get(url);

    const expenses = [];

    if (!response.data) return expenses;

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }

    return expenses;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateExpense = async (id, expenseData) => {
  const url = `${BASE_URL}/expenses/${id}.json`;
  try {
    await axios.put(url, expenseData);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteExpense = async (id) => {
  const url = `${BASE_URL}/expenses/${id}.json`;
  try {
    const res = await axios.delete(url);
    console.log(res.data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
