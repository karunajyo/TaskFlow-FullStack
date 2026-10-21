import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:8082/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'PENDING' | 'COMPLETED'

  // Fetch tasks from Spring Boot
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      await axios.post(API_URL, {
        title,
        description,
        completed: false
      });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      if (error.response?.data?.title) {
        setErrorMessage(error.response.data.title);
      } else {
        setErrorMessage('Failed to connect to backend.');
      }
    }
  };

  // Toggle Completion
  const handleToggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      fetchTasks();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Metrics Calculation
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const productivityScore = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Filter & Search Logic
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'ALL'
        ? true
        : filter === 'PENDING'
        ? !task.completed
        : task.completed;

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <h1>TaskFlow Engine</h1>
          <p>Full-Stack Spring Boot 3 + React Architecture</p>
        </div>
        <div className="api-status">
          <div className="pulse-dot"></div>
          <span>API Connected (Port 8082)</span>
        </div>
      </header>

      {/* METRIC KPI CARDS */}
      <section className="metrics-grid">
        <div className="metric-card">
          <span>TOTAL TASKS</span>
          <h3>{totalCount}</h3>
        </div>
        <div className="metric-card">
          <span>IN PROGRESS</span>
          <h3 style={{ color: '#818cf8' }}>{pendingCount}</h3>
        </div>
        <div className="metric-card">
          <span>COMPLETED</span>
          <h3 style={{ color: '#4ade80' }}>{completedCount}</h3>
        </div>
        <div className="metric-card">
          <span>PRODUCTIVITY</span>
          <h3 style={{ color: '#38bdf8' }}>{productivityScore}%</h3>
        </div>
      </section>

      {/* OVERALL PROGRESS BAR */}
      <div className="progress-container">
        <div className="progress-header">
          <span>Sprint Completion Rate</span>
          <span>{productivityScore}% Completed</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${productivityScore}%` }}></div>
        </div>
      </div>

      {/* CREATE NEW TASK */}
      <form onSubmit={handleAddTask} className="create-card">
        {errorMessage && <div className="error-banner">⚠️ {errorMessage}</div>}
        <input
          type="text"
          placeholder="What needs to be done? (Minimum 3 chars)..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Add details, notes, or sub-context..."
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          + Add New Task
        </button>
      </form>

      {/* CONTROLS: SEARCH & FILTER TABS */}
      <div className="controls-bar">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search tasks in real-time..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filter-pills">
          <button
            className={`pill-btn ${filter === 'ALL' ? 'active' : ''}`}
            onClick={() => setFilter('ALL')}
          >
            All ({totalCount})
          </button>
          <button
            className={`pill-btn ${filter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setFilter('PENDING')}
          >
            Active ({pendingCount})
          </button>
          <button
            className={`pill-btn ${filter === 'COMPLETED' ? 'active' : ''}`}
            onClick={() => setFilter('COMPLETED')}
          >
            Done ({completedCount})
          </button>
        </div>
      </div>

      {/* TASK LIST */}
      <main className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>✨ No tasks found matching your filter or query.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'done' : ''}`}>
              <div className="task-left">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task)}
                />
                <div className="task-content">
                  <h4>{task.title}</h4>
                  {task.description && <p>{task.description}</p>}
                  <span className={`status-tag ${task.completed ? 'tag-done' : 'tag-pending'}`}>
                    {task.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
              <button onClick={() => handleDeleteTask(task.id)} className="btn-delete">
                Delete
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default App;