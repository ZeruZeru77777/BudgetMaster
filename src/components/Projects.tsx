import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useExpenses } from '../hooks/useFinances';

const Projects = () => {
  const { projects, addProject } = useProjects();
  const { expenses } = useExpenses();
  const [newProject, setNewProject] = useState({ name: '', budget: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name && newProject.budget) {
      addProject({
        id: projects.length + 1,
        name: newProject.name,
        budget: parseFloat(newProject.budget),
      });
      setNewProject({ name: '', budget: '' });
    }
  };

  const getProjectExpenses = (projectId: number) => {
    return expenses.filter(expense => expense.projectId === projectId).reduce((sum, expense) => sum + expense.amount, 0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newProject.name}
            onChange={handleInputChange}
            placeholder="Project Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="budget"
            value={newProject.budget}
            onChange={handleInputChange}
            placeholder="Budget"
            className="p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add Project
        </button>
      </form>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Project List</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Project Name</th>
              <th className="text-right p-2">Budget</th>
              <th className="text-right p-2">Expenses</th>
              <th className="text-right p-2">Remaining</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const projectExpenses = getProjectExpenses(project.id);
              const remaining = project.budget - projectExpenses;
              return (
                <tr key={project.id} className="border-b">
                  <td className="p-2">{project.name}</td>
                  <td className="p-2 text-right">₹{project.budget.toFixed(2)}</td>
                  <td className="p-2 text-right">₹{projectExpenses.toFixed(2)}</td>
                  <td className="p-2 text-right">₹{remaining.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;