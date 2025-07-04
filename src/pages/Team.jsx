import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles.css';

const Team = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAppContext();
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'developer',
    status: 'active',
    assignedProjects: []
  });
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name.trim() || !newMember.email.trim()) return;

    addTeamMember(newMember);
    setNewMember({
      name: '',
      email: '',
      role: 'developer',
      status: 'active',
      assignedProjects: []
    });
  };

  const handleStatusChange = (memberId, newStatus) => {
    updateTeamMember(memberId, { status: newStatus });
  };

  const handleDeleteMember = (memberId) => {
    deleteTeamMember(memberId);
  };

  const filteredMembers = teamMembers.filter(member => {
    if (filter === 'all') return true;
    return member.status === filter;
  });

  return (
    <div className="team-container">
      <h1>Team Management</h1>
      
      {/* Add Team Member Form */}
      <form onSubmit={handleAddMember} className="team-form">
        <input
          type="text"
          name="name"
          value={newMember.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
        />
        <input
          type="email"
          name="email"
          value={newMember.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          required
        />
        <select
          name="role"
          value={newMember.role}
          onChange={handleInputChange}
        >
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="project-manager">Project Manager</option>
          <option value="qa">QA Engineer</option>
          <option value="devops">DevOps Engineer</option>
        </select>
        <button type="submit" className="btn-primary">Add Team Member</button>
      </form>

      {/* Team Member Filters */}
      <div className="team-filters">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All Members
        </button>
        <button
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={filter === 'inactive' ? 'active' : ''}
          onClick={() => setFilter('inactive')}
        >
          Inactive
        </button>
      </div>

      {/* Team Member List */}
      <div className="team-list">
        {filteredMembers.map(member => (
          <div key={member.id} className={`team-card status-${member.status}`}>
            <div className="member-info">
              <h3>{member.name}</h3>
              <p className="member-email">{member.email}</p>
              <span className={`role-badge ${member.role}`}>
                {member.role.replace('-', ' ')}
              </span>
            </div>
            <div className="member-meta">
              <span className="join-date">
                Joined: {new Date(member.joinedDate).toLocaleDateString()}
              </span>
              <span className="projects-count">
                Projects: {member.assignedProjects?.length || 0}
              </span>
            </div>
            <div className="member-actions">
              <select
                value={member.status}
                onChange={(e) => handleStatusChange(member.id, e.target.value)}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button
                className="btn-danger"
                onClick={() => handleDeleteMember(member.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
