import React, { useState } from 'react';
import { DollarSign, PieChart, List, Home, Briefcase, BarChart2, Archive } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Expenses from './components/Expenses';
import Income from './components/Income';
import Projects from './components/Projects';
import MonthlyBreakdown from './components/MonthlyBreakdown';
import ArchiveManager from './components/ArchiveManager';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">BudgetMaster</h1>
      </header>
      <main className="flex-grow flex">
        <nav className="bg-gray-800 text-white w-64 p-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <Home size={20} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === 'expenses' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('expenses')}
              >
                <DollarSign size={20} />
                <span>Expenses</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === 'income' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('income')}
              >
                <PieChart size={20} />
                <span>Income</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === 'projects' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('projects')}
              >
                <Briefcase size={20} />
                <span>Projects</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === 'monthlyBreakdown' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('monthlyBreakdown')}
              >
                <BarChart2 size={20} />
                <span>Monthly Breakdown</span>
              </button>
            </li>
            <li>
              <button
                className={`flex items-center space-x-2 w-full p-2 rounded ${
                  activeTab === 'archive' ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('archive')}
              >
                <Archive size={20} />
                <span>Archive</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex-grow p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'expenses' && <Expenses />}
          {activeTab === 'income' && <Income />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'monthlyBreakdown' && <MonthlyBreakdown />}
          {activeTab === 'archive' && <ArchiveManager />}
        </div>
      </main>
    </div>
  );
}

export default App;