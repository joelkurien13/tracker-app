import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'tracker_projects',
  TASKS: 'tracker_tasks',
  TEAM: 'tracker_team'
};

// Initial data structure
const INITIAL_DATA = {
  projects: [
    {
      id: 1,
      name: 'E-commerce Platform Upgrade',
      description: 'Modernize the existing e-commerce platform with new features and improved user experience',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 2,
      name: 'Mobile Banking App',
      description: 'Develop a secure and user-friendly mobile banking application with biometric authentication',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 3,
      name: 'AI-Powered Analytics Dashboard',
      description: 'Create an intelligent analytics dashboard with predictive insights and automated reporting',
      status: 'on-hold',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 4,
      name: 'Healthcare Management System',
      description: 'Build a comprehensive healthcare management system for patient records and appointment scheduling',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 5,
      name: 'Smart Home Integration',
      description: 'Develop a unified platform for smart home device management and automation',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 6,
      name: 'Supply Chain Optimization',
      description: 'Implement an AI-driven supply chain optimization system with real-time tracking',
      status: 'completed',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 7,
      name: 'Educational Platform',
      description: 'Create an interactive online learning platform with video conferencing and course management',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 8,
      name: 'Social Media Analytics',
      description: 'Build a comprehensive social media analytics tool with sentiment analysis and trend prediction',
      status: 'on-hold',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    }
  ],
  tasks: [
    {
      id: 1,
      title: 'UI/UX Redesign',
      description: 'Redesign the e-commerce platform interface with modern design principles and improved user flow',
      status: 'in-progress',
      priority: 'high',
      projectId: 1,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      title: 'Payment Gateway Integration',
      description: 'Integrate multiple payment gateways with secure transaction handling',
      status: 'pending',
      priority: 'high',
      projectId: 1,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      title: 'Biometric Authentication',
      description: 'Implement secure biometric authentication using Face ID and Touch ID',
      status: 'in-progress',
      priority: 'high',
      projectId: 2,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      title: 'Transaction Security',
      description: 'Implement end-to-end encryption for all financial transactions',
      status: 'pending',
      priority: 'high',
      projectId: 2,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      title: 'Data Pipeline Setup',
      description: 'Set up real-time data pipeline for analytics processing',
      status: 'in-progress',
      priority: 'high',
      projectId: 3,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      title: 'ML Model Training',
      description: 'Train machine learning models for predictive analytics',
      status: 'pending',
      priority: 'medium',
      projectId: 3,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 7,
      title: 'Patient Portal Development',
      description: 'Create secure patient portal for accessing medical records',
      status: 'in-progress',
      priority: 'high',
      projectId: 4,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      title: 'Appointment System',
      description: 'Develop automated appointment scheduling system',
      status: 'pending',
      priority: 'medium',
      projectId: 4,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 9,
      title: 'Device Integration API',
      description: 'Create unified API for smart home device integration',
      status: 'in-progress',
      priority: 'high',
      projectId: 5,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 10,
      title: 'Automation Rules Engine',
      description: 'Develop rules engine for smart home automation',
      status: 'pending',
      priority: 'medium',
      projectId: 5,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 11,
      title: 'Inventory Tracking System',
      description: 'Implement real-time inventory tracking system',
      status: 'completed',
      priority: 'high',
      projectId: 6,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 12,
      title: 'Route Optimization',
      description: 'Develop AI-based route optimization algorithm',
      status: 'completed',
      priority: 'high',
      projectId: 6,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 13,
      title: 'Video Conferencing',
      description: 'Implement real-time video conferencing feature',
      status: 'in-progress',
      priority: 'high',
      projectId: 7,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 14,
      title: 'Course Management',
      description: 'Create course creation and management system',
      status: 'pending',
      priority: 'medium',
      projectId: 7,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 15,
      title: 'Sentiment Analysis',
      description: 'Implement NLP-based sentiment analysis for social media posts',
      status: 'in-progress',
      priority: 'high',
      projectId: 8,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 16,
      title: 'Trend Prediction',
      description: 'Develop ML model for social media trend prediction',
      status: 'pending',
      priority: 'medium',
      projectId: 8,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  teamMembers: [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'project-manager',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 2, 4]
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      email: 'marcus.rodriguez@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 3, 7]
    },
    {
      id: 3,
      name: 'Aisha Patel',
      email: 'aisha.patel@company.com',
      role: 'designer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 2, 4]
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      role: 'qa',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 3, 6]
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      email: 'yuki.tanaka@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [4, 5, 8]
    },
    {
      id: 6,
      name: 'Olivia Martinez',
      email: 'olivia.martinez@company.com',
      role: 'devops',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [3, 7, 8]
    },
    {
      id: 7,
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'developer',
      status: 'inactive',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 5]
    },
    {
      id: 8,
      name: 'Emma Thompson',
      email: 'emma.thompson@company.com',
      role: 'project-manager',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [5, 6, 8]
    },
    {
      id: 9,
      name: 'Raj Patel',
      email: 'raj.patel@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 4, 7]
    },
    {
      id: 10,
      name: 'Sophia Lee',
      email: 'sophia.lee@company.com',
      role: 'designer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 5, 8]
    },
    {
      id: 11,
      name: 'Carlos Mendez',
      email: 'carlos.mendez@company.com',
      role: 'qa',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [3, 6, 7]
    },
    {
      id: 12,
      name: 'Priya Sharma',
      email: 'priya.sharma@company.com',
      role: 'developer',
      status: 'inactive',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 3]
    },
    {
      id: 13,
      name: 'Alex Johnson',
      email: 'alex.johnson@company.com',
      role: 'devops',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [4, 6, 8]
    },
    {
      id: 14,
      name: 'Maya Patel',
      email: 'maya.patel@company.com',
      role: 'project-manager',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [3, 7]
    },
    {
      id: 15,
      name: 'Lucas Silva',
      email: 'lucas.silva@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 5, 8]
    }
  ]
};

