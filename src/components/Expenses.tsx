import React, { useState } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';
import { useExpenses } from '../hooks/useFinances';
import { useProjects } from '../hooks/useProjects';
import { exportToCSV } from '../utils/exportToCSV';

const Expenses = () => {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const { projects } = useProjects();
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '', date: '', projectId: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.category && newExpense.date) {
      addExpense({
        id: Date.now(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        projectId: newExpense.projectId ? parseInt(newExpense.projectId) : undefined,
      });
      setNewExpense({ description: '', amount: '', category: '', date: '', projectId: '' });
    }
  };

  const handleExportCSV = () => {
    exportToCSV(expenses, 'expenses.csv');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Expenses</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="description"
            value={newExpense.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            value={newExpense.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={newExpense.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={newExpense.date}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="projectId"
            value={newExpense.projectId}
            onChange={handleInputChange}
            className="p-2 border rounded"
          >
            <option value="">Select Project (Optional)</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Expense
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Expense List</h3>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center"
          >
            <Download size={20} className="mr-2" />
            Export CSV
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Description</th>
              <th className="text-left p-2">Category</th>
              <th className="text-left p-2">Project</th>
              <th className="text-right p-2">Amount</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id} className="border-b">
                <td className="p-2">{expense.date}</td>
                <td className="p-2">{expense.description}</td>
                <td className="p-2">{expense.category}</td>
                <td className="p-2">{projects.find(p => p.id === expense.projectId)?.name || 'N/A'}</td>
                <td className="p-2 text-right">₹{expense.amount.toFixed(2)}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expenses;