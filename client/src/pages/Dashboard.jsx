// (same imports as before)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import GanttChart from '../components/GanttChart';
import ProgressChart from '../components/ProgressChart';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/tasks', { title, status, startDate, endDate });
      setTasks([...tasks, res.data]);
      setTitle('');
      setStatus('todo');
      setStartDate('');
      setEndDate('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const columns = {
    todo: [],
    'in progress': [],
    done: [],
  };

  tasks.forEach((task) => {
    if (columns[task.status]) {
      columns[task.status].push(task);
    }
  });

  const ganttTasks = tasks.map((task, index) => ({
    id: task._id || task.id || `${index}`,
    title: task.title,
    start: task.startDate ? task.startDate.split('T')[0] : '',
    end: task.endDate ? task.endDate.split('T')[0] : '',
    progress: task.status === 'done' ? 100 : task.status === 'in progress' ? 50 : 0,
    status: task.status,
  }));

  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <h2>Task Management</h2>

        <form onSubmit={handleAddTask} style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: '0.5rem', minWidth: '180px' }}
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '0.5rem', minWidth: '150px' }}
          >
            <option value="todo">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={{ padding: '0.5rem', minWidth: '150px' }}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={{ padding: '0.5rem', minWidth: '150px' }}
          />
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Add Task</button>
        </form>

        {/* Kanban Board */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem' }}>
          {['todo', 'in progress', 'done'].map((column) => (
            <div key={column} style={{
              flex: 1,
              background: '#e5dfe9',
              padding: '1rem',
              borderRadius: '8px'
            }}>
              <h3 style={{ textTransform: 'capitalize' }}>{column}</h3>
              {columns[column].map((task) => (
                <div
                  key={task._id}
                  style={{
                    padding: '0.5rem',
                    background: '#e5dfe9',// light contrast card
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <strong>{task.title}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#444' }}>
                    {task.startDate && <div>Start: {new Date(task.startDate).toLocaleDateString()}</div>}
                    {task.endDate && <div>End: {new Date(task.endDate).toLocaleDateString()}</div>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 📊 Progress Chart */}
        <div style={{ marginBottom: '2rem', background: '#e5dfe9', padding: '1rem', borderRadius: '8px' }}>
          <ProgressChart tasks={tasks} />
        </div>

        {/* 📅 Gantt Chart */}
        <h2 style={{ marginBottom: '1rem' }}>📅 Gantt Chart</h2>
        <div style={{
           background: '#e5dfe9',
          padding: '1rem',
          borderRadius: '8px',
          overflowX: 'auto'
        }}>
          <GanttChart tasks={ganttTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