// Helper function to safely get data from localStorage
const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

// Helper function to safely set data in localStorage
const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
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
  // Initialize state with data from localStorage
  const [projects, setProjects] = useState(() => {
    const storedProjects = getStoredData(STORAGE_KEYS.PROJECTS);
    if (!storedProjects) {
      setStoredData(STORAGE_KEYS.PROJECTS, INITIAL_DATA.projects);
      return INITIAL_DATA.projects;
    }
    return storedProjects.map(validateProject);
  });

  const [tasks, setTasks] = useState(() => {
    const storedTasks = getStoredData(STORAGE_KEYS.TASKS);
    if (!storedTasks) {
      setStoredData(STORAGE_KEYS.TASKS, INITIAL_DATA.tasks);
      return INITIAL_DATA.tasks;
    }
    return storedTasks.map(validateTask);
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const storedTeam = getStoredData(STORAGE_KEYS.TEAM);
    if (!storedTeam) {
      setStoredData(STORAGE_KEYS.TEAM, INITIAL_DATA.teamMembers);
      return INITIAL_DATA.teamMembers;
    }
    return storedTeam.map(validateTeamMember);
  });

  const [selectedProject, setSelectedProject] = useState(null);

  // Function to load all data
  const loadAllData = useCallback(() => {
    try {
      const storedProjects = getStoredData(STORAGE_KEYS.PROJECTS);
      const storedTasks = getStoredData(STORAGE_KEYS.TASKS);
      const storedTeam = getStoredData(STORAGE_KEYS.TEAM);

      if (storedProjects) {
        setProjects(storedProjects.map(validateProject));
      }
      if (storedTasks) {
        setTasks(storedTasks.map(validateTask));
      }
      if (storedTeam) {
        setTeamMembers(storedTeam.map(validateTeamMember));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Load data on mount and when route changes
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    setStoredData(STORAGE_KEYS.PROJECTS, projects);
  }, [projects]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  useEffect(() => {
    setStoredData(STORAGE_KEYS.TEAM, teamMembers);
  }, [teamMembers]);

  // Project management functions
  const addProject = useCallback((project) => {
    const validatedProject = validateProject({
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    setProjects(prev => {
      const newProjects = [...prev, validatedProject];
      setStoredData(STORAGE_KEYS.PROJECTS, newProjects);
      return newProjects;
    });
    return validatedProject;
  }, []);

  const updateProject = useCallback((projectId, updates) => {
    setProjects(prev => {
      const newProjects = prev.map(project => {
        if (project.id === projectId) {
          const projectTasks = tasks.filter(task => task.projectId === projectId);
          const projectTeam = teamMembers.filter(member => 
            member.assignedProjects?.includes(projectId)
          );
          
          return validateProject({
            ...project,
            ...updates,
            tasks: projectTasks,
            teamMembers: projectTeam
          });
        }
        return project;
      });
      setStoredData(STORAGE_KEYS.PROJECTS, newProjects);
      return newProjects;
    });
  }, [tasks, teamMembers]);

  const deleteProject = useCallback((projectId) => {
    setProjects(prev => {
      const newProjects = prev.filter(project => project.id !== projectId);
      setStoredData(STORAGE_KEYS.PROJECTS, newProjects);
      return newProjects;
    });
    setTasks(prev => {
      const newTasks = prev.filter(task => task.projectId !== projectId);
      setStoredData(STORAGE_KEYS.TASKS, newTasks);
      return newTasks;
    });
  }, []);

  // Task management functions
  const addTask = useCallback((task) => {
    const validatedTask = validateTask({
      ...task,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    setTasks(prev => {
      const newTasks = [...prev, validatedTask];
      setStoredData(STORAGE_KEYS.TASKS, newTasks);
      return newTasks;
    });
    if (validatedTask.projectId) {
      updateProject(validatedTask.projectId, {});
    }
    return validatedTask;
  }, [updateProject]);

  const updateTask = useCallback((taskId, updates) => {
    setTasks(prev => {
      const newTasks = prev.map(task => {
        if (task.id === taskId) {
          const updatedTask = validateTask({ ...task, ...updates });
          if (updates.projectId !== undefined && updates.projectId !== task.projectId) {
            if (task.projectId) {
              updateProject(task.projectId, {});
            }
            if (updates.projectId) {
              updateProject(updates.projectId, {});
            }
          }
          return updatedTask;
        }
        return task;
      });
      setStoredData(STORAGE_KEYS.TASKS, newTasks);
      return newTasks;
    });
  }, [updateProject]);

  const deleteTask = useCallback((taskId) => {
    setTasks(prev => {
      const taskToDelete = prev.find(task => task.id === taskId);
      const newTasks = prev.filter(task => task.id !== taskId);
      setStoredData(STORAGE_KEYS.TASKS, newTasks);
      if (taskToDelete?.projectId) {
        updateProject(taskToDelete.projectId, {});
      }
      return newTasks;
    });
  }, [updateProject]);

  // Team management functions
  const addTeamMember = useCallback((member) => {
    const validatedMember = validateTeamMember({
      ...member,
      id: Date.now(),
      joinedDate: new Date().toISOString(),
      status: member.status || 'active',
      assignedProjects: member.assignedProjects || []
    });
    setTeamMembers(prev => {
      const newTeam = [...prev, validatedMember];
      setStoredData(STORAGE_KEYS.TEAM, newTeam);
      return newTeam;
    });
    if (validatedMember.assignedProjects?.length > 0) {
      validatedMember.assignedProjects.forEach(projectId => {
        updateProject(projectId, {});
      });
    }
    return validatedMember;
  }, [updateProject]);

  const updateTeamMember = useCallback((memberId, updates) => {
    setTeamMembers(prev => {
      const newTeam = prev.map(member => {
        if (member.id === memberId) {
          const updatedMember = {
            ...member,
            ...updates,
            status: ['active', 'inactive'].includes(updates.status) ? updates.status : member.status,
            assignedProjects: updates.assignedProjects || member.assignedProjects || []
          };
          
          if (updates.assignedProjects) {
            const oldProjects = member.assignedProjects || [];
            const newProjects = updates.assignedProjects;
            
            oldProjects.forEach(projectId => {
              if (!newProjects.includes(projectId)) {
                updateProject(projectId, {});
              }
            });
            
            newProjects.forEach(projectId => {
              if (!oldProjects.includes(projectId)) {
                updateProject(projectId, {});
              }
            });
          }
          
          return validateTeamMember(updatedMember);
        }
        return member;
      });
      setStoredData(STORAGE_KEYS.TEAM, newTeam);
      return newTeam;
    });
  }, [updateProject]);

  const deleteTeamMember = useCallback((memberId) => {
    setTeamMembers(prev => {
      const memberToDelete = prev.find(member => member.id === memberId);
      const newTeam = prev.filter(member => member.id !== memberId);
      setStoredData(STORAGE_KEYS.TEAM, newTeam);
      if (memberToDelete?.assignedProjects?.length > 0) {
        memberToDelete.assignedProjects.forEach(projectId => {
          updateProject(projectId, {});
        });
      }
      return newTeam;
    });
  }, [updateProject]);

  // Helper functions
  const getAllTasks = useCallback(() => {
    const storedTasks = getStoredData(STORAGE_KEYS.TASKS);
    return storedTasks ? storedTasks.map(validateTask) : [];
  }, []);

  const getAllTeamMembers = useCallback(() => {
    const storedTeam = getStoredData(STORAGE_KEYS.TEAM);
    return storedTeam ? storedTeam.map(validateTeamMember) : [];
  }, []);

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
    getAllTasks,
    
    // Team functions
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getAllTeamMembers,
    
    // Relationship functions
    assignTaskToProject,
    getProjectTasks,
    assignMemberToProject,
    removeMemberFromProject,
    getProjectTeam,
    
    // Dashboard functions
    getDashboardStats,

    // Data loading function
    loadAllData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 