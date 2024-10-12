import { useState, useEffect } from 'react';
import { Expense, Income } from '../types';
import { loadExpenses, saveExpenses, loadIncomes, saveIncomes } from '../utils/storage';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses());

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return { expenses, addExpense, deleteExpense };
};

export const useIncomes = () => {
  const [incomes, setIncomes] = useState<Income[]>(loadIncomes());

  useEffect(() => {
    saveIncomes(incomes);
  }, [incomes]);

  const addIncome = (income: Income) => {
    setIncomes([...incomes, income]);
  };

  const deleteIncome = (id: number) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  return { incomes, addIncome, deleteIncome };
};