import React, { useState } from 'react';

function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', deadline: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.deadline) return;
    if (editIndex !== null) {
      const updated = [...projects];
      updated[editIndex] = form;
      setProjects(updated);
      setEditIndex(null);
    } else {
      setProjects([...projects, form]);
    }
    setForm({ name: '', deadline: '' });
  };

  const handleEdit = (index) => {
    setForm(projects[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">🛠 Project Admin Panel</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Project Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editIndex !== null ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div>
        <h3 className="text-lg font-semibold">📋 Project List</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects yet.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map((proj, i) => (
              <li key={i} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">{proj.name}</p>
                  <p className="text-sm text-gray-600">Due {proj.deadline}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProjectManager;
