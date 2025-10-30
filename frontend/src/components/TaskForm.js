// const TaskForm = ({ isEdit }) => {  return ( ... );}; export default TaskForm;
// useEffect(() => { ... }, [isEdit, id]);
// const handleChange = (e) => { ... };
// const handleSubmit = async (e) => { ... };


// import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//**`useNavigate()`** → React Router hook to redirect users
//**`useParams()`** → Extracts URL parameters like the task’s ID (for editing).
import { taskAPI } from '../services/api';
import './TaskForm.css';

// TaskForm component for creating and editing tasks
const TaskForm = ({ isEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  // State for loading and error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch task details if in edit mode
  useEffect(() => {
    // Move fetchTask function inside useEffect
    const fetchTask = async () => {
      try {
        const response = await taskAPI.getTask(id); //It calls the backend `GET /api/tasks/:id` to fetch a single task.
        const task = response.data;
        setFormData({ //It updates the form fields using `setFormData()`.
          title: task.title,
          description: task.description || '', //It handles missing description gracefully (`|| ''`).
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? task.dueDate.split('T')[0] : '', //It converts ISO date (e.g. `"2025-10-22T00:00:00Z"`) into a plain `"2025-10-22"` string for the HTML date input.
        });
      } catch (err) {
        setError('Failed to fetch task');
      }
    };
    
    // Call fetchTask only if in edit mode
    if (isEdit && id) {
      fetchTask();
    }
  }, [isEdit, id]); // ← Now this is correct!

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //dynamically updates the right field in `formData`
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields // try -> catch -> finally, if -> else
    try {
      if (isEdit) {
        await taskAPI.updateTask(id, formData);
      } else {
        await taskAPI.createTask(formData);
      }
      navigate('/'); // Redirect to TaskList after successful submission
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save task'); //Catches backend errors and shows them nicely.
    } finally {
      setLoading(false); //Always disables the submit button after saving.
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Edit Task' : 'Create New Task'}</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            maxLength="500"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn btn-cancel"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;