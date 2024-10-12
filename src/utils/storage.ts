import { Expense, Income, Project, Archive } from '../types';

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const loadExpenses = (): Expense[] => getFromLocalStorage('expenses') || [];
export const loadIncomes = (): Income[] => getFromLocalStorage('incomes') || [];
export const loadProjects = (): Project[] => getFromLocalStorage('projects') || [];
export const loadArchives = (): Archive[] => getFromLocalStorage('archives') || [];

export const saveExpenses = (expenses: Expense[]) => saveToLocalStorage('expenses', expenses);
export const saveIncomes = (incomes: Income[]) => saveToLocalStorage('incomes', incomes);
export const saveProjects = (projects: Project[]) => saveToLocalStorage('projects', projects);
export const saveArchives = (archives: Archive[]) => saveToLocalStorage('archives', archives);

export const archiveCurrentMonth = () => {
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
  
  const expenses = loadExpenses();
  const incomes = loadIncomes();
  
  const archive: Archive = {
    month: currentMonth,
    expenses,
    incomes
  };
  
  const archives = loadArchives();
  archives.push(archive);
  saveArchives(archives);
  
  // Clear current month's data
  saveExpenses([]);
  saveIncomes([]);
};