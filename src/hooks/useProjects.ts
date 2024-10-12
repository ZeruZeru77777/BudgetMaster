import { useState, useEffect } from 'react';
import { Project } from '../types';
import { loadProjects, saveProjects } from '../utils/storage';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(loadProjects());

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return { projects, addProject };
};