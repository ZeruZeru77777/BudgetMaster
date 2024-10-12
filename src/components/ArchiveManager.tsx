import React from 'react';
import { Archive, Download } from 'lucide-react';
import { archiveCurrentMonth } from '../utils/storage';
import { useExpenses, useIncomes } from '../hooks/useFinances';

const ArchiveManager = () => {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();

  const handleArchive = () => {
    if (window.confirm('Are you sure you want to archive the current month\'s data? This will clear all current expenses and incomes.')) {
      archiveCurrentMonth();
      window.location.reload(); // Refresh the page to reflect changes
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Archive Management</h2>
      <p className="mb-4">
        Current month's data: {expenses.length} expenses, {incomes.length} incomes
      </p>
      <button
        onClick={handleArchive}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center"
      >
        <Archive size={20} className="mr-2" />
        Archive Current Month
      </button>
    </div>
  );
};

export default ArchiveManager;