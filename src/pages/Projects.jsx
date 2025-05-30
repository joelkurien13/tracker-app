import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles.css';

const Projects = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectTasks,
    getProjectTeam,
    teamMembers
  } = useAppContext();

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    addProject(newProject);
    setNewProject({
      name: '',
      description: '',
      status: 'active'
    });
  };

  const handleStatusChange = (projectId, newStatus) => {
    updateProject(projectId, { status: newStatus });
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
  };

  return (
    <div className="projects-container">
      <h1>Project Management</h1>
      
      {/* Add Project Form */}
      <form onSubmit={handleAddProject} className="project-form">
        <input
          type="text"
          name="name"
          value={newProject.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          required
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleInputChange}
          placeholder="Project Description"
        />
        <button type="submit" className="btn-primary">Add Project</button>
      </form>

      {/* Projects List */}
      <div className="projects-list">
        {projects.map(project => {
          const projectTasks = getProjectTasks(project.id);
          const projectTeam = getProjectTeam(project.id);
          
          return (
            <div key={project.id} className={`project-card status-${project.status}`}>
              <div className="project-header">
                <h3>{project.name}</h3>
                <div className="project-actions">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-stats">
                <div className="stat">
                  <span className="stat-label">Tasks:</span>
                  <span className="stat-value">{projectTasks.length}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Team Members:</span>
                  <span className="stat-value">{projectTeam.length}</span>
                </div>
              </div>

              {/* Project Tasks */}
              {projectTasks.length > 0 && (
                <div className="project-tasks">
                  <h4>Tasks</h4>
                  <div className="tasks-list">
                    {projectTasks.map(task => (
                      <div key={task.id} className="task-item">
                        <span className={`status-badge ${task.status}`}>
                          {task.status}
                        </span>
                        <span className="task-title">{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Team */}
              {projectTeam.length > 0 && (
                <div className="project-team">
                  <h4>Team Members</h4>
                  <div className="team-list">
                    {projectTeam.map(member => (
                      <div key={member.id} className="team-member">
                        <span className="member-name">{member.name}</span>
                        <span className={`role-badge ${member.role}`}>
                          {member.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
