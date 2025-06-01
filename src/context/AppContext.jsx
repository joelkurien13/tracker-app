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
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Development of a new mobile application for iOS and Android platforms',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 3,
      name: 'Database Migration',
      description: 'Migrate existing database to a new cloud-based solution',
      status: 'on-hold',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 4,
      name: 'E-commerce Platform',
      description: 'Build a new e-commerce platform with payment integration',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 5,
      name: 'AI Chatbot Integration',
      description: 'Implement AI-powered chatbot for customer support',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 6,
      name: 'Security Audit',
      description: 'Conduct comprehensive security audit of all systems',
      status: 'completed',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 7,
      name: 'Cloud Infrastructure',
      description: 'Set up and configure cloud infrastructure on AWS',
      status: 'active',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    },
    {
      id: 8,
      name: 'API Gateway',
      description: 'Implement API gateway for microservices architecture',
      status: 'on-hold',
      createdAt: new Date().toISOString(),
      tasks: [],
      teamMembers: []
    }
  ],
  tasks: [
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Create new dd homepage design with modern UI elements',
      status: 'in-progress',
      priority: 'high',
      projectId: 1,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      title: 'Implement User Authentication',
      description: 'Set up secure user authentication system',
      status: 'pending',
      priority: 'high',
      projectId: 2,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      title: 'Database Backup',
      description: 'Create backup of existing database before migration',
      status: 'completed',
      priority: 'medium',
      projectId: 3,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      title: 'Payment Gateway Integration',
      description: 'Integrate Stripe payment gateway',
      status: 'in-progress',
      priority: 'high',
      projectId: 4,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      title: 'Product Catalog API',
      description: 'Develop REST API for product catalog',
      status: 'pending',
      priority: 'medium',
      projectId: 4,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 6,
      title: 'Chatbot Training',
      description: 'Train AI model with customer support data',
      status: 'in-progress',
      priority: 'high',
      projectId: 5,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 7,
      title: 'Vulnerability Assessment',
      description: 'Run automated security scans',
      status: 'completed',
      priority: 'high',
      projectId: 6,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 8,
      title: 'AWS Setup',
      description: 'Configure AWS services and networking',
      status: 'in-progress',
      priority: 'high',
      projectId: 7,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 9,
      title: 'Load Balancer Configuration',
      description: 'Set up and configure load balancers',
      status: 'pending',
      priority: 'medium',
      projectId: 7,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 10,
      title: 'API Documentation',
      description: 'Create comprehensive API documentation',
      status: 'pending',
      priority: 'low',
      projectId: 8,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 11,
      title: 'Mobile UI Design',
      description: 'Design mobile app interface and user flows',
      status: 'in-progress',
      priority: 'high',
      projectId: 2,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 12,
      title: 'Push Notifications',
      description: 'Implement push notification system',
      status: 'pending',
      priority: 'medium',
      projectId: 2,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 13,
      title: 'Database Schema Design',
      description: 'Design new database schema for migration',
      status: 'completed',
      priority: 'high',
      projectId: 3,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 14,
      title: 'Shopping Cart Implementation',
      description: 'Develop shopping cart functionality',
      status: 'in-progress',
      priority: 'high',
      projectId: 4,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 15,
      title: 'Order Management System',
      description: 'Create order processing and management system',
      status: 'pending',
      priority: 'high',
      projectId: 4,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 16,
      title: 'Chatbot UI Design',
      description: 'Design chatbot interface and conversation flows',
      status: 'completed',
      priority: 'medium',
      projectId: 5,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 17,
      title: 'Security Report Generation',
      description: 'Create automated security report generation system',
      status: 'in-progress',
      priority: 'medium',
      projectId: 6,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 18,
      title: 'Cloud Monitoring Setup',
      description: 'Set up cloud monitoring and alerting system',
      status: 'pending',
      priority: 'high',
      projectId: 7,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 19,
      title: 'API Rate Limiting',
      description: 'Implement rate limiting for API endpoints',
      status: 'in-progress',
      priority: 'medium',
      projectId: 8,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 20,
      title: 'API Testing Suite',
      description: 'Create comprehensive API testing suite',
      status: 'pending',
      priority: 'low',
      projectId: 8,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  teamMembers: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'project-manager',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 2, 4]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 3, 7]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'designer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 2, 4]
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'qa',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 3, 6]
    },
    {
      id: 5,
      name: 'Alex Brown',
      email: 'alex.brown@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [4, 5, 8]
    },
    {
      id: 6,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'devops',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [3, 7, 8]
    },
    {
      id: 7,
      name: 'David Miller',
      email: 'david.miller@company.com',
      role: 'developer',
      status: 'inactive',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 5]
    },
    {
      id: 8,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@company.com',
      role: 'project-manager',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [5, 6, 8]
    },
    {
      id: 9,
      name: 'Robert Chen',
      email: 'robert.chen@company.com',
      role: 'developer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 4, 7]
    },
    {
      id: 10,
      name: 'Maria Garcia',
      email: 'maria.garcia@company.com',
      role: 'designer',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [2, 5, 8]
    },
    {
      id: 11,
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      role: 'qa',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [3, 6, 7]
    },
    {
      id: 12,
      name: 'Sophie Taylor',
      email: 'sophie.taylor@company.com',
      role: 'developer',
      status: 'inactive',
      joinedDate: new Date().toISOString(),
      assignedProjects: [1, 3]
    },
    {
      id: 13,
      name: 'Michael Lee',
      email: 'michael.lee@company.com',
      role: 'devops',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [4, 6, 8]
    },
    {
      id: 14,
      name: 'Emma Thompson',
      email: 'emma.thompson@company.com',
      role: 'project-manager',
      status: 'active',
      joinedDate: new Date().toISOString(),
      assignedProjects: [3, 7]
    },
    {
      id: 15,
      name: 'Daniel Kim',
      email: 'daniel.kim@company.com',
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
    return storedProjects ? storedProjects.map(validateProject) : INITIAL_DATA.projects;
  });

  const [tasks, setTasks] = useState(() => {
    const storedTasks = getStoredData(STORAGE_KEYS.TASKS);
    return storedTasks ? storedTasks.map(validateTask) : INITIAL_DATA.tasks;
  });

  const [teamMembers, setTeamMembers] = useState(() => {
    const storedTeam = getStoredData(STORAGE_KEYS.TEAM);
    return storedTeam ? storedTeam.map(validateTeamMember) : INITIAL_DATA.teamMembers;
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