import React, { useState } from 'react';
import { Plus, Download, Trash2 } from 'lucide-react';
import { useIncomes } from '../hooks/useFinances';
import { exportToCSV } from '../utils/exportToCSV';

const Income = () => {
  const { incomes, addIncome, deleteIncome } = useIncomes();
  const [newIncome, setNewIncome] = useState({ source: '', amount: '', date: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewIncome({ ...newIncome, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIncome.source && newIncome.amount && newIncome.date) {
      addIncome({
        id: Date.now(),
        source: newIncome.source,
        amount: parseFloat(newIncome.amount),
        date: newIncome.date,
      });
      setNewIncome({ source: '', amount: '', date: '' });
    }
  };

  const handleExportCSV = () => {
    exportToCSV(incomes, 'incomes.csv');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
      deleteIncome(id);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Income</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="source"
            value={newIncome.source}
            onChange={handleInputChange}
            placeholder="Source"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="amount"
            value={newIncome.amount}
            onChange={handleInputChange}
            placeholder="Amount"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={newIncome.date}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Income
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Income List</h3>
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
              <th className="text-left p-2">Source</th>
              <th className="text-right p-2">Amount</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income) => (
              <tr key={income.id} className="border-b">
                <td className="p-2">{income.date}</td>
                <td className="p-2">{income.source}</td>
                <td className="p-2 text-right">₹{income.amount.toFixed(2)}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(income.id)}
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

export default Income;