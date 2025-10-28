// const TaskList = () => {
//   return ();
// };
// export default TaskList;

// import necessary libraries and components
import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; //used for navigation (no full page reload)
import { taskAPI } from '../services/api';
import './TaskList.css';


// TaskList component to display and manage tasks
const TaskList = () => {
  // State variables
  const [tasks, setTasks] = useState([]); // fetched from your backend.
  const [loading, setLoading] = useState(true); // currently fetching data
  const [error, setError] = useState(null); //if an API call fails, this will store the message.

  //Fetching Tasks When the Page Loads
  useEffect(() => {
    fetchTasks();
  }, []);


  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      setLoading(true); //show a loading spinner or text
      const response = await taskAPI.getAllTasks(); //API call to get tasks
      setTasks(response.data); //stores fetched data in state
      setError(null); //clear any previous errors
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  // Function to handle task deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id); //API call to delete task
        fetchTasks(); // Refresh list
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  // Helper functions to get badge colors
  // const getStatusColor = (status) => { ... }
  // const getPriorityColor = (priority) => { ... }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'in-progress':
        return 'blue';
      default:
        return 'gray';
    }
  };


  // Helper function to get priority badge colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      default:
        return 'green';
    }
  };


  // Render the UI component
  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  // Main UI
  return (
    <div className="task-list-container">
      <div className="header">
        <h1>Task Manager</h1>
        <Link to="/create" className="btn btn-primary">
          + Add New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Create your first task!</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <div className="task-badges">
                  <span
                    className="badge"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                  <span
                    className="badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              <p className="task-description">{task.description}</p>

              {task.dueDate && (
                <p className="task-due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}

              <div className="task-actions">
                <Link to={`/edit/${task._id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;