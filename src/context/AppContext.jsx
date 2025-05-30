import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'tracker_projects',
  TASKS: 'tracker_tasks',
  TEAM: 'tracker_team'
};

// Data validation functions
const validateProject = (project) => {
  return {
    id: project.id || Date.now(),
    name: project.name || 'Unnamed Project',
    description: project.description || '',
    status: ['active', 'completed', 'on-hold'].includes(project.status) ? project.status : 'active',
    createdAt: project.createdAt || new Date().toISOString(),
    tasks: project.tasks || [],
    teamMembers: project.teamMembers || []
  };
};

const validateTask = (task) => {
  return {
    id: task.id || Date.now(),
    title: task.title || 'Untitled Task',
    description: task.description || '',
    status: ['pending', 'in-progress', 'completed'].includes(task.status) ? task.status : 'pending',
    priority: ['low', 'medium', 'high'].includes(task.priority) ? task.priority : 'medium',
    projectId: task.projectId || null,
    createdAt: task.createdAt || new Date().toISOString(),
    dueDate: task.dueDate || null
  };
};

const validateTeamMember = (member) => {
  return {
    id: member.id || Date.now(),
    name: member.name || 'Unnamed Member',
    email: member.email || '',
    role: ['developer', 'designer', 'project-manager', 'qa', 'devops'].includes(member.role) 
      ? member.role 
      : 'developer',
    status: ['active', 'inactive'].includes(member.status) ? member.status : 'active',
    joinedDate: member.joinedDate || new Date().toISOString(),
    assignedProjects: member.assignedProjects || []
  };
};

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Projects state
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  // Tasks state
  const [tasks, setTasks] = useState([]);

  // Team state
  const [teamMembers, setTeamMembers] = useState([]);

  // Load all data from localStorage on mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      const savedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      const savedTeam = localStorage.getItem(STORAGE_KEYS.TEAM);

      if (savedProjects) {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects.map(validateProject));
      }
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks.map(validateTask));
      }
      if (savedTeam) {
        const parsedTeam = JSON.parse(savedTeam);
        setTeamMembers(parsedTeam.map(validateTeamMember));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Initialize with empty arrays if there's an error
      setProjects([]);
      setTasks([]);
      setTeamMembers([]);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(teamMembers));
    } catch (error) {
      console.error('Error saving team members to localStorage:', error);
    }
  }, [teamMembers]);

  // Project management functions
  const addProject = (project) => {
    const validatedProject = validateProject({
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    setProjects(prev => [...prev, validatedProject]);
    return validatedProject;
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId 
          ? validateProject({ ...project, ...updates })
          : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    // Also remove associated tasks
    setTasks(prev => prev.filter(task => task.projectId !== projectId));
  };

  // Task management functions
  const addTask = (task) => {
    const validatedTask = validateTask({
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    setTasks(prev => [...prev, validatedTask]);
    return validatedTask;
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId 
          ? validateTask({ ...task, ...updates })
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Team management functions
  const addTeamMember = (member) => {
    const validatedMember = validateTeamMember({
      ...member,
      id: Date.now(),
      joinedDate: new Date().toISOString(),
      status: member.status || 'active'
    });
    setTeamMembers(prev => [...prev, validatedMember]);
    return validatedMember;
  };

  const updateTeamMember = (memberId, updates) => {
    setTeamMembers(prev =>
      prev.map(member => {
        if (member.id === memberId) {
          const updatedMember = {
            ...member,
            ...updates,
            status: ['active', 'inactive'].includes(updates.status) ? updates.status : member.status
          };
          return validateTeamMember(updatedMember);
        }
        return member;
      })
    );
  };

  const deleteTeamMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  // Project-Task relationship functions
  const assignTaskToProject = (taskId, projectId) => {
    updateTask(taskId, { projectId });
  };

  const getProjectTasks = (projectId) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  // Project-Team relationship functions
  const assignMemberToProject = (memberId, projectId) => {
    updateTeamMember(memberId, {
      assignedProjects: [...(teamMembers.find(m => m.id === memberId)?.assignedProjects || []), projectId]
    });
  };

  const removeMemberFromProject = (memberId, projectId) => {
    updateTeamMember(memberId, {
      assignedProjects: teamMembers.find(m => m.id === memberId)?.assignedProjects.filter(id => id !== projectId) || []
    });
  };

  const getProjectTeam = (projectId) => {
    return teamMembers.filter(member => 
      member.assignedProjects?.includes(projectId)
    );
  };

  // Dashboard statistics
  const getDashboardStats = () => {
    return {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'active').length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      totalTeamMembers: teamMembers.length,
      activeTeamMembers: teamMembers.filter(m => m.status === 'active').length,
      recentProjects: [...projects]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5),
      recentTasks: [...tasks]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
    };
  };

  const value = {
    // State
    projects,
    selectedProject,
    tasks,
    teamMembers,
    
    // Setters
    setSelectedProject,
    
    // Project functions
    addProject,
    updateProject,
    deleteProject,
    
    // Task functions
    addTask,
    updateTask,
    deleteTask,
    
    // Team functions
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    
    // Relationship functions
    assignTaskToProject,
    getProjectTasks,
    assignMemberToProject,
    removeMemberFromProject,
    getProjectTeam,
    
    // Dashboard functions
    getDashboardStats
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 