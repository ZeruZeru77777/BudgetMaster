export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  projectId?: number;
}

export interface Income {
  id: number;
  source: string;
  amount: number;
  date: string;
}

export interface Project {
  id: number;
  name: string;
  budget: number;
}

export interface Archive {
  month: string;
  expenses: Expense[];
  incomes: Income[];
}