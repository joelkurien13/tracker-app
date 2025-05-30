import { useAppContext } from '../context/AppContext';
import '../styles.css';

const Dashboard = () => {
  const { getDashboardStats } = useAppContext();
  const stats = getDashboardStats();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome to your project dashboard</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-title">Total Projects</div>
          <div className="stat-value">{stats.totalProjects}</div>
          <div className="stat-subtitle">{stats.activeProjects} Active</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Total Tasks</div>
          <div className="stat-value">{stats.totalTasks}</div>
          <div className="stat-subtitle">{stats.completedTasks} Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">Team Members</div>
          <div className="stat-value">{stats.totalTeamMembers}</div>
          <div className="stat-subtitle">{stats.activeTeamMembers} Active</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Recent Projects */}
        <div className="card">
          <h2>Recent Projects</h2>
          <div className="recent-items">
            {stats.recentProjects.map(project => (
              <div key={project.id} className="recent-item">
                <div className="recent-item-header">
                  <h3>{project.name}</h3>
                  <span className={`status-badge ${project.status}`}>
                    {project.status}
                  </span>
                </div>
                <p>{project.description}</p>
                <div className="recent-item-footer">
                  <span className="date">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="card">
          <h2>Recent Tasks</h2>
          <div className="recent-items">
            {stats.recentTasks.map(task => (
              <div key={task.id} className="recent-item">
                <div className="recent-item-header">
                  <h3>{task.title}</h3>
                  <div className="badges">
                    <span className={`status-badge ${task.status}`}>
                      {task.status}
                    </span>
                    <span className={`priority-badge ${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <p>{task.description}</p>
                <div className="recent-item-footer">
                  <span className="date">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
